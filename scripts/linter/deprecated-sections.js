const visit = require("unist-util-visit");

const { hasRecipe } = require("./recipes");
const {
    isHeadingLevel2,
    remarkToSlug,
    remarkToText
} = require("./heading-utils");

const ruleId = "stumptown-linter:deprecated-section";

/**
 * A unified plugin that warns on deprecated sections in Markdown files, if the root node has `tree.data.recipeName`.
 *
 * `options.sections` -- an object consisting of recipe names keyed to arrays of deprecated section slugs.
 */
function attacher(options) {
    const deprecatedSections = options.sections;

    return async function transformer(tree, file) {
        if (hasRecipe(tree)) {
            visit(tree, isHeadingLevel2, node => {
                const slug = remarkToSlug(node);
                const deprecations =
                    deprecatedSections[tree.data.recipeName] || [];

                if (deprecations.includes(slug)) {
                    file.message(
                        `"${remarkToText(node)}" is a deprecated section`,
                        node,
                        ruleId
                    );
                }
            });
        }
    };
}

module.exports = attacher;
