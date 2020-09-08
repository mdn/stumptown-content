const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.instance_methods` ingredient.
 */
const handleDataInstanceMethods = linkListHandler("Instance_methods");

module.exports = handleDataInstanceMethods;
