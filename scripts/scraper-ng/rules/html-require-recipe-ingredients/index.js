const path = require("path");

const ingredientHandlers = require("./ingredient-handlers");
const collectProseStar = require("./ingredient-handlers/prose-star");
const { Logger } = require("./ingredient-handlers/utils");

const source = "html-require-ingredient";

/**
 * A unified plugin that issues an error on pages that are missing ingredients.
 */
function requireRecipeIngredientsPlugin() {
  return function warnOnMissingRecipeIngredients(tree, file) {
    const recipeName = path.basename(file.data.recipePath, ".yaml");

    file.data.ingredients = [];

    for (const ingredient of file.data.recipe.body) {
      if (ingredient === "prose.*") {
        file.data.ingredients.push(...collectProseStar(tree, file));
      } else if (ingredient in ingredientHandlers) {
        const logger = Logger(file, source, recipeName, ingredient);
        const position = ingredientHandlers[ingredient](tree, logger);

        file.data.ingredients.push({
          name: ingredient,
          position,
        });
      } else {
        const rule = `${recipeName}/${ingredient}/handler-not-implemented`;
        const origin = `${source}:${rule}`;
        // TODO: we now have handlers for all specified ingredients, so this
        // should be file.fail
        file.message(`Handler for ${ingredient} is unimplemented`, origin);
      }
    }
  };
}

module.exports = requireRecipeIngredientsPlugin;
