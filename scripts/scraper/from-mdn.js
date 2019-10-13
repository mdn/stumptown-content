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
const crypto = require("crypto");

const minimist = require("minimist");
const buildOptions = require("minimist-options");
const glob = require("glob");

const { packageBCD } = require("../build-json/resolve-bcd");

// Turn callback based functions into functions you can "await".
const globPromise = util.promisify(glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function processDoc(filepath, uri, destination, digestPrefix) {
    const digestDestination = destination + ".digest";
    // const filecontent = await readFile(filepath, "utf8");
    const filecontent = fs.readFileSync(filepath, "utf8");

    const hashSum = crypto.createHash("md5");
    const sourceDigest = `${digestPrefix}.${hashSum
        .update(filecontent)
        .digest("hex")
        .slice(0, 7)}`;

    let previousSourceDigest = null;
    try {
        // previousSourceDigest = await readFile(digestDestination, "utf8");
        previousSourceDigest = fs.readFileSync(digestDestination, "utf8");
    } catch (er) {
        // Ignore
    }
    if (previousSourceDigest && sourceDigest === previousSourceDigest) {
        // Already processed!
        return null;
    }
    const doc = {
        mdn_url: uri
    };
    let json;
    if (filecontent) {
        // try {
        json = JSON.parse(filecontent);
        // } catch (err) {
        //     console.log({ filecontent });
        //     // cole.error(`filecontent: ${filecontent}`);
        //     throw err;
        // }
    } else {
        console.warn(`${filepath} is completely empty`);
        return null;
    }
    const { documentData } = json;

    if (!documentData) {
        if (!json.redirectURL) {
            throw new Error(`No idea how to deal with that! ${filecontent}`);
        }
        doc.redirect_url = json.redirectURL;
    } else {
        // JSDOM.fragment() is significantly less likely to leak compared
        // to doing something like:
        //   const dom = new JSDOM(htmlstring)
        //   ...
        //   dom.window.close();
        const document = JSDOM.fragment(documentData.bodyHTML.trim());

        // Remove those '<span class="alllinks"><a href="/en-US/docs/tag/Web">View All...</a></span>' links
        [...document.querySelectorAll("span.alllinks")].forEach(node =>
            node.parentNode.removeChild(node)
        );
        // Remove any completely empty '<p>', '<dl>' tags
        [...document.querySelectorAll("p,dl,div")]
            .filter(node => {
                return !node.firstChild;
            })
            .forEach(node => node.parentNode.removeChild(node));

        const sections = [];
        if (!documentData.raw) {
            throw new Error(`documentData in ${filepath} does not have 'raw'`);
        }
        let macroCalls;
        try {
            macroCalls = extractMacroCalls(documentData.raw);
        } catch (err) {
            console.log(`extractMacroCalls failed on: ${filepath}`);
            throw err;
        }

        let newDom = JSDOM.fragment("<div></div>");
        [...document.childNodes].forEach(child => {
            if (child.nodeName === "H2") {
                sections.push(addSection(newDom, macroCalls));
                newDom = JSDOM.fragment("<div></div>");
            }
            newDom.firstChild.appendChild(child);
        });
        if (newDom) {
            sections.push(addSection(newDom, macroCalls));
        }

        doc.title = documentData.title;
        doc.body = sections;
        doc.sidebar = documentData.quickLinksHTML.trim();
        doc.last_modified = documentData.lastModified;
    }

    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(destination, JSON.stringify(doc, null, 2));
    fs.writeFileSync(digestDestination, sourceDigest);
    const m = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`MEM: ${m.toFixed(2)} MB`);
    // if (process.memoryUsage().heapUsed > 326099792) {
    //     global.gc();
    //     console.log(
    //         "GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC GC"
    //     );
    //     // await new Promise(resolve => setTimeout(resolve, 1000));
    // }
    //
    return destination;
}

