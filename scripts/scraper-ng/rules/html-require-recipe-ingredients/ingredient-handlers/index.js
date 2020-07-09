const { select } = require("hast-util-select");

const classMembers = require("./data-class-members");
const handleDataBrowserCompatibility = require("./data-browser-compatibility");
const handleDataConstituentProperties = require("./data-constituent-properties");
const handleDataConstructor = require("./data-constructor");
const handleDataExamples = require("./data-examples");
const handleDataFormalDefinition = require("./data-formal-definition");
const handleDataFormalSyntax = require("./data-formal-syntax");
const handleDataInteractiveExample = require("./data-interactive-example");
const handleDataPermittedProperties = require("./data-permitted-properties");
const handleDataSpecifications = require("./data-specifications");
const handleProseShortDescription = require("./prose-short-description");

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
  "data.browser_compatibility": handleDataBrowserCompatibility,
  "data.constituent_properties": handleDataConstituentProperties,
  "data.constructor_properties?": classMembers.handleDataConstructorProperties,
  "data.constructor": handleDataConstructor,
  "data.examples": handleDataExamples,
  "data.formal_definition": handleDataFormalDefinition,
  "data.formal_syntax": handleDataFormalSyntax,
  "data.instance_methods?": classMembers.handleDataInstanceMethods,
  "data.instance_properties?": classMembers.handleDataInstanceProperties,
  "data.interactive_example?": handleDataInteractiveExample,
  "data.permitted_properties?": handleDataPermittedProperties,
  "data.specifications": handleDataSpecifications,
  "data.static_methods?": classMembers.handleDataStaticMethods,
  "data.static_properties?": classMembers.handleDataStaticProperties,
  "prose.accessibility_concerns?": optionalTopLevelHeading(
    "Accessibility_concerns"
  ),
  "prose.description?": optionalTopLevelHeading("Description"),
  "prose.error_type": requireTopLevelHeading("Error_type"),
  "prose.message": requireTopLevelHeading("Message"),
  "prose.see_also": requireTopLevelHeading("See_also"),
  "prose.short_description": handleProseShortDescription,
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
