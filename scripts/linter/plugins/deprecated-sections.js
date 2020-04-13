const visit = require("unist-util-visit");

const ruleId = "stumptown-linter:deprecated-section";

/**
 * A unified plugin that warns on deprecated sections in Markdown files, if `tree.data.recipeName` is set.
 *
 * `options.sections` -- an object consisting of recipe names keyed to arrays of deprecated section slugs
 */
function attacher(options) {
  const deprecatedSections = options.sections;

  return function transformer(tree, file) {
    if (tree && tree.data && tree.data.recipe !== undefined) {
      const deprecations = deprecatedSections[tree.data.recipeName] || [];

      visit(
        tree,
        (node) => node.data && node.data.slug,
        (node) => {
          if (deprecations.includes(node.data.slug)) {
            file.message(
              `"${node.data.slug}" is a deprecated section`,
              node,
              ruleId
            );
          }
        }
      );
    }
  };
}

module.exports = attacher;
