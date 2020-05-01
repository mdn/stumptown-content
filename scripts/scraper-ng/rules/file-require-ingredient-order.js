const path = require("path");

const visit = require("unist-util-visit");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    let pageIndex = -1;
    visit(tree, (node) => {
      pageIndex = pageIndex + 1;

      for (const ingredient of file.data.ingredients) {
        if (ingredient.position === node) {
          ingredient.pageIndex = pageIndex;
        }
      }
    });

    // Ingredients without positions are unknowably sorted (and there's a
    // message about the ingredient anyway)
    const checkableIngredients = file.data.ingredients.filter(
      (i) => i.pageIndex !== undefined
    );

    // Since the ingredients are logged in the order of the recipe, the nodes as
    // they appear in the page should be in the same order
    const indices = checkableIngredients.map((i) => i.pageIndex);
    const sortedIndices = indices.sort((a, b) => a - b);

    for (let i = 0; i < checkableIngredients.length; i++) {
      const currentIngredient = checkableIngredients[i];

      const expectedIndex = sortedIndices[i];
      const actualIndex = currentIngredient.pageIndex;

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
