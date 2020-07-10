const { select } = require("hast-util-select");

/**
 * Functions to check for recipe ingredients in Kuma page sources.
 *
 * The key is the name of a recipe ingredient (e.g.,
 * `data.browser_compatibiility` or `prose.syntax`) and the value is a function
 * to process a tree and file for that.
 *
 * Handler functions must take three arguments: a hast tree, a VFile, and a
 * context object. The context object has two entries:
 *
 * - `ingredient` - the name of the ingredient
 * - `recipeName` - the name of the recipe
 *
 * Handler functions may log messages against the file.
 *
 */
const ingredientHandlers = {
  "data.browser_compatibility": require("./data-browser-compatibility"),
  "data.constituent_properties": require("./data-constituent-properties"),
  "data.constructor_properties?": require("./data-constructor-properties"),
  "data.constructor": require("./data-constructor"),
  "data.examples": require("./data-examples"),
  "data.formal_definition": require("./data-formal-definition"),
  "data.formal_syntax": require("./data-formal-syntax"),
  "data.instance_methods?": require("./data-instance-methods"),
  "data.instance_properties?": require("./data-instance-properties"),
  "data.interactive_example?": require("./data-interactive-example"),
  "data.permitted_properties?": require("./data-permitted-properties"),
  "data.specifications": require("./data-specifications"),
  "data.static_methods?": require("./data-static-methods"),
  "data.static_properties?": require("./data-static-properties"),
  "prose.accessibility_concerns?": optionalTopLevelHeading(
    "Accessibility_concerns"
  ),
  "prose.description?": optionalTopLevelHeading("Description"),
  "prose.error_type": requireTopLevelHeading("Error_type"),
  "prose.message": requireTopLevelHeading("Message"),
  "prose.see_also": requireTopLevelHeading("See_also"),
  "prose.short_description": require("./prose-short-description"),
  "prose.syntax": requireTopLevelHeading("Syntax"),
  "prose.what_went_wrong": requireTopLevelHeading("What_went_wrong"),
};

/**
 * A convenience function that returns ingredient handlers for checking
 * the existence of an optional H2 in a hast tree.
 *
 * @param {String} id - an id of an H2 to look for in the hast tree
 * @returns {Function} a function
 */
function optionalTopLevelHeading(id) {
  return (tree) => {
    const heading = select(`h2#${id}`, tree);
    if (heading !== null) {
      return heading;
    }
    return null;
  };
}

/**
 * A convenience function that returns ingredient handlers for checking
 * the existence of a certain H2 in a hast tree.
 *
 * @param {String} id - an id of an H2 to look for in the hast tree
 * @returns {Function} a function
 */
function requireTopLevelHeading(id) {
  return (tree, logger) => {
    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      logger.expected(tree, `h2#${id}`, "expected-heading");
      return null;
    }
    return heading;
  };
}

module.exports = ingredientHandlers;
