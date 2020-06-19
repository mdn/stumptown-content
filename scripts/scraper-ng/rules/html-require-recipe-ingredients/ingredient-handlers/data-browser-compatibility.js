const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.browser_compatibility` ingredient.
 */
const handleDataBrowserCompatibility = utils.requiredSectionHandler(
  "Browser_compatibility",
  handle
);

function handle(tree, logger, section, heading) {
  const id = "Browser_compatibility";

  if (heading === null) {
    logger.expected(section, `h2#${id}`, "expected-heading");
    return null;
  }

  let macroCount = 0;
  visit(
    section,
    (node) => utils.isMacro(node, "Compat"),
    () => {
      macroCount += 1;
    }
  );

  if (macroCount !== 1) {
    logger.expected(section, "Compat macro", "expected-macro");
    return null;
  }

  return heading;
}

module.exports = handleDataBrowserCompatibility;
