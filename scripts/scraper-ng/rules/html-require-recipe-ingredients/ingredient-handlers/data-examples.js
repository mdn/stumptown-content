const select = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Checks a single example. This only does any checking for live samples:
 * that is, examples that contain a call to the EmbedLiveSample macro.
 */
function checkExample(exampleNodes, logger) {
  let ok = true;
  let liveSampleNode = null;
  visit(exampleNodes, (node) => {
    // If we have already seen an EmbedLiveSample call...
    if (liveSampleNode !== null) {
      // ...then the only nodes allowed after that point are text nodes containing only newlines
      if (!utils.isNewlineOnlyTextNode(node)) {
        logger.fail(
          node,
          "EmbedLiveSample must be final node",
          "nodes-after-live-sample"
        );
        ok = false;
      }
    }
    if (utils.isMacro(node, "EmbedLiveSample")) {
      liveSampleNode = node;
    }
  });
  // If this example didn't contain a call to EmbedLiveSample, there are no further checks
  if (!liveSampleNode) {
    return ok;
  }
  // The first child of `exampleNodes` is the title
  const exampleTitle = exampleNodes.children[0];
  // The ID argument to the EmbedLiveSample macro must be the ID of the example title
  if (liveSampleNode.data.macroParams[0] !== exampleTitle.properties.id) {
    logger.fail(
      liveSampleNode,
      "EmbedLiveSample ID argument must match H3 heading ID",
      "embedlivesample-id-mismatch"
    );
    ok = false;
  }

  return ok;
}

/**
 * Handler for the `data.examples` ingredient.
 */
const handleDataExamples = utils.requiredSectionHandler("Examples", handle);

function handle(tree, logger, examplesSection, heading) {
  // The "Examples" section must contain at least one H3
  const exampleTitles = select.selectAll("h3", examplesSection);
  if (exampleTitles.length === 0) {
    logger.fail(
      examplesSection,
      "No H3-demarcated examples found",
      "missing-example-h3"
    );
    return null;
  }

  for (const exampleTitle of exampleTitles) {
    // Extract and check each example
    const exampleSection = utils.sliceBetween(
      exampleTitle,
      (node) => node.tagName === "h3",
      examplesSection
    );
    if (!checkExample(exampleSection, logger)) {
      return null;
    }
  }

  return heading;
}

module.exports = handleDataExamples;
