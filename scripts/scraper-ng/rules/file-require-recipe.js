const fs = require("fs");
const path = require("path");

const source = "file-require-recipe";

/**
 * Check for one and only one valid recipe per file.
 *
 */
function requireRecipe() {
  return function attacher(tree, file) {
    if (file.data.recipe !== undefined) {
      return; // Don't worry about recipePath, if the recipe object has been set directly (i.e., for testing)
    }

    if (file.data.recipePath === undefined) {
      msg(
        file,
        "Recipe is missing",
        "recipe-missing",
        `Tags: ${JSON.stringify(file.data.tags)}`
      );
      return;
    }

    if (Array.isArray(file.data.recipePath)) {
      msg(
        file,
        `Recipe is not unique`,
        "recipe-not-unique",
        `Recipes: ${JSON.stringify(
          file.data.recipePath.map((f) => path.basename(f, ".yaml"))
        )}\nTags: ${JSON.stringify(file.data.tags)}`
      );
      return;
    }

    if (!fs.existsSync(file.data.recipePath)) {
      msg(
        file,
        `Recipe file (${path.relative(
          process.cwd(),
          file.data.recipePath
        )}) does not exist`,
        "recipe-file-missing",
        `Tags: ${JSON.stringify(file.data.tags)}`
      );
    }
  };
}

function msg(file, text, rule, note) {
  const message = file.message(text, `${source}:${rule}`);
  message.fatal = true;
  message.note = note;
  throw message;
}

module.exports = requireRecipe;