function addSection(document, macroCalls) {
    // If the section is BCD scrap all the HTML

    if (macroCalls.Compat && document.querySelector("div.bc-data")) {
        let compat = macroCalls.Compat[0];
        if (Array.isArray(compat)) {
            // In KumaScript there's a 2nd argument that is the depth.
            // E.g. `{{compat("html.elements.link", 2)}}`
            // XXX I *think* that's just a KumaScript thing and not
            // related to the 'mdn-browser-compat-data' package.
            compat = compat[0];
        }
        if (typeof compat !== "string") {
            throw new Error(`Unrecognized Compat first argument: ${compat}`);
        }
        const bcdData = packageBCD(compat);
        return {
            type: "browser_compatibility",
            value: bcdData
        };
    }
    const h2 = document.querySelector("h2");
    if (h2) {
        const id = h2.id;
        const title = h2.textContent;
        h2.parentNode.removeChild(h2);
        return {
            type: "prose",
            value: {
                id,
                title,
                content: document.firstChild.innerHTML.trim()
            }
        };
    }
    // all else, leave as is
    return {
        type: "prose",
        value: {
            content: document.firstChild.innerHTML.trim()
        }
    };
}

async function start(source, outDir, searchfilter = "") {
    // Every input file's content is a parameter to precheck if we've
    // already consumed it before.
    // But what if *this* very file here has changed but the inputs
    // haven't? That's what this is for...
    const selfDigest = crypto
        .createHash("md5")
        .update(await readFile(__filename))
        .digest("hex")
        .slice(0, 7);

    const allFiles = await globPromise(path.join(source, "**/*.json"), {
        // There are folders like 'manifest.json' which must be ignored.
        nodir: true
    });
    const files = allFiles
        .map(filepath => {
            let uri = "/";
            if (path.basename(filepath) === "index.json") {
                // E.g. /en-US/Web/HTML/Element/index.json
                uri = "/" + path.relative(source, path.dirname(filepath));
            } else {
                // E.g. /en-US/Web/HTML/Element/video.json
                uri =
                    "/" +
                    path.relative(source, filepath).replace(/\.json$/, "");
            }
            const destination = path.join(outDir, uri) + ".json";

            // To respect the legacy have to put the "/docs/" in after the
            // locale.
            if (uri.split("/")[1] !== "docs") {
                const parts = uri.split("/");
                parts.splice(1, 0, "docs");
                uri = parts.join("/");
            }
            return { filepath, uri, destination };
        })
        .filter(o => {
            return !searchfilter || o.uri.includes(searchfilter);
        });
    const filesLength = files.length;
    return files.map((o, index) => {
        const t0 = Date.now();
        const wrote = processDoc(o.filepath, o.uri, o.destination, selfDigest);
        const t1 = Date.now();
        if (wrote) {
            const p = (100 * (index + 1)) / filesLength;
            console.log(
                `(${index} - ${p.toFixed(1)}%) Wrote ${wrote} in ${t1 - t0}ms`
            );
        }

        return wrote;
    });
}

function extractMacroCalls(text) {
    const calls = {};
    for (const match of text.matchAll(/{{\s*(\w+)\s*\((.*?)\)\s*}}/g)) {
        const macroName = match[1];
        if (!calls[macroName]) {
            calls[macroName] = [];
        }
        const macroArgs = evaluateMacroArgs(match[2].trim());
        calls[macroName].push(macroArgs);
    }
    return calls;
}

function evaluateMacroArgs(argsString) {
    if (argsString.startsWith("{") && argsString.endsWith("}")) {
        return JSON.parse(argsString);
    }
    if (argsString.includes(",")) {
        return eval(`[${argsString}]`);
    }
    // XXX A proper parser instead??
    try {
        return eval(argsString);
    } catch (err) {
        console.warn(`Unable to parse: ${argsString}`);
        return argsString;
    }
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
    const t0 = new Date();
    const values = await start(source, destination, args["searchfilter"]);
    const t1 = new Date();
    const written = values.filter(v => v).length;
    const skipped = values.length - written;
    if (written) {
        console.log(`Wrote ${written} files.`);
        console.log(`Roughly ${((t1 - t0) / written).toFixed(1)}ms/page`);
    }
    if (skipped) {
        console.log(
            `Skipped ${skipped} files because unchanged digest inputs.`
        );
    }
    console.log(`Total time: ${t1 - t0}ms.`);
}
main(process.argv.slice(2));
