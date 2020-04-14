const path = require("path");
const visit = require("unist-util-visit");

const ruleId = "stumptown-linter:frontmatter-valid-recipe";

function expectRecipe(filePath) {
  const basename = path.basename(filePath, ".md");
  const parentDir = path.basename(path.dirname(filePath));
  return basename === parentDir;
}

/**
 * If a tree contains a YAML (frontmatter) node and it contains a recipe, then confirm that it's a recognized recipe.
 *
 * As a convenience, if the recipe is valid, then add the recipe object itself to the root of the tree as `node.data.recipe`.
 */
function attacher(options) {
  const recipes = options.recipes;

  return function transformer(tree, file) {
    visit(tree, "yaml", (node) => {
      const validRecipes = Object.keys(recipes);
      const recipe =
        node.data && node.data.yaml ? node.data.yaml.recipe : undefined;

      if (recipe === undefined) {
        if (expectRecipe(file.path)) {
          const message = file.message(
            "recipe frontmattter expected from file path but not defined",
            node,
            ruleId
          );
          message.fatal = true;
        } else {
          // Uncomment this next line to see what files we're _not_ checking against recipes
          // file.message("files without a recipe are not linted");
        }
      } else if (validRecipes.includes(recipe)) {
        tree.data = tree.data || {};
        tree.data.recipe = recipes[recipe];
        tree.data.recipeName = recipe;
      } else {
        const m = file.message(
          `"${recipe}" recipe was not found in /recipes`,
          node,
          ruleId
        );
        m.fatal = true;
      }
    });
  };
}

module.exports = attacher;
