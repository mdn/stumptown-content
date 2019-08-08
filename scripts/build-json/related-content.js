const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

/**
 * Get a single item from front matter
 */
function itemFromFile(filePath) {
  const {data} = matter(fs.readFileSync(filePath, 'utf8'));
  return {
    title: data.title,
    mdn_url: data.mdn_url
  };
}

/**
 * Build a section from a special YAML file called a "chapter list"
 * that is just an ordered list of pages.
 */
function sectionFromChapterList(chapterListPath) {
  const fullPath = path.join(process.cwd(), chapterListPath);
  const fullDir = path.dirname(fullPath);
  const chapterList = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'));
  const chapterPaths = chapterList.chapters.map(chapter => path.join(fullDir, chapter));
  return {
    title: chapterList.title,
    content: chapterPaths.map(itemFromFile)
  }
}

/**
 * Build a section from a directory:
 * - list all the children of this directory.
 */
function sectionFromDirectory(directory) {
  const fullPath = path.join(process.cwd(), directory);
  let itemDirectories = fs.readdirSync(path.join(process.cwd(), directory));
  itemDirectories = itemDirectories.map(itemDirectory => path.join(fullPath, itemDirectory, 'docs.md'));
  return itemDirectories.map(itemFromFile);
}

/**
 * Build a section.
 * A section may be either:
 * - `children`: an array which itself contains sections
 * - `chapter_list`: the name of a YAML file that lists pages to include in the section
 * - `directory`: the name of a directory whose children to list
 */
function buildSection(sectionSpec) {
  if (sectionSpec.children) {
    return {
      title: sectionSpec.title,
      content: sectionSpec.children.map(buildSection)
    };
  } else if (sectionSpec.chapter_list) {
    return sectionFromChapterList(sectionSpec.chapter_list);
  } else if (sectionSpec.directory)  {
    return {
      title: sectionSpec.title,
      content: sectionFromDirectory(sectionSpec.directory)
    };
  } else {
    throw('Related content section must contain a property called "children", "chapter_list", or "directory"');
  }
}

/**
 * Build a single related content object given its YAML file.
 * At the top level a related content object is an array of sections.
 */
const relatedContentCache = {};
function buildRelatedContent(specName) {
  const cached = relatedContentCache[specName];
  if (cached !== undefined) {
    return cached;
  }
  const spec = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), specName), 'utf8'));
  const result = spec.map(buildSection);
  relatedContentCache[specName] = result;
  return result;
}

module.exports = {
    buildRelatedContent
}
