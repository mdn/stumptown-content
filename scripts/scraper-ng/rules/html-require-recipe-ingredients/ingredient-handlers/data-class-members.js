const checkLinkList = require("./link-list-checker.js");

/**
 * Handler for the `data.constructor_properties` ingredient.
 */
function handleDataConstructorProperties(tree, logger) {
  return checkLinkList("Constructor_properties", tree, logger);
}

/**
 * Handler for the `data.static_methods` ingredient.
 */
function handleDataStaticMethods(tree, logger) {
  return checkLinkList("Static_methods", tree, logger);
}

/**
 * Handler for the `data.static_properties` ingredient.
 */
function handleDataStaticProperties(tree, logger) {
  return checkLinkList("Static_properties", tree, logger);
}

/**
 * Handler for the `data.instance_methods` ingredient.
 */
function handleDataInstanceMethods(tree, logger) {
  return checkLinkList("Instance_methods", tree, logger);
}

/**
 * Handler for the `data.instance_properties` ingredient.
 */
function handleDataInstanceProperties(tree, logger) {
  return checkLinkList("Instance_properties", tree, logger);
}

module.exports = {
  handleDataConstructorProperties,
  handleDataStaticMethods,
  handleDataStaticProperties,
  handleDataInstanceMethods,
  handleDataInstanceProperties,
};
