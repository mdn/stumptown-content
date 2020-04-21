const fs = require("fs");

const vfile = require("vfile");

const kumascriptRehype = require("../plugins/kumascript-rehype-parse");

// A unified processor that skips fetching anything from the wiki
const processor = kumascriptRehype().use([require("../preset")]);

/**
 * Process a source string as if it were wiki source.
 *
 * @param {String} sourceString - Some Kuma HTML
 * @param {String|Object} recipePath - The path to a recipe YAML file or a recipe object
 * @returns {vfile} a processed vfile
 */
function processFromSource(sourceString, recipe) {
  const file = vfile({ contents: sourceString });

  if (fs.existsSync(recipe)) {
    file.data.recipePath = recipe;
  } else {
    file.data.recipePath = "mock-test-recipe.yaml";
    file.data.recipe = recipe;
  }

  processor.processSync(file);
  return file;
}

module.exports = {
  processFromSource,
};
