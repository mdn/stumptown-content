const fsPromises = require("fs").promises;
const path = require("path");

/**
 * Walks the content directory tree (`start`) yielding Markdown files.
 */
async function* walkContent(start = "content") {
    const files = await fsPromises.readdir(start, { withFileTypes: true });

    for (const f of files) {
        if (f.name.endsWith(".md")) {
            yield path.join(start, f.name);
        } else if (f.isDirectory()) {
            yield* walkContent(path.join(start, f.name));
        }
    }
}

/**
 * Return an array of paths to Markdown files.
 */
async function collectDocs() {
    const candidateDocs = [];

    for await (const candidateDoc of walkContent()) {
        candidateDocs.push(candidateDoc);
    }

    return candidateDocs;
}

module.exports = collectDocs;
