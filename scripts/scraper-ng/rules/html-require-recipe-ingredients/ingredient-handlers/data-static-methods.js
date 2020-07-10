const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.static_methods` ingredient.
 */
const handleDataStaticMethods = linkListHandler("Static_methods");

module.exports = handleDataStaticMethods;
