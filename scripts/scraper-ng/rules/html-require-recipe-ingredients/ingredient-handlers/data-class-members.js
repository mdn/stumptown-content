const checkLinkList = require("./link-list-checker.js");

/**
 * Handler for the `data.constructor_properties` ingredient.
 */
function handleDataConstructorProperties(tree, logger) {
  checkLinkList("Constructor_properties", tree, logger);
}

/**
 * Handler for the `data.static_methods` ingredient.
 */
function handleDataStaticMethods(tree, logger) {
  checkLinkList("Static_methods", tree, logger);
}

/**
 * Handler for the `data.static_properties` ingredient.
 */
function handleDataStaticProperties(tree, logger) {
  checkLinkList("Static_properties", tree, logger);
}

/**
 * Handler for the `data.instance_methods` ingredient.
 */
function handleDataInstanceMethods(tree, logger) {
  checkLinkList("Instance_methods", tree, logger);
}

/**
 * Handler for the `data.instance_properties` ingredient.
 */
function handleDataInstanceProperties(tree, logger) {
  checkLinkList("Instance_properties", tree, logger);
}

module.exports = {
  handleDataConstructorProperties,
  handleDataStaticMethods,
  handleDataStaticProperties,
  handleDataInstanceMethods,
  handleDataInstanceProperties,
};
