const path = require("path");

const { selectAll } = require("hast-util-select");

const source = "html-require-ingredient-order";

/**
 * A plugin that sets an error when an ingredient appears before or after another ingredient.
 */
function attacher() {
  return function lintIngredientOrder(tree, file) {
    // TODO: I decided to treat all H2s not identified as another ingredient as a `prose.*` ingredient
    file.data.ingredients.push(...collectProseStar(tree, file));

    // Collect all the page ingredients actually found on the page (the set of known + prose.*, excluding missing)
    const pageIngredients = file.data.ingredients
      .filter((i) => i.position !== null)
      .sort((a, b) => a.position.data.pageIndex - b.position.data.pageIndex); // Sorted by their order on the page
    const pageIngredientNames = new Set(pageIngredients.map((i) => i.name));

    // Get the sequence of expected recipe ingredients, excluding those that
    // definitely don't appear in the page. This skips both 1) optional
    // ingredients that were omitted (which is permissible) and 2) required
    // ingredients that weren't found
    const recipeIngredientNames = file.data.recipe.body.filter((i) =>
      pageIngredientNames.has(i)
    );

    // TODO: Filter the names of expected recipe ingredients by the list of known ingredient names
    // TODO: Pop r1 and i1 and compare. Are they the same name?
    // TODO: If r is prose.* and i is prose.* --> continue as long as i is prose.*, then pop r
    // TODO: elif r !== i --> error, then pop
    // TODO: continue until empty

    // In the list of expected ingredients, replace `prose.*` with a sufficient number of `prose.*` entries to cover all such ingredients
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

    const output = [];
    for (
      let index = 0;
      index < Math.max(recipeIngredientNames.length, pageIngredients.length);
      index++
    ) {
      const recipe = recipeIngredientNames[index];
      const ingredient = pageIngredients[index].name;
      output.push([recipe, ingredient]);
    }
    console.log(output);

    for (
      let index = 0;
      index < Math.max(recipeIngredientNames.length, pageIngredients.length);
      index++
    ) {
      const expectedIngredientName = recipeIngredientNames[index];
      const currentIngredient = pageIngredients[index];

      if (currentIngredient.name !== expectedIngredientName) {
        console.log(
          `Logging ${expectedIngredientName}, ${currentIngredient.name}`
        );
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

const ingredientsWithoutDefinedH2s = [
  "prose.*",
  "prose.short_descriptions",
  "data.interactive_example",
];

function collectProseStar(tree, file) {
  const reservedH2s = [];
  for (const ingredient of file.data.recipe.body) {
    if (!ingredientsWithoutDefinedH2s.includes(ingredient)) {
      const { name } = ingredient.match(/[.](?<name>\w+)/).groups;
      const id = name.charAt(0).toUpperCase() + name.slice(1);
      reservedH2s.push(id);
    }
  }

  const h2s = selectAll("h2", tree);
  const ingredientNodes = file.data.ingredients.reduce((arr, curr) => {
    if (curr.position !== null) {
      arr.push(curr.position);
    }
    return arr;
  }, []);

  // Collect all H2 nodes that are not known to represent an existing ingredient or have a reserved ID
  let proseStars = [];
  for (const h2 of h2s) {
    if (
      !ingredientNodes.includes(h2) &&
      !reservedH2s.includes(h2.properties.id)
    ) {
      proseStars.push({
        name: "prose.*",
        position: h2,
      });
    }
  }

  return proseStars;
}

module.exports = attacher;
