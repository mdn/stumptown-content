const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.constructor_properties` ingredient.
 */
const handleDataConstructorProperties = linkListHandler(
  "Constructor_properties"
);

module.exports = handleDataConstructorProperties;
