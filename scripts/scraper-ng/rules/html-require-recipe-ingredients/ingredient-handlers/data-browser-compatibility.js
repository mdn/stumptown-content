const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.browser_compatibility` ingredient.
 */
function handleDataBrowserCompatibility(tree, logger) {
  const id = "Browser_compatibility";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);

  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return null;
  }

  let macroNodes = [];
  visit(
    utils.sliceSection(heading, body),
    (node) => utils.isMacro(node, "Compat"),
    (node) => {
      macroNodes.push(node);
    }
  );

  if (macroNodes.length !== 1) {
    logger.expected(body, `Compat macro`, "expected-macro");
    return null;
  }

  return heading;
}

module.exports = handleDataBrowserCompatibility;
