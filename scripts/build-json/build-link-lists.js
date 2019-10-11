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
async function itemFromFile(includeShortDescriptions, filePath) {
  const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
  if (!data || !data.recipe) {
    return null;
  }
  let shortDescriptions = [];
  if (includeShortDescriptions) {
    const prose = await proseSlicer.packageProse(content);
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
 * Build a list of links from a special YAML file called a "chapter list"
 * that is just an ordered list of pages.
 */
async function linkListFromChapterList(chapterListPath, includeShortDescriptions = false) {
  const fullPath = path.join(ROOT, chapterListPath);
  const fullDir = path.dirname(fullPath);
  const chapterList = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'));
  const chapterPaths = chapterList.chapters.map(chapter => path.join(fullDir, chapter));
  return {
    title: chapterList.title,
    content: await Promise.all(chapterPaths.map(itemFromFile.bind(null, includeShortDescriptions)))
  }
}

/**
 * Given a directory that should contain content for a single page,
 * extract the things needed for a link:
 *    - title, URL, and (if required) short description
 */
async function itemFromDirectory(includeShortDescriptions, itemDirectory) {
  const items = fs.readdirSync(itemDirectory, {withFileTypes: true});
  const filenames = items.filter(item => !item.isDirectory()).map(item => path.join(itemDirectory, item.name));
  let content =  await Promise.all(filenames.map(itemFromFile.bind(null, includeShortDescriptions)));
  content = content.filter(e => !!e);
  if (content.length !== 1) {
    throw(`${itemDirectory} should contain exactly one buildable item`);
  }
  return content[0];
}

/**
 * Build a list of links from a directory:
 * - list all directories under this one
 * - each of those directories is expected to contain content for a single page,
 * - we want to extract the things needed for a link:
 *    - title, URL, and (if required) short description
 */
async function linkListFromDirectory(title, directory, includeShortDescriptions = false) {
  const fullPath = path.join(ROOT, directory);
  let itemDirectories = fs.readdirSync(fullPath, {withFileTypes: true}).filter(item => item.isDirectory());
  itemDirectories = itemDirectories.map(itemDirectory => path.join(fullPath, itemDirectory.name));
  return {
    title: title,
    content: await Promise.all(itemDirectories.map(itemFromDirectory.bind(null, includeShortDescriptions)))
  }
}

/**
 * Build a list of links from an array of file paths
 */
async function linkListFromFilePaths(title, filePaths, includeShortDescriptions = false) {
  const fullFilePaths = filePaths.map(filePath => path.join(ROOT, filePath));
  return {
    title: title,
    content: await Promise.all(fullFilePaths.map(itemFromFile.bind(null, includeShortDescriptions)))
  }
}

module.exports = {
    linkListFromChapterList,
    linkListFromDirectory,
    linkListFromFilePaths
}
