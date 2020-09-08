const { linkListHandler } = require("./link-list-checker.js");

/**
 * Handler for the `data.instance_properties` ingredient.
 */
const handleDataInstanceProperties = linkListHandler("Instance_properties");

module.exports = handleDataInstanceProperties;
