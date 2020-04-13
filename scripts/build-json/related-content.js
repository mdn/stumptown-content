const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const { ROOT } = require("./constants");

const links = require("./build-link-lists");

/**
 * Build a section.
 * A section may be either:
 * - `children`: an array which itself contains sections
 * - a link list spec
 * This allows us to nest link lists
 */
function buildSection(sectionSpec) {
  if (sectionSpec.children) {
    return {
      title: sectionSpec.title,
      content: sectionSpec.children.map(buildSection),
    };
  } else {
    return links.buildLinkList(sectionSpec);
  }
}

/**
 * Build a single related content object given its YAML file.
 * At the top level a related content object is an array of sections.
 */
const relatedContentCache = {};
function buildRelatedContent(specName, locale) {
  const cached = relatedContentCache[specName];
  if (cached !== undefined) {
    return cached;
  }
  const spec = yaml.safeLoad(
    fs.readFileSync(path.join(ROOT, "content", locale, specName), "utf8")
  );
  const result = spec.map(buildSection);
  // race condition would only result in reassigning the same value here
  relatedContentCache[specName] = result; // eslint-disable-line require-atomic-updates
  return result;
}

module.exports = {
  buildRelatedContent,
};
