const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.constructor_properties` ingredient.
 */
const handleDataConstructorProperties = linkListHandler(
  "Constructor_properties"
);

/**
 * Handler for the `data.static_methods` ingredient.
 */
const handleDataStaticMethods = linkListHandler("Static_methods");

/**
 * Handler for the `data.static_properties` ingredient.
 */
const handleDataStaticProperties = linkListHandler("Static_properties");

/**
 * Handler for the `data.instance_methods` ingredient.
 */
const handleDataInstanceMethods = linkListHandler("Instance_methods");

/**
 * Handler for the `data.instance_properties` ingredient.
 */
const handleDataInstanceProperties = linkListHandler("Instance_properties");

module.exports = {
  handleDataConstructorProperties,
  handleDataStaticMethods,
  handleDataStaticProperties,
  handleDataInstanceMethods,
  handleDataInstanceProperties,
};
