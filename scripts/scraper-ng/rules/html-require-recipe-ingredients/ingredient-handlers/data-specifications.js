const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
function handleDataSpecifications(tree, logger) {
  const id = "Specifications";
  const body = select(`body`, tree);

  const heading = select(`h2#${id}`, body);
  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return;
  }

  let sectionOk = false;
  visit(utils.sliceSection(heading, body), "text", (node) => {
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
  }
}

module.exports = handleDataSpecifications;
