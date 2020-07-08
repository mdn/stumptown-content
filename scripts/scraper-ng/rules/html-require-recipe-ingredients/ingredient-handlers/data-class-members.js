const checkLinkList = require("./link-list-checker.js");
const { sectionHandler } = require("./utils");

/**
 * Handler for the `data.constructor_properties` ingredient.
 */
const handleDataConstructorProperties = sectionHandler(
  "Constructor_properties",
  checkLinkList,
  true
);

/**
 * Handler for the `data.static_methods` ingredient.
 */
const handleDataStaticMethods = sectionHandler(
  "Static_methods",
  checkLinkList,
  true
);

/**
 * Handler for the `data.static_properties` ingredient.
 */
const handleDataStaticProperties = sectionHandler(
  "Static_properties",
  checkLinkList,
  true
);

/**
 * Handler for the `data.instance_methods` ingredient.
 */
const handleDataInstanceMethods = sectionHandler(
  "Instance_methods",
  checkLinkList,
  true
);

/**
 * Handler for the `data.instance_properties` ingredient.
 */
const handleDataInstanceProperties = sectionHandler(
  "Instance_properties",
  checkLinkList,
  true
);

module.exports = {
  handleDataConstructorProperties,
  handleDataStaticMethods,
  handleDataStaticProperties,
  handleDataInstanceMethods,
  handleDataInstanceProperties,
};
