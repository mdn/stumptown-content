const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const { ROOT } = require('./constants');

const links = require('./build-link-lists');

/**
 * Build a section.
 * A section may be either:
 * - `children`: an array which itself contains sections
 * - `chapter_list`: the name of a YAML file that lists pages to include in the section
 * - `directory`: the name of a directory whose children to list
 */
async function buildSection(sectionSpec) {
  if (sectionSpec.children) {
    return {
      title: sectionSpec.title,
      content: await Promise.all(sectionSpec.children.map(buildSection))
    };
  } else if (sectionSpec.chapter_list) {
    return await links.linkListFromChapterList(sectionSpec.chapter_list);
  } else if (sectionSpec.directory)  {
    return await links.linkListFromDirectory(sectionSpec.title, sectionSpec.directory);
  } else {
    throw('Related content section must contain a property called "children", "chapter_list", or "directory"');
  }
}

/**
 * Build a single related content object given its YAML file.
 * At the top level a related content object is an array of sections.
 */
const relatedContentCache = {};
async function buildRelatedContent(specName) {
  const cached = relatedContentCache[specName];
  if (cached !== undefined) {
    return cached;
  }
  const spec = yaml.safeLoad(fs.readFileSync(path.join(ROOT, specName), 'utf8'));
  const result = await Promise.all(spec.map(buildSection));
  relatedContentCache[specName] = result;
  return result;
}

module.exports = {
    buildRelatedContent
}
