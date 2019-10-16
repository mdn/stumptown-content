const visit = require("unist-util-visit");

const ruleId = "stumptown-linter:frontmatter-valid-recipe";

/**
 * If a tree contains a YAML (frontmatter) node and it contains a recipe, then confirm that it's a recognized recipe.
 *
 * As a convenience, if the recipe is valid, then add the recipe object itself to the root of the tree as `node.data.recipe`.
 */
function attacher(options) {
    const recipes = options.recipes;

    return function transformer(tree, file) {
        visit(tree, "yaml", node => {
            const validRecipes = Object.keys(recipes);
            const recipe = node.data.yaml.recipe;

            if (recipe === undefined) {
                // Uncomment this next line to see what files we're _not_ checking
                // file.message("files without a recipe are not linted");
                return;
            }

            if (validRecipes.includes(recipe)) {
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
