const fs = require("fs");
const path = require("path");

/**
 * Check for one and only one valid recipe per file.
 *
 */
function requireRecipe() {
  return function attacher(tree, file) {
    if (file.data.recipePath === undefined) {
      msg(
        file,
        "Missing recipe",
        "file-require-recipe",
        `Tags: ${JSON.stringify(file.data.tags)}`
      );
      return;
    }

    if (Array.isArray(file.data.recipePath)) {
      msg(
        file,
        `One and only one recipe must apply`,
        "file-require-recipe-unique",
        `Recipes: ${JSON.stringify(
          file.data.recipePath.map(f => path.basename(f, ".yaml"))
        )}\nTags: ${JSON.stringify(file.data.tags)}`
      );
      return;
    }

    if (!fs.existsSync(file.data.recipePath)) {
      msg(
        file,
        `${file.data.recipePath} does not exist`,
        "file-require-recipe-file-exists",
        `Tags: ${JSON.stringify(file.data.tags)}`
      );
    }
  };
}

function msg(file, text, ruleId, note) {
  const message = file.message(text);
  message.fatal = true;
  message.ruleId = ruleId;
  message.note = note;
  return message;
}

module.exports = requireRecipe;
