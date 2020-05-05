const path = require("path");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    // If an ingredient's position is `null`, then we can't check its order
    const checkableIngredients = file.data.ingredients.filter(
      (i) => i.position !== null
    );

    // Since the ingredients are logged in the order of the recipe, the nodes as
    // they appear in the page should be in the same order
    const indices = checkableIngredients.map((i) => i.position.data.pageIndex);
    const sortedIndices = indices.sort((a, b) => a - b);

    for (let i = 0; i < checkableIngredients.length; i++) {
      const currentIngredient = checkableIngredients[i];

      const expectedIndex = sortedIndices[i];
      const actualIndex = currentIngredient.position.data.pageIndex;

      if (expectedIndex !== actualIndex) {
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
