const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.static_properties` ingredient.
 */
const handleDataStaticProperties = linkListHandler("Static_properties");

module.exports = handleDataStaticProperties;
