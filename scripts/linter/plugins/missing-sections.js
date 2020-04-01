const visit = require("unist-util-visit");

const ruleId = "stumptown-linter:missing-section";

/**
 * Given a recipe, return a list of section slugs for required for that recipe.
 */
function requiredSections(recipe) {
  const proseRequiredIngredients = recipe.body.filter(
    (ingredient) =>
      typeof ingredient === "string" &&
      ingredient.startsWith("prose.") &&
      !ingredient.endsWith("?") &&
      !ingredient.endsWith("*")
  );
  const slugs = proseRequiredIngredients.map(
    (ingredient) => ingredient.split("prose.")[1]
  );
  return slugs;
}

/**
 * A unified plugin that warns on missing sections in Markdown files, if the root node has `tree.data.recipe`.
 */
function attacher() {
  return function transformer(tree, file) {
    if (tree && tree.data && tree.data.recipe !== undefined) {
      const expectedSections = requiredSections(tree.data.recipe);
      const actualSections = [];

      visit(
        tree,
        (node) => node.data && node.data.slug,
        (node) => {
          actualSections.push(`h${node.depth}.` + node.data.slug);
        }
      );

      for (const section of expectedSections) {
        if (!actualSections.includes(section)) {
          file.message(
            `"${tree.data.recipeName}" recipes requires section "${section}"`,
            file,
            ruleId
          );
        }
      }
    }
  };
}

module.exports = attacher;
