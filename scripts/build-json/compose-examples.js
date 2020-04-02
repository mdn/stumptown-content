const fs = require("fs");
const matter = require("gray-matter");
const markdown = require("./markdown-converter");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Given:
 * - "language": a language identifier
 * - "dom": a JSDOM object representing the complete example
 * - "sources": a JSON object to contain example source code
 * This function will:
 * - Find the node containing the example source for the language
 * - Remove the node from "dom"
 * - Add the content of the example source to "sources"
 */
function extractSource(language, dom, sources) {
  const sourceNode = dom.window.document.querySelector(
    `pre>code[class="language-${language}"`
  );
  if (sourceNode) {
    const preNode = sourceNode.parentNode;
    preNode.parentNode.removeChild(preNode);
    sources[language] = sourceNode.textContent;
  }
}

/**
 * Given a path to an example file, extract the pieces of the example
 * (metadata, description, example sources)
 * and return them as a JSON object.
 */
function packageExample(examplePath) {
  const exampleMD = fs.readFileSync(examplePath, "utf8");
  const { data, content } = matter(exampleMD);
  const contentHTML = markdown.markdownToHTML(content);
  const dom = new JSDOM(contentHTML);

  const sources = {};
  extractSource("html", dom, sources);
  extractSource("css", dom, sources);
  extractSource("js", dom, sources);

  data.content = dom.window.document.body.innerHTML;

  return {
    description: data,
    sources: sources,
  };
}

function packageExamples(paths) {
  return paths.map(packageExample);
}

module.exports = {
  packageExamples,
  packageExample,
};
