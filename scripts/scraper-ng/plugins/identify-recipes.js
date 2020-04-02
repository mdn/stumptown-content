const path = require("path");

const signatures = [
  {
    recipePath: recipe("javascript-namespace"),
    conditions: {
      tags: ["JavaScript", "Namespace"],
    },
  },
  {
    recipePath: recipe("javascript-class"),
    conditions: {
      tags: ["JavaScript", "Class"],
    },
  },
  {
    recipePath: recipe("javascript-constructor"),
    conditions: {
      tags: ["JavaScript", "Constructor"],
    },
  },
  {
    recipePath: recipe("javascript-error"),
    conditions: {
      tags: ["JavaScript", "Error"],
    },
  },
  {
    recipePath: recipe("javascript-method"),
    conditions: {
      tags: ["JavaScript", "Method"],
    },
  },
  {
    recipePath: recipe("javascript-property"),
    conditions: {
      tags: ["JavaScript", "Property"],
    },
  },
  {
    recipePath: recipe("javascript-language-feature"),
    conditions: {
      tags: ["JavaScript", "Language feature"],
    },
  },
  {
    recipePath: recipe("landing-page"),
    conditions: {
      tags: ["Landing page"],
    },
  },
  {
    recipePath: recipe("guide"),
    conditions: {
      tags: ["Guide"],
    },
  },
];

/**
 * Add a path to a recipe file to `VFile.data.recipePath`.
 *
 * @returns A unified transformer.
 */
function identifyRecipesPlugin() {
  return function transformer(tree, file) {
    const tagSet = new Set(file.data.tags);
    const recipes = [];

    for (const { recipePath, conditions } of signatures) {
      if (hasAll(tagSet, conditions.tags)) {
        recipes.push(recipePath);
      }
    }

    if (recipes.length === 1) {
      file.data.recipePath = recipes[0];
    } else if (recipes.length > 1) {
      file.data.recipePath = recipes;
    }
  };
}

/**
 * Convert a recipe name to a recipe file path.
 *
 * @param {String} name - the name of a recipe, without an extension
 * @returns {String} An absolute path to a recipe file
 */
function recipe(name) {
  return path.resolve(__dirname, "../../../recipes", name + ".yaml");
}

/**
 * Check if a set of tags contains some other set of tags.
 *
 * @param {Set} set
 * @param {Set} subset
 * @returns {Boolean} `true` or `false`
 */
function hasAll(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

module.exports = identifyRecipesPlugin;
