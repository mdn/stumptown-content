const path = require("path");

const { selectAll } = require("hast-util-select");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 *
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    file.data.ingredients.push(...collectProseStar(tree, file));

    // Collect all page ingredients with positions
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

    // Pad the sequence of expected ingredients with additioanl `prose.*`
    // entries to cover all such ingredients
    if (recipeIngredientNames.includes("prose.*")) {
      const padCount = pageIngredients.reduce(
        (sum, ingredient) => sum + (ingredient.name == "prose.*" ? 1 : 0),
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

// Ingredients that do not have a corresponding H2 element
const ingredientsWithoutH2s = [
  "prose.*",
  "prose.short_descriptions",
  "data.interactive_example",
];

/**
 * Collect H2s not otherwise expected in an ingredient.
 *
 * @param {Object} tree - A hast tree
 * @param {vfile} file - A vfile with a `file.data.ingredients` array and a `file.data.recipe` object
 * @returns {Array} an array of `file.data.ingredients` member-like objects with `name` and `position` properties
 */
function collectProseStar(tree, file) {
  const reservedIds = file.data.recipe.body
    .filter((i) => !ingredientsWithoutH2s.includes(i))
    .map(ingredientToSelector);

  const proseStars = [];
  for (const h2 of selectAll(`h2:not(${reservedIds.join()})`, tree)) {
    proseStars.push({
      name: "prose.*",
      position: h2,
    });
  }

  return proseStars;
}

/**
 * Convert an ingredient identifier to an ID selector.
 *
 * For example, `ingredientToSelector("prose.syntax")`  returns `"#Syntax"`.
 *
 * @param {string} ingredient - an ingredient identifier, such as `prose.description?` or `data.browser_compatibility`
 * @returns {string} an ID selector string
 */
function ingredientToSelector(ingredient) {
  const { name } = ingredient.match(/[.](?<name>\w+)/).groups;
  const id = name.charAt(0).toUpperCase() + name.slice(1);
  return `#${id}`;
}

module.exports = attacher;
