const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const matter = require("gray-matter");

const proseSlicer = require("./slice-prose");
const { ROOT } = require("./constants");

/**
 * Given a path to a Markdown file containing the content for a page,
 * return an object containing:
 * - data: the content's front matter as a JSON object
 * - prose: the content's Markdown
 */
function contentFromFile(filePath) {
  const item = matter(fs.readFileSync(filePath, "utf8"));
  return {
    data: item.data,
    // gray-matter calls the Markdown part "content"
    // but we want to call it "prose"
    prose: item.content,
  };
}

/**
 * Given an object "content" containing:
 *     - "data": the front matter for the page, containing things like title
 *     - "prose": the prose content for the page, containing things like short
 *     description
 * Creates an object representing a link to a page.
 */
function linkFromContent(content) {
  let shortDescriptions = [];
  const prose = proseSlicer.packageProse(content.prose);
  shortDescriptions = prose.filter(
    (section) => section.value.id === "short_description"
  );
  return {
    title: content.data.title,
    short_title: content.data.short_title || null,
    mdn_url: content.data.mdn_url,
    short_description:
      (shortDescriptions.length && shortDescriptions[0].value.content) || null,
  };
}

/**
 * A list spec is an object that describes a list of pages. It
 * can take one of three forms:
 *
 * - a `title` property and a `directory` property, both strings
 * - a `title` property which is a string, and a `pages` property which is an array of strings
 * - a `chapter_list` property which is a string
 *
 * When writing a list spec, rather than include a string directly,
 * a writer is sometimes allowed to reference a string indirectly, by providing
 * the name of a front matter key. This function resolves such a list spec,
 * replacing such indirect references with the values of the front matter keys
 * that they reference.
 *
 * This function takes as arguments:
 *
 * - a `listSpec` that specifies the list using references to front matter keys
 * - a `data` object containing some front matter
 *
 * It then resolves the front matter references in the list spec by replacing
 * them with the real values from the `data` object.
 *
 * It is permissible for the front matter keys to be missing. If they are missing,
 * this function returns `null`.
 */
function resolveListSpec(listSpec, data) {
  const resolved = {
    title: listSpec.title,
  };
  if (listSpec.pages) {
    resolved.pages = listSpec.pages.map(
      (page) => data[page.from_front_matter_key]
    );
    resolved.pages = resolved.pages.filter((page) => !!page);
  } else if (listSpec.chapter_list) {
    resolved.chapter_list = data[listSpec.chapter_list.from_front_matter_key];
  } else if (listSpec.directory) {
    resolved.directory = data[listSpec.directory.from_front_matter_key];
  }
  // allow from_front_matter_key to be optional. If it is absent, return null.
  if (
    (resolved.pages && resolved.pages.length > 0) ||
    resolved.chapter_list ||
    resolved.directory
  ) {
    return resolved;
  } else {
    return null;
  }
}

/**
 * Given a directory that should contain content for a single page,
 * extract the things needed for a link:
 *    - title, URL, and short description
 *
 * If we were given a "foreach" object, add any link lists they specify in
 * this link's "content" property.
 */
function buildLinkItem(itemDirectory, foreach) {
  // find the single Markdown file containing documentation for an item
  const dirEntries = fs.readdirSync(itemDirectory, { withFileTypes: true });
  const filenames = dirEntries
    .filter((entry) => !entry.isDirectory())
    .filter((entry) => entry.name.endsWith(".md"))
    .map((entry) => path.join(itemDirectory, entry.name));
  const items = filenames
    .map(contentFromFile)
    .filter((item) => item.data.mdn_url !== undefined);
  if (items.length !== 1) {
    throw new Error(
      `${itemDirectory} should contain exactly one buildable item (not ${items.length})`
    );
  }
  const link = linkFromContent(items[0]);

  // Add any link lists specified in "foreach", if that was supplied
  if (foreach) {
    link.content = [];
    for (const listSpec of foreach) {
      const resolvedListSpec = resolveListSpec(listSpec, items[0].data);
      if (resolvedListSpec) {
        link.content.push(buildLinkList(resolvedListSpec));
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
  const chapterPaths = chapterList.chapters.map((chapter) =>
    path.join(fullDir, chapter)
  );

  return {
    title: chapterList.title,
    content: chapterPaths.map((dirEntry) => buildLinkItem(dirEntry)),
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
    .filter((item) => item.isDirectory());
  itemDirectories = itemDirectories.map((itemDirectory) =>
    path.join(fullPath, itemDirectory.name)
  );

  return {
    title: title,
    content: itemDirectories.map((dirEntry) =>
      buildLinkItem(dirEntry, foreach)
    ),
  };
}

/**
 * Build a list of links from an array of paths.
 *
 * Each path is a directory containing content for a single page.
 */
function linkListFromFilePaths(title, filePaths) {
  const fullFilePaths = filePaths.map((filePath) => path.join(ROOT, filePath));

  return {
    title: title,
    content: fullFilePaths.map((dirEntry) => buildLinkItem(dirEntry)),
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
  buildLinkList,
};
