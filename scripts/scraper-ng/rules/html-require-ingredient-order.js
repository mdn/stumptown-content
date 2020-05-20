const path = require("path");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 *
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    // Collect only those page ingredients with positions
    const pageIngredients = file.data.ingredients
      .filter((i) => i.position !== null)
      .sort((a, b) => a.position.data.pageIndex - b.position.data.pageIndex); // Sorted by their order on the page

    // Get the sequence of expected recipe ingredients, excluding those that
    // definitely don't appear in the page. This skips both 1) optional
    // ingredients that were omitted (which is permissible) and 2) required
    // ingredients that are missing (which is out-of-scope for this rule)
    const pageIngredientNames = new Set(pageIngredients.map((i) => i.name));
    const recipeIngredientNames = file.data.recipe.body.filter((i) =>
      pageIngredientNames.has(i)
    );

    // Pad the sequence of expected ingredients with additional `prose.*`
    // entries to cover all such ingredients
    if (recipeIngredientNames.includes("prose.*")) {
      const padCount = pageIngredients.reduce(
        (sum, ingredient) => sum + (ingredient.name === "prose.*" ? 1 : 0),
        0
      );
      recipeIngredientNames.splice(
        recipeIngredientNames.indexOf("prose.*"),
        1,
        ...new Array(padCount).fill("prose.*")
      );
    }

    for (let index = 0; index < recipeIngredientNames.length; index++) {
      const expectedIngredientName = recipeIngredientNames[index];
      const currentIngredient = pageIngredients[index];

      if (currentIngredient.name !== expectedIngredientName) {
        const extraInfoForProseStar =
          currentIngredient.name === "prose.*"
            ? ` (#${currentIngredient.position.properties.id})`
            : "";
        const message = file.message(
          `${currentIngredient.name}${extraInfoForProseStar} not expected in this order`,
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
