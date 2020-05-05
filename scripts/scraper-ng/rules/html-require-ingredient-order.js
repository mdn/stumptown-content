const path = require("path");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    const pageIngredients = file.data.ingredients
      .filter((i) => i.position !== null) // Skip checking the order of ingredients that weren't found
      .sort((a, b) => a.position.data.pageIndex - b.position.data.pageIndex); // Sort found ingredients by their order on the page

    // Filter the recipe's sequence of ingredients to only the ingredients found
    // in the page
    const pageIngredientNames = pageIngredients.map(
      (ingredient) => ingredient.name
    );
    const recipeIngredientNames = file.data.recipe.body.filter((ingredient) =>
      pageIngredientNames.includes(ingredient)
    );

    for (let i = 0; i < pageIngredients.length; i++) {
      const currentIngredient = pageIngredients[i];
      const expectedIngredient = recipeIngredientNames[i];

      if (currentIngredient.name !== expectedIngredient) {
        const message = file.message(
          `${currentIngredient.name} not expected in this order`,
          currentIngredient.position,
          `${source}:${path.basename(
            file.data.recipePath,
            ".yaml"
          )}/ingredient-out-of-order/${currentIngredient.name}`
        );
        message.fatal = true;
      }
    }
  };
}

module.exports = attacher;
