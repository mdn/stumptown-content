const { selectAll } = require("hast-util-select");

// Ingredients that do not have a corresponding H2 element
const ingredientsWithoutH2s = [
  "prose.*",
  "prose.short_description",
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

module.exports = collectProseStar;
