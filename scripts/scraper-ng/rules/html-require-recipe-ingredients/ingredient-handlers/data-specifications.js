const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
const handleDataSpecifications = utils.sectionHandler(
  "Specifications",
  (section, logger) => {
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
      logger.expected(section.children[0], "SpecName macro", "expected-macro");
      return false;
    }

    return true;
  }
);

module.exports = handleDataSpecifications;
