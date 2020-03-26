const { select } = require("hast-util-select");

const utils = require("./utils.js");
const checkLinkList = require("./link-list-handler.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
function handleDataStaticMethods(tree, file, context) {
  const id = "Static_methods";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);

  // This is an optional ingredient, so if there's no `h2`,
  // assume that the page intends to omit it.
  if (heading === null) {
    return;
  }

  const section = utils.sliceSection(heading, body);
  // the first element is always the `h2`, which we are not interested in
  const children = section.children.slice(1);
  const logError = utils.logError(body, file, context);
  checkLinkList(children, logError);
}

module.exports = handleDataStaticMethods;
