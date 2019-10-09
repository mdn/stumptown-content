/*
Turns MDN Document API JSON into stumptown docs.

Usage:

npm run from-mdn <sourcedirectory> <destination> [searchfilter]

<sourcedirectory>: Directory where the MDN docs have been downloaded to.
<destination>: Where we put the transform JSON into markdown files.
<destination>: Where to put the processed document. This is relative to the current
working directory.
<searchfilter>: Used when recursively scanning the sourcedirectory.

*/
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const util = require("util");
const minimist = require("minimist");
const buildOptions = require("minimist-options");
const glob = require("glob");

const { toMarkdown } = require("./to-markdown.js");
// const { removeNode, removeTitleAttributes } = require("./clean-html.js");
const {
    processInteractiveExample
} = require("./process-macros/process-interactive-example");
const { processCompat } = require("./process-macros/process-compat");
const { processLiveSamples } = require("./process-macros/process-live-samples");

// const { JSDOM } = jsdom;

// Turn callback based functions into functions you can "await".
const globPromise = util.promisify(glob);
const readFile = util.promisify(fs.readFile);

/**
 * Just writes the doc out where we want.
 */
function writeDoc(destination, subpath, name, doc) {
    const dest = path.join(destination, subpath, name);
    // const destDir = path.dirname(dest);
    // if (!fs.existsSync(destDir)) {
    //     fs.mkdirSync(destDir, { recursive: true });
    // }
    fs.writeFileSync(dest, doc);
}

// function getPageJSON(url) {
//     return fetch(url).then(response => response.json());
// }

// function getPageHTML(url) {
//     return fetch(url).then(response => response.text());
// }

/**
 * Process macros in the page.
 * This can result in:
 *     - adding new front matter items (e.g. BCD query)
 *     - change the page content (e.g. removing the BCD table)
 *     - even creating new files (e.g. files comprising live samples)
 */
async function processMacros(dom, kumaRaw, destination) {
    // to process macros, we need the version before macros are executed
    // const mdnWithMacroCalls = await getPageHTML(baseURL + relativeURL + "?raw");
    // `result` gets mutated by the functions that process macros
    let result = {
        frontMatter: "",
        dom: dom
    };
    result = await processInteractiveExample(kumaRaw, result);
    result = await processCompat(kumaRaw, result);
    result = await processLiveSamples(kumaRaw, result, destination);
    return result;
}

// /**
//  * Process a single MDN page.
//  * - convert it to a DOM fragment
//  * - do some generic cleanup (e.g. removing title attributes)
//  * - process various macro calls in the page.
//  * - convert the DOM->HTML->Markdown
//  * - write out the file, including front matter and content
//  */
// async function processDoc(relativeURL, title, destination) {
//     const mdnPage = await getPageHTML(baseURL + relativeURL + "?raw&macros");
//     const dom = new JSDOM(mdnPage);
//     removeTitleAttributes(dom);
//     removeNode(dom, "section.Quick_links");
//     const result = await processMacros(dom, relativeURL, destination);
//     const md = String(await toMarkdown(result.dom.serialize()));
//     const frontMatter = `---\ntitle: '${title}'\nmdn_url: ${baseURL +
//         relativeURL}\n${result.frontMatter}---\n`;
//     writeDoc(destination, relativeURL.split("/").pop(), `${frontMatter}${md}`);
// }

// /**
//  * If 'scrape-children' was passed, scrape the children of the given page
//  * and process them as well as the parent.
//  * Otherwise just process the given page.
//  */
// async function main(args) {
//     if (args.includes("--scrape-children")) {
//         const childrenJSON = await getPageJSON(args[0] + "$children");
//         childrenJSON.subpages.map(child => {
//             // the final component of the parent's URL
//             // is used as a subdirectory for the children
//             const subpath = args[0].split("/").pop();
//             processDoc(child.url, child.title, path.join(args[1], subpath));
//         });
//     }
//     const docJSON = await getPageJSON(args[0] + "$json");
//     processDoc(docJSON.url, docJSON.title, args[1]);
// }

async function processDoc(filepath, uri, destination) {
    const json = JSON.parse(await readFile(filepath, "utf8"));
    console.log(json);
    const { documentData } = json;
    const frontMatter = [["title", documentData.title], ["mdn_url", uri]];
    // Last but not least...
    frontMatter.push(["recipe", "mdn-legacy"]);

    const destDir = path.join(destination, uri);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const dom = new JSDOM(documentData.bodyHTML.trim());
    const result = await processMacros(dom, documentData.raw, destDir);
    console.log("RESULT:", result);

    const md = String(await toMarkdown(documentData.bodyHTML.trim()));

    const frontMatterString = frontMatter
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    const body = `---\n${frontMatterString}\n---\n\n${md}\n`;

    const sidebar = documentData.quickLinksHTML.trim();

    // const name = uri.split("/").pop();
    const mdName = `docs.md`;
    const sidebarName = `sidebar.html`;

    writeDoc(destination, uri.slice(1), mdName, body);
    writeDoc(destination, uri.slice(1), sidebarName, sidebar);
}

async function start(source, destination, searchfilter = "") {
    const allFiles = await globPromise(path.join(source, "**/*.json"));
    const files = allFiles
        .map(p => {
            return {
                filepath: p,
                uri: "/" + path.relative(source, path.dirname(p))
            };
        })
        .filter(o => {
            return !searchfilter || o.uri.includes(searchfilter);
        });
    return await Promise.all(
        files.map(o => processDoc(o.filepath, o.uri, destination))
    );
    // console.log(values);
}

async function main(argv) {
    const options = buildOptions({
        arguments: "string",
        help: {
            alias: ["h"],
            default: false,
            type: "boolean"
        },
        searchfilter: {
            alias: "s",
            default: "",
            type: "string"
        }
    });
    const args = minimist(argv, options);
    function usage() {
        console.log(`
Usage:
  node ${__filename} [options] SOURCE DESTINATION

Options:
  -h, --help           prints this
  -s, --search         search filter when finding from the source directory
`);
    }

    if (args["help"]) {
        usage();
        process.exit(0);
    }
    if (args["_"].length !== 2) {
        console.error("Error: Must be 2 arguments.");
        usage();
        process.exit(1);
    }
    const [source, destination] = args["_"];
    // const source = args[0];
    // const destination = args[1];
    start(source, destination, args["searchfilter"]);
}
main(process.argv.slice(2));
