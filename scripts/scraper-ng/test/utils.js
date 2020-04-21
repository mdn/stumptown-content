const fs = require("fs");
const path = require("path");

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
  // The KumaScript parser (vendor/parser.js) requires at least a newline, or it'll throw a SyntaxError
  if (!sourceString.endsWith("\n")) {
    sourceString = sourceString + "\n";
  }

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

const recipesDir = path.resolve(__dirname, "../../../recipes");

/**
 * Given a recipe name, generate a path to a recipe file in `/recipes/`.
 *
 * @param {String} recipeName - a recipe name (without file path or extension)
 * @returns {String} - a normalized path to a recipe file
 */
function recipePath(recipeName) {
  return path.join(recipesDir, recipeName + ".yaml");
}

module.exports = {
  processFromSource,
  recipesDir,
  recipePath,
};
