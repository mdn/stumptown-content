const checkLinkList = require("./link-list-handler.js");

/**
 * Handler for the `data.static_methods` ingredient.
 */
function handleDataStaticMethods(tree, logger) {
  checkLinkList("Static_methods", tree, logger);
}

module.exports = {
  handleDataStaticMethods,
};
