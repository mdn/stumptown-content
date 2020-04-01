const fs = require("fs");
const path = require("path");

const yaml = require("js-yaml");

const ingredientHandlers = require("./ingredient-handlers");
const { Logger } = require("./ingredient-handlers/utils");

const source = "html-require-ingredient";

/**
 * A unified plugin that issues an error on pages that are missing ingredients.
 */
function requireRecipeIngredientsPlugin() {
  return function warnOnMissingRecipeIngredients(tree, file) {
    const recipeName = path.basename(file.data.recipePath, ".yaml");
    const recipe = loadRecipe(file.data.recipePath);

    const requiredBody = recipe.body.filter(
      ingredientName =>
        !(ingredientName.endsWith("?") || ingredientName.endsWith(".*"))
    );

    for (const ingredient of requiredBody) {
      if (ingredient in ingredientHandlers) {
        const logger = Logger(file, source, recipeName, ingredient);
        ingredientHandlers[ingredient](tree, logger);
      } else {
        const rule = `${recipeName}/${ingredient}/handler-not-implemented`;
        const origin = `${source}:${rule}`;
        file.message(`Handler for ${ingredient} is unimplemented`, origin);
      }
    }
  };
}

const recipesCache = {};

/**
 * Load a recipe object from a path.
 *
 * @param {String} path - the path to a recipe YAML file
 * @returns {Object} - the loaded recipe object
 */
function loadRecipe(path) {
  if (path === undefined) {
    return undefined;
  }

  if (recipesCache[path] === undefined) {
    recipesCache[path] = yaml.safeLoad(fs.readFileSync(path));
  }

  return recipesCache[path];
}

module.exports = requireRecipeIngredientsPlugin;
