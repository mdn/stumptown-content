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
  let shortDescriptions = [];
  if (includeShortDescriptions) {
    const prose = await proseSlicer.packageProse(content);
    shortDescriptions = prose.filter(section => section.value.id === 'short_description');
  }
  if (shortDescriptions.length > 0) {
    return {
      title: data.title,
      mdn_url: data.mdn_url,
      short_description: shortDescriptions[0].value.content
    };
  } else {
    return {
      title: data.title,
      mdn_url: data.mdn_url
    };
  }
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
 * Build a list of links from a directory:
 * - list all the children of this directory.
 */
async function linkListFromDirectory(title, directory, includeShortDescriptions = false) {
  const fullPath = path.join(ROOT, directory);
  let itemDirectories = fs.readdirSync(path.join(ROOT, directory), {withFileTypes: true});
  itemDirectories = itemDirectories.filter(item => item.isDirectory());
  itemDirectories = itemDirectories.map(itemDirectory => path.join(fullPath, itemDirectory.name, 'docs.md'));
  return {
    title: title,
    content: await Promise.all(itemDirectories.map(itemFromFile.bind(null, includeShortDescriptions)))
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
