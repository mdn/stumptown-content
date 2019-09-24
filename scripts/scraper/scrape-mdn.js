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

const unified = require('unified');
const parse = require('rehype-parse');
const stringify = require('remark-stringify');
const rehype2remark = require('rehype-remark');

const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const baseURL = 'https://developer.mozilla.org';

/**
 * Converts the HTML -> Markdown using unified.
 */
function toMarkdown(html) {
  return unified()
    .use(parse)
    .use(rehype2remark)
    .use(stringify)
    .process(html);
}

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

function addFrontMatter(title, url, md) {
  const fullURL = `${baseURL}${url}`;
  return `---\ntitle: ${title}\nmdn_url: ${fullURL}\n---\n${md}`;
}

function removeTitleAttributes(dom) {
  const links = dom.window.document.querySelectorAll('a');
  for (let link of links) {
    link.removeAttribute('title');
  }
}

function removeSidebar(dom) {
  const sidebar = dom.window.document.querySelector('section.Quick_links');
  if (sidebar) {
    sidebar.parentNode.removeChild(sidebar);
  }
}

/**
 * 1. Convert the given HTML to JSDOM
 * 2. Do any cleaning we want
 * 3. Serialize the result back to HTML
 */
function cleanHTML(html) {
  const dom = new JSDOM(html);
  removeTitleAttributes(dom);
  removeSidebar(dom);
  return dom.serialize();
}

/**
 * 1. Get the raw HTML from the given url.
 * 2. Pass the HTML to the cleaner
 * 3. Convert the clean HTML to Markdown and return it.
 */
function processSingleDocContent(mdnURL) {
  const mdnRaw = mdnURL + '?raw&macros';
  return fetch(mdnRaw)
    .then(result => result.text())
    .then(text => cleanHTML(text))
    .then(text => toMarkdown(text));
}

function getPageJSON(url) {
  return fetch(url).then(result => result.json());
}

/**
 * 1. Get cleaned and converted Markdown from MDN
 * 2. Add front matter
 * 3. Save the resulting content to a file.
 */
async function processDoc(relativeURL, title, destination) {
  const absoluteURL = baseURL + relativeURL;
  const md = String(await processSingleDocContent(absoluteURL));
  const doc = addFrontMatter(title, relativeURL, md);
  writeDoc(destination, relativeURL.split('/').pop(), doc);
}

/**
 * If 'scrape-children' was passed, scrape the children of the given page
 * and process them as well as the parent.
 * Otherwise just process the given page.
 */
async function main(args) {
  if (args.includes('--scrape-children')) {
    const childrenJSON = await getPageJSON(args[0] + '$children');
    childrenJSON.subpages.map(child => {
      // the final component of the parent's URL
      // is used as a subdirectory for the children
      const subpath = args[0].split('/').pop();
      processDoc(child.url, child.title, path.join(args[1], subpath));
    });
  }
  const docJSON = await getPageJSON(args[0] + '$json');
  processDoc(docJSON.url, docJSON.title, args[1]);
}

main(process.argv.slice(2));
