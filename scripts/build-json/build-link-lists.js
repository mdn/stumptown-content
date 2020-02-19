const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const matter = require("gray-matter");

const proseSlicer = require("./slice-prose");
const { ROOT } = require("./constants");

/**
 * Given a path to an MD file containing the content for a page,
 * return an object containing:
 * - data: the content's front matter as a JSON object
 * - prose: the content's Markdown
 */
function contentFromFile(filePath) {
  const item = matter(fs.readFileSync(filePath, "utf8"));
  return {
    data: item.data,
    prose: item.content // we want to call this "prose" not "content"
  };
}

/**
 * Given an object containing:
 *     - "data": the front matter for the page, containing things like title
 *     - "prose": the prose content for the page, containing things like short
 *     description
 * Creates an object representing a link to a page.
 */
function linkFromContent(content) {
  let shortDescriptions = [];
  const prose = proseSlicer.packageProse(content.prose);
  shortDescriptions = prose.filter(
    section => section.value.id === "short_description"
  );
  return {
    title: content.data.title,
    short_title: content.data.short_title || null,
    mdn_url: content.data.mdn_url,
    short_description:
      (shortDescriptions.length && shortDescriptions[0].value.content) || null
  };
}

/**
 * Given a listSpec that specifies the list using references to front matter items,
 * resolve those references, replacing them with the actual referenced values.
 *
 * It permits the front matter items to be missing. If they are missing it returns
 * null, which means this listSpec will be omitted.
 */
function resolveListSpec(listSpec, data) {
  if (listSpec.pages) {
    listSpec.pages = listSpec.pages.map(page => data[page.front_matter_item]);
    listSpec.pages = listSpec.pages.filter(page => !!page);
  } else if (listSpec.chapter_list) {
    listSpec.chapter_list = data[listSpec.chapter_list.front_matter_item];
  } else if (listSpec.directory) {
    listSpec.directory = data[listSpec.directory.front_matter_item];
  }
  // allow front_matter_item to be optional. If absent, return null.
  if (
    (listSpec.pages && listSpec.pages.length > 0) ||
    listSpec.chapter_list ||
    listSpec.directory
  ) {
    return listSpec;
  } else {
    return null;
  }
}

/**
 * Given a directory that should contain content for a single page,
 * extract the things needed for a link:
 *    - title, URL, and short description
 */
function buildLinkItem(foreach, itemDirectory) {
  const dirEntries = fs.readdirSync(itemDirectory, { withFileTypes: true });
  const filenames = dirEntries
    .filter(entry => !entry.isDirectory())
    .filter(entry => entry.name.endsWith(".md"))
    .map(entry => path.join(itemDirectory, entry.name));
  let items = filenames
    .map(contentFromFile)
    .filter(item => item.data.mdn_url !== undefined);
  if (items.length !== 1) {
    throw new Error(
      `${itemDirectory} should contain exactly one buildable item (not ${items.length})`
    );
  }
  const link = linkFromContent(items[0]);
  if (foreach) {
    link.content = [];
    for (let listSpec of foreach) {
      listSpec = resolveListSpec(listSpec, items[0].data);
      if (listSpec) {
        link.content.push(buildLinkList(listSpec));
      }
    }
  }
  return link;
}

/**
 * Build a list of links from a special YAML file called a "chapter list".
 *
 * Each item in the list is a directory containing content for a single page.
 */
function linkListFromChapterList(chapterListPath) {
  const fullPath = path.join(ROOT, chapterListPath);
  const fullDir = path.dirname(fullPath);
  const chapterList = yaml.safeLoad(fs.readFileSync(fullPath, "utf8"));
  const chapterPaths = chapterList.chapters.map(chapter =>
    path.join(fullDir, chapter)
  );
  return {
    title: chapterList.title,
    content: chapterPaths.map(buildLinkItem.bind(null, false))
  };
}

/**
 * Build a list of links from a directory.
 *
 * List all directories immediately under this one.
 *
 * Each of those directories is expected to contain content for a single page.
 */
function linkListFromDirectory(title, directory, foreach) {
  const fullPath = path.join(ROOT, directory);
  let itemDirectories = fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter(item => item.isDirectory());
  itemDirectories = itemDirectories.map(itemDirectory =>
    path.join(fullPath, itemDirectory.name)
  );
  return {
    title: title,
    content: itemDirectories.map(buildLinkItem.bind(null, foreach))
  };
}

/**
 * Build a list of links from an array of paths.
 *
 * Each path is a directory containing content for a single page.
 */
function linkListFromFilePaths(title, filePaths) {
  const fullFilePaths = filePaths.map(filePath => path.join(ROOT, filePath));
  return {
    title: title,
    content: fullFilePaths.map(buildLinkItem.bind(null, false))
  };
}

/**
 * Build a link list from a spec.
 * There are three ways to specify the list:
 * - as an array of paths to individual pages
 * - as a path to a "chapter list" file listing pages to include
 * - as a directory containing pages to include
 */
function buildLinkList(listSpec) {
  if (listSpec.pages) {
    return linkListFromFilePaths(listSpec.title, listSpec.pages);
  } else if (listSpec.chapter_list) {
    return linkListFromChapterList(listSpec.chapter_list);
  } else if (listSpec.directory) {
    return linkListFromDirectory(
      listSpec.title,
      listSpec.directory,
      listSpec.foreach
    );
  } else {
    throw new Error(
      `Unrecognized link list spec '${JSON.stringify(listSpec)}'`
    );
  }
}

module.exports = {
  buildLinkList
};
