const fs = require("fs");
const path = require("path");

const vfile = require("vfile");

const kumascriptRehype = require("../../plugins/kumascript-rehype-parse");

// A unified processor that skips fetching anything from the wiki
const processor = kumascriptRehype().use([require("../../preset")]);

/**
 * Process some source HTML and a recipe, in various forms.
 *
 * @param {String} source - HTML string or the path to a file containing some
 * HTML
 * @param {String|Object} recipe - The name of a regular recipe (e.g.,
 * `"javascript-constructor"`), the path to a recipe file (e.g.,
 * `"/path/to/recipe.yaml"`), or an object representing a recipe (e.g., `{ body:
 * ['some-ingredient'] }`)
 * @returns {vfile} a processed vfile
 */
function process(source, recipe) {
  const options = fs.existsSync(source)
    ? { path: source, contents: fs.readFileSync(source, "utf8") }
    : { contents: source };
  const file = vfile(options);

  // The KumaScript parser (vendor/parser.js) requires at least a newline, or it'll throw a SyntaxError
  if (!file.contents.endsWith("\n")) {
    file.contents = file.contents + "\n";
  }

  if (typeof recipe === "string") {
    // Assume recipe strings are file paths or the names of real recipes
    let path;

    if (fs.existsSync(recipe)) {
      path = recipe;
    } else if (fs.existsSync(recipePath(recipe))) {
      path = recipePath(recipe);
    } else {
      throw Error(`${recipe} is not a valid recipe name or recipe path`);
    }
    file.data.recipePath = path;
  } else if (recipe instanceof Object) {
    // Assume recipe objects are mock recipes
    file.data.recipePath = "mock-recipe.yaml";
    file.data.recipe = recipe;
  } else {
    throw Error(`${recipe} was an unexpected type (${typeof recipe})`);
  }

  processor.processSync(file);
  return file;
}

const recipesDir = path.resolve(__dirname, "../../../../recipes");

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
  process,
  recipesDir,
};
