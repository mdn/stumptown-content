const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");
const hasProperty = require("hast-util-has-property");
const isElement = require("hast-util-is-element");

function hasBcdTable(tree, file) {
  let foundCompat = false;

  visit(
    tree,
    node =>
      isElement(node, "div") &&
      hasClassName(node, "bc-data") &&
      hasProperty(node, "id") &&
      node.properties.id.startsWith("bcd:"),
    () => {
      foundCompat = true;
      return visit.EXIT;
    }
  );

  if (!foundCompat) {
    const message = file.message("No BCD table found");
    message.note =
      "If this is unexpected, try forcing a re-render of the page. Older compat tables lack expected class and id names.";
    message.fatal = true;
  }
}

/**
 * Check if an unist hast `node` has `name`, among any others, in its list of classes.
 */
function hasClassName(node, name) {
  return (
    hasProperty(node, "className") && node.properties.className.includes(name)
  );
}

module.exports = rule("html-has-bcd-table", hasBcdTable);
