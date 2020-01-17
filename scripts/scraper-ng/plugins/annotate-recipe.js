const path = require("path");

const signatures = [
  {
    recipePath: recipe("javascript-class"),
    conditions: {
      tags: ["JavaScript", "Class"]
    }
  },
  {
    recipePath: recipe("javascript-constructor"),
    conditions: {
      tags: ["JavaScript", "Constructor"]
    }
  },
  {
    recipePath: recipe("javascript-error"),
    conditions: {
      tags: ["JavaScript", "Error"]
    }
  },
  {
    recipePath: recipe("javascript-method"),
    conditions: {
      tags: ["JavaScript", "Method"]
    }
  },
  {
    recipePath: recipe("javascript-property"),
    conditions: {
      tags: ["JavaScript", "Property"]
    }
  }
];

/**
 * Add a path to a recipe file to `VFile.data.recipePath`.
 *
 * @returns A unified transformer.
 */
function annotateRecipePlugin() {
  return function transformer(tree, file) {
    const tagSet = new Set(file.data.tags);

    for (const { recipePath, conditions } of signatures) {
      if (hasAll(tagSet, conditions.tags)) {
        file.data.recipePath = recipePath;
        return;
      }
    }

    const message = file.message(
      "No recipe matched this page",
      undefined,
      "require-recipe"
    );
    message.fatal = true;
  };
}

/**
 * Convert a recipe name to a recipe file path.
 *
 * @param {String} name - the name of a recipe, without an extension
 * @returns {String} An absolute path to a recipe file
 */
function recipe(name) {
  return path.resolve(__dirname, "../../recipes", name + ".yaml");
}

/**
 * Check if some tags contains some other tags.
 *
 * @param {Set<String>} actualTags
 * @param {Set<String} expectedTags
 * @returns {Boolean} `true` or `false`
 */
function hasAll(actualTags, expectedTags) {
  return isSuperset(actualTags, expectedTags);
}

/**
 * Check if a set is a subset of another set.
 *
 * @param {Set} set
 * @param {Set} subset
 * @returns {Boolean} `true` or `false`
 */
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

module.exports = annotateRecipePlugin;
