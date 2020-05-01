const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Counts and returns the number of calls to EmbedInteractiveExample
 * in the given `tree`
 */
function countInteractiveExamples(tree) {
  let macroCount = 0;
  visit(
    tree,
    (node) => utils.isMacro(node, "EmbedInteractiveExample"),
    () => {
      macroCount += 1;
    }
  );

  return macroCount;
}

/**
 * The interactive example must be inside a DIV and must be found
 * before the first H2 in the document.
 */
function validateExample(body, logger) {
  let interactiveExampleExists = false;
  // fetch the section of the document before the first H2
  const beforeH2 = utils.sliceSection(body.children[0], body);
  // check that section for interactive examples
  visit(
    beforeH2,
    (node) => utils.isMacro(node, "EmbedInteractiveExample"),
    (node, index, parent) => {
      interactiveExampleExists = true;
      if (parent.tagName !== "div") {
        logger.fail(
          beforeH2,
          "Interactive example must be in a DIV",
          "interactive-example-in-div"
        );
      }
      return visit.EXIT;
    }
  );
  if (!interactiveExampleExists) {
    logger.fail(
      beforeH2,
      "Interactive example must be before first H2",
      "interactive-example-before-first-h2"
    );
  }
}

/**
 * Handler for the `data.interactive_example?` ingredient.
 */
function handleDataInteractiveExample(tree, logger) {
  const body = select(`body`, tree);
  // count the number of interactive examples
  const interactiveExampleCount = countInteractiveExamples(body);
  switch (interactiveExampleCount) {
    case 0:
      // this ingredient is optional, so if there are no examples, we pass
      return;
    case 1:
      // one example was found: validate it
      validateExample(body, logger);
      break;
    default:
      // more than one example is an error
      logger.fail(
        body,
        "Must contain at most one interactive example",
        "at-most-one-interactive-example"
      );
  }
}

module.exports = handleDataInteractiveExample;
