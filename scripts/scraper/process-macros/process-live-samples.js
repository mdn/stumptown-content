const fs = require("fs");
const path = require("path");

const { toMarkdown } = require("../to-markdown.js");
const { extractMacroCalls } = require("./extract-macro-calls");

/**
 * A given live sample has a 'scope' in the page content. Within its scope,
 * all `html`, `css`, `js` code blocks are part of the sample code.
 *
 * If the scope is expressed as the ID of a block element, that's just the scope.
 * If the scope if expressed as the ID of a heading, we piece the scope together
 * in this function.
 */
function getSampleScope(startNode, dom) {
  // for each possible start tag, list the tags that tell us when to stop
  const stopCollectingMap = {
    H1: ["H1"],
    H2: ["H1", "H2"],
    H3: ["H1", "H2", "H3"],
    H4: ["H1", "H2", "H3", "H4"],
    H5: ["H1", "H2", "H3", "H4", "H5"],
    H6: ["H1", "H2", "H3", "H4", "H5", "H6"],
  };

  const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];

  if (!headingTags.includes(startNode.tagName)) {
    return startNode;
  }

  const container = dom.window.document.createElement("DIV");
  let sibling = startNode.nextSibling;
  while (
    sibling &&
    !stopCollectingMap[startNode.tagName].includes(sibling.tagName)
  ) {
    sibling.parentNode.removeChild(sibling);
    container.appendChild(sibling);
    sibling = startNode.nextSibling;
  }
  startNode.parentNode.removeChild(startNode);
  return container;
}

function scrapeCodeComponents(container, type) {
  const codeComponents = container.querySelectorAll(`pre.${type}`);
  let source = "";
  for (let codeComponent of codeComponents) {
    source += codeComponent.textContent;
    codeComponent.parentNode.removeChild(codeComponent);
  }
  return source;
}

function writeSource(destDir, filename, source) {
  if (source) {
    const sourceDest = path.join(destDir, filename);
    fs.writeFileSync(sourceDest, source);
  }
}

function writeExampleContents(exampleContents, examplesDir) {
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir);
  }
  const frontMatter = `---\ntitle: ${exampleContents.title}\nheight: ${exampleContents.height}\n---`;
  const descriptionContents = `${frontMatter}\n${exampleContents.description}`;
  const descriptionDest = path.join(examplesDir, "description.md");
  fs.writeFileSync(descriptionDest, descriptionContents);
  writeSource(examplesDir, "example.html", exampleContents.htmlSource);
  writeSource(examplesDir, "example.css", exampleContents.cssSource);
  writeSource(examplesDir, "example.js", exampleContents.jsSource);
}

/**
 * This function extracts a single live sample from an MDN page.
 *
 * See https://developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Live_samples
 * for background on live samples.
 *
 * A given live sample has a 'scope' in the page content. Within its scope,
 * all `html`, `css`, `js` code blocks are part of the sample code.
 *
 * The EmbedLiveSample macro can express scope in one of two ways:
 * - the ID of a block element such as a DIV: then that is the scope
 * - the ID of a heading: then the scope is all elements until the next equal or higher-level heading
 *
 * In this function we extract the 'scope' for the given EmbedLiveSample call,
 * and extract all the code blocks, putting them into their 'example.html' etc files.
 *
 * Anything left over in the scope is scraped into the 'description.md' file.
 *
 * We write all these files out under /examples/example_id.
 *
 * We remove the content from the original DOM.
 */
async function extractLiveSample(macroArgs, dom, examplesDir) {
  const startNode = dom.window.document.querySelector(`#${macroArgs[0]}`);
  const container = getSampleScope(startNode, dom);
  const exampleContents = {
    title: startNode.tagName === "DIV" ? macroArgs[0] : startNode.textContent,
    width: macroArgs[1] || "100%",
    height: macroArgs[2] || "192",
    htmlSource: scrapeCodeComponents(container, "html"),
    jsSource: scrapeCodeComponents(container, "js"),
    cssSource: scrapeCodeComponents(container, "css"),
    // The scrapeCodeComponents calls remove code blocks from `container`,
    // so must go *before* this line, which just sweeps up whatever's left.
    description: String(await toMarkdown(container.innerHTML)),
  };
  writeExampleContents(exampleContents, path.join(examplesDir, macroArgs[0]));
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
  return dom;
}

/**
 * Here we find out which EmbedLiveSample calls are made in this file,
 * and make the appropriate front matter.
 * For each EmbedLiveSample call, we call extractLiveSample to do the dirty work.
 */
async function processLiveSamples(htmlWithMacroCalls, result, destination) {
  const macroCalls = extractMacroCalls("EmbedLiveSample", htmlWithMacroCalls);
  const examplesDir = path.join(process.cwd(), destination, "examples");
  if (macroCalls.length) {
    let lsFrontMatter = "examples:\n";
    lsFrontMatter += macroCalls
      .map((macroCall) => `    - examples/${macroCall[0]}\n`)
      .join("");
    result.frontMatter += lsFrontMatter;
    if (!fs.existsSync(examplesDir)) {
      fs.mkdirSync(examplesDir);
    }
  }
  for (let macroCall of macroCalls) {
    result.dom = await extractLiveSample(macroCall, result.dom, examplesDir);
  }
  return result;
}

module.exports = {
  processLiveSamples,
};
