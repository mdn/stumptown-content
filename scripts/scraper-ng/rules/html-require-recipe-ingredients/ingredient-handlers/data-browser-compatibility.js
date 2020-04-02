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
    logger.fail(body, `Expected h2#${id}`, "expected-heading");
    return;
  }

  let macroCount = 0;
  visit(
    utils.sliceSection(heading, body),
    (node) => utils.isMacro(node, "Compat"),
    () => {
      macroCount += 1;
    }
  );

  if (macroCount !== 1) {
    logger.fail(body, `Expected Compat macro`, "expected-macro");
  }
}

module.exports = handleDataBrowserCompatibility;
