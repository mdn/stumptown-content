const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
const handleDataSpecifications = utils.requiredSectionHandler(
  "Specifications",
  handle
);

function handle(tree, logger, section, heading) {
  let sectionOk = false;
  visit(section, "text", (node) => {
    if (utils.isMacro(node, "SpecName")) {
      sectionOk = true;
      return visit.SKIP;
    }

    if (node.value.includes("Not part of any standard")) {
      sectionOk = true;
      return visit.SKIP;
    }
  });

  if (!sectionOk) {
    logger.expected(heading, `SpecName macro`, "expected-macro");
    return null;
  }

  return heading;
}

module.exports = handleDataSpecifications;
