/*
A scraper to help migrate MDN docs to stumptown.

Usage:

npm run scrape-mdn <mdn-url> <destination> -- --scrape-children

<mdn-url>: A full URL to an MDN page to scrape.

<destination>: Where to put the processed document. This is relative to the current
working directory.

--scrape-children: If '--scrape-children' is given, fetch the immediate children
of this page and process them as well. Store the child pages under a
subdirectory of <destination>, where the subdirectory name is the parent's name.

The pages are 'processed' on the way. This means that they are:
* converted to JSDOM where various things can be done to them, before going back to HTML
* converted to Markdown
* given some front matter (title and mdn_url)
*/
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { toMarkdown } = require("./to-markdown.js");
const {
  removeBrowserCompatibility,
  removeNode,
  removeTitleAttributes,
} = require("./clean-html.js");
const {
  processInteractiveExample,
} = require("./process-macros/process-interactive-example");
const { processCompat } = require("./process-macros/process-compat");
const { processLiveSamples } = require("./process-macros/process-live-samples");

const baseURL = "https://developer.mozilla.org";

/**
 * Just writes the doc out where we want.
 */
function writeDoc(subpath, name, doc) {
  const dest = path.join(process.cwd(), subpath, `${name}.md`);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, doc);
}

function getPageJSON(url) {
  return fetch(url).then((response) => response.json());
}

function getPageHTML(url) {
  return fetch(url).then((response) => response.text());
}

/**
 * Process macros in the page.
 * This can result in:
 *     - adding new front matter items (e.g. BCD query)
 *     - change the page content (e.g. removing the BCD table)
 *     - even creating new files (e.g. files comprising live samples)
 */
async function processMacros(dom, relativeURL, destination) {
  // to process macros, we need the version before macros are executed
  const mdnWithMacroCalls = await getPageHTML(baseURL + relativeURL + "?raw");
  // `result` gets mutated by the functions that process macros
  let result = {
    frontMatter: "",
    dom: dom,
  };
  result = await processInteractiveExample(mdnWithMacroCalls, result);
  result = await processCompat(mdnWithMacroCalls, result);
  result = await processLiveSamples(mdnWithMacroCalls, result, destination);
  return result;
}

/**
 * Process a single MDN page.
 * - convert it to a DOM fragment
 * - do some generic cleanup (e.g. removing title attributes)
 * - process various macro calls in the page.
 * - convert the DOM->HTML->Markdown
 * - write out the file, including front matter and content
 */
async function processDoc(relativeURL, title, destination) {
  const mdnPage = await getPageHTML(baseURL + relativeURL + "?raw&macros");
  const dom = new JSDOM(mdnPage);
  removeTitleAttributes(dom);
  removeNode(dom, "section.Quick_links");

  const result = await processMacros(dom, relativeURL, destination);

  removeBrowserCompatibility(dom);

  const md = String(await toMarkdown(result.dom.serialize()));
  const frontMatter = `---\ntitle: '${title}'\nmdn_url: ${relativeURL}\n${result.frontMatter}---\n`;
  writeDoc(destination, relativeURL.split("/").pop(), `${frontMatter}${md}\n`);
  dom.window.close();
}

/**
 * If 'scrape-children' was passed, scrape the children of the given page
 * and process them as well as the parent.
 * Otherwise just process the given page.
 */
async function main(args) {
  if (args.includes("--scrape-children")) {
    const childrenJSON = await getPageJSON(args[0] + "$children");
    childrenJSON.subpages.map((child) => {
      // the final component of the parent's URL
      // is used as a subdirectory for the children
      const subpath = args[0].split("/").pop();
      processDoc(child.url, child.title, path.join(args[1], subpath));
    });
  }
  const docJSON = await getPageJSON(args[0] + "$json");
  processDoc(docJSON.url, docJSON.title, args[1]);
}

main(process.argv.slice(2));
