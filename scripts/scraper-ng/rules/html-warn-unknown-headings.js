const path = require("path");

const { selectAll } = require("hast-util-select");

const source = "html-warn-unknown-headings";

/**
 * Emit warnings when a page contains H2 headings that don't
 * correspond to ingredients in the page's recipe.
 */
function warnUnknownHeadings() {
  return function attacher(tree, file) {
    const recipeName = path.basename(file.data.recipePath, ".yaml");
    const { recipe } = file.data;
    const expectedH2 = expectedH2Headings(recipe.body);
    const actualH2 = selectAll(`h2`, tree);
    for (const actual of actualH2) {
      if (!expectedH2.includes(actual.properties.id)) {
        file.message(
          `H2 heading: ${actual.properties.id} was not in recipe`,
          actual,
          `${source}:${recipeName}/unknown-heading`
        );
      }
    }
  };
}

function expectedH2Headings(recipeBody) {
  // exclude any ingredients that don't map to H2 headings
  const namedProseSections = recipeBody.filter(
    (ingredient) =>
      ingredient !== "prose.*" &&
      ingredient !== "prose.short_description" &&
      ingredient !== "data.interactive_example?"
  );
  return namedProseSections.map((namedProse) => {
    let result = namedProse.replace(/^.*\./, ""); // remove "<prefix>."
    result = result.replace(/\?$/, ""); // remove optional "?"
    result = result[0].toUpperCase() + result.slice(1); // capitalize initial
    return result;
  });
}

module.exports = warnUnknownHeadings;
