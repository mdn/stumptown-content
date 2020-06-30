const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.browser_compatibility` ingredient.
 */
const handleDataBrowserCompatibility = utils.sectionHandler(
  "Browser_compatibility",
  (section, logger) => {
    let macroCount = 0;
    visit(
      section,
      (node) => utils.isMacro(node, "Compat"),
      () => {
        macroCount += 1;
      }
    );

    if (macroCount !== 1) {
      const heading = section.children[0];
      logger.expected(heading, "Compat macro", "expected-macro");
      return false;
    }

    return true;
  }
);

module.exports = handleDataBrowserCompatibility;
