const path = require("path");

const signatures = [
  {
    recipePath: recipe("css-at-rule"),
    conditions: {
      tags: ["CSS", "At-rule"],
    },
  },
  {
    recipePath: recipe("css-at-rule-descriptor"),
    conditions: {
      tags: ["CSS", "At-rule descriptor"],
    },
  },
  {
    recipePath: recipe("css-data-type"),
    conditions: {
      tags: ["CSS", "Data type"],
    },
  },
  {
    recipePath: recipe("css-function"),
    conditions: {
      tags: ["CSS", "Function"],
    },
  },
  {
    recipePath: recipe("css-keyword"),
    conditions: {
      tags: ["CSS", "Keyword"],
    },
  },
  {
    recipePath: recipe("css-media-feature"),
    conditions: {
      tags: ["CSS", "Media feature"],
    },
  },
  {
    recipePath: recipe("css-property"),
    conditions: {
      tags: ["recipe:css-property"],
    },
  },
  {
    recipePath: recipe("css-selector"),
    conditions: {
      tags: ["CSS", "Selector"],
    },
  },
  {
    recipePath: recipe("css-shorthand-property"),
    conditions: {
      tags: ["recipe:css-shorthand-property"],
    },
  },
  {
    recipePath: recipe("guide"),
    conditions: {
      tags: ["Guide"],
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
    recipePath: recipe("javascript-language-feature"),
    conditions: {
      tags: ["JavaScript", "Language feature"],
    },
  },
  {
    recipePath: recipe("javascript-method"),
    conditions: {
      tags: ["JavaScript", "Method"],
    },
  },
  {
    recipePath: recipe("javascript-namespace"),
    conditions: {
      tags: ["JavaScript", "Namespace"],
    },
  },
  {
    recipePath: recipe("javascript-property"),
    conditions: {
      tags: ["JavaScript", "Property"],
    },
  },
  {
    recipePath: recipe("landing-page"),
    conditions: {
      tags: ["Landing page"],
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
    const tagSet = new Set(file.data.tags.map((tag) => tag.toLowerCase()));
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
    if (!set.has(elem.toLowerCase())) {
      return false;
    }
  }
  return true;
}

module.exports = identifyRecipesPlugin;
