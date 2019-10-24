const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const proseSlicer = require('./slice-prose');
const { ROOT } = require('./constants');

/**
 * Get a single link (title and URL) from a file path.
 * If `includeShortDescriptions` is `true`, and the file includes  short description,
 * then include that, too.
 */
function itemFromFile(includeShortDescriptions, filePath) {
  const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
  if (!data || !data.mdn_url) {
    return null;
  }
  let shortDescriptions = [];
  if (includeShortDescriptions) {
    const prose = proseSlicer.packageProse(content);
    shortDescriptions = prose.filter(section => section.value.id === 'short_description');
  }
  return {
      title: data.title,
      short_title: data.short_title || null,
      mdn_url: data.mdn_url,
      short_description: shortDescriptions.length && shortDescriptions[0].value.content || null
    };
}

/**
 * Given a directory that should contain content for a single page,
 * extract the things needed for a link:
 *    - title, URL, and (if required) short description
 */
function itemFromDirectory(includeShortDescriptions, itemDirectory) {
  const items = fs.readdirSync(itemDirectory, {withFileTypes: true});
  const filenames = items.filter(item => !item.isDirectory())
    .filter(item => item.name.endsWith('.md'))
    .map(item => path.join(itemDirectory, item.name));
  let content =  filenames.map(itemFromFile.bind(null, includeShortDescriptions));
  content = content.filter(e => !!e);
  if (content.length !== 1) {
    throw new Error(`${itemDirectory} should contain exactly one buildable item (not ${content.length})`);
  }
  return content[0];
}

/**
 * Build a list of links from a special YAML file called a "chapter list".
 *
 * Each item in the list is a directory containing content for a single page.
 */
function linkListFromChapterList(chapterListPath, includeShortDescriptions = false) {
  const fullPath = path.join(ROOT, chapterListPath);
  const fullDir = path.dirname(fullPath);
  const chapterList = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'));
  const chapterPaths = chapterList.chapters.map(chapter => path.join(fullDir, chapter));
  return {
    title: chapterList.title,
    content: chapterPaths.map(itemFromDirectory.bind(null, includeShortDescriptions))
  }
}

/**
 * Build a list of links from a directory.
 *
 * List all directories immediately under this one.
 *
 * Each of those directories is expected to contain content for a single page.
 */
function linkListFromDirectory(title, directory, includeShortDescriptions = false) {
  const fullPath = path.join(ROOT, directory);
  let itemDirectories = fs.readdirSync(fullPath, {withFileTypes: true}).filter(item => item.isDirectory());
  itemDirectories = itemDirectories.map(itemDirectory => path.join(fullPath, itemDirectory.name));
  return {
    title: title,
    content: itemDirectories.map(itemFromDirectory.bind(null, includeShortDescriptions))
  }
}

/**
 * Build a list of links from an array of paths.
 *
 * Each path is a directory containing content for a single page.
 */
function linkListFromFilePaths(title, filePaths, includeShortDescriptions = false) {
  const fullFilePaths = filePaths.map(filePath => path.join(ROOT, filePath));
  return {
    title: title,
    content: fullFilePaths.map(itemFromDirectory.bind(null, includeShortDescriptions))
  }
}

module.exports = {
    linkListFromChapterList,
    linkListFromDirectory,
    linkListFromFilePaths
}
