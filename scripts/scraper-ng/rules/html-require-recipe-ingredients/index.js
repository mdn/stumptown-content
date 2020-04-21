const path = require("path");

const ingredientHandlers = require("./ingredient-handlers");
const { Logger } = require("./ingredient-handlers/utils");

const source = "html-require-ingredient";

/**
 * A unified plugin that issues an error on pages that are missing ingredients.
 */
function requireRecipeIngredientsPlugin() {
  return function warnOnMissingRecipeIngredients(tree, file) {
    const recipeName = path.basename(file.data.recipePath, ".yaml");

    const requiredBody = file.data.recipe.body.filter(
      (ingredientName) => !ingredientName.endsWith(".*")
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

module.exports = requireRecipeIngredientsPlugin;
