const select = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Function returning true only if the given node is a text node
 * that contains only newlines.
 */
function isNewlineOnlyTextNode(node) {
  return node.type === "text" && node.value.match(/^\n*$/);
}

/**
 * Checks a single example. This only does any checking for live samples:
 * that is, examples that contain a call to the EmbedLiveSample macro.
 */
function checkExample(exampleNodes, logger) {
  let liveSampleNode = null;
  visit(exampleNodes, (node) => {
    // If we have already seen an EmbedLiveSample call...
    if (liveSampleNode !== null) {
      // ...then the only nodes allowed after that point are text nodes containing only newlines
      if (!isNewlineOnlyTextNode(node)) {
        logger.fail(
          node,
          "EmbedLiveSample must be final node",
          "nodes-after-live-sample"
        );
      }
    }
    if (utils.isMacro(node, "EmbedLiveSample")) {
      liveSampleNode = node;
    }
  });
  // If this example didn't contain a call to EmbedLiveSample, there are no further checks
  if (!liveSampleNode) {
    return;
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
  }
}

/**
 * Handler for the `data.examples` ingredient.
 */
function handleDataExamples(tree, logger) {
  const id = "Examples";
  const body = select.select(`body`, tree);
  const heading = select.select(`h2#${id}`, body);

  // The document must have an H2 section "Examples"
  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return;
  }

  const examplesSection = utils.sliceSection(heading, body);

  // The "Examples" section must contain at least one H3
  const exampleTitles = select.selectAll("h3", examplesSection);
  if (exampleTitles.length === 0) {
    logger.fail(
      examplesSection,
      "No H3-demarcated examples found",
      "missing-example-h3"
    );
    return;
  }

  for (const exampleTitle of exampleTitles) {
    // Extract and check each example
    const exampleSection = utils.sliceBetween(
      exampleTitle,
      (node) => node.tagName === "h3",
      examplesSection
    );
    checkExample(exampleSection, logger);
  }
}

module.exports = handleDataExamples;
