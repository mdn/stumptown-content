const visit = require("unist-util-visit");

const { isHeadingLevel2, remarkToSlug } = require("./heading-utils");

const ruleId = "stumptown-linter:missing-section";

/**
 * Given a recipe, return a list of section slugs for required for that recipe.
 */
function requiredSections(recipe) {
    const proseRequiredIngredients = recipe.body.filter(
        ingredient =>
            ingredient.startsWith && // ignore non-string ingredients
            ingredient.startsWith("prose.") &&
            !ingredient.endsWith("?") &&
            !ingredient.endsWith("*")
    );
    const slugs = proseRequiredIngredients.map(
        ingredient => ingredient.split("prose.")[1]
    );
    return slugs;
}

/**
 * A unified plugin that warns on missing sections in Markdown files, if the root node has `tree.data.recipe`.
 */
function attacher() {
    return async function transformer(tree, file) {
        if (tree && tree.data && tree.data.recipe !== undefined) {
            const expectedSections = requiredSections(tree.data.recipe);
            const actualSections = [];

            visit(tree, isHeadingLevel2, node => {
                const slug = remarkToSlug(node);
                actualSections.push(slug);
            });

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
