const fsPromises = require("fs").promises;
const path = require("path");

/**
 * Walks the content directory tree (`start`) yielding Markdown files.
 */
async function* walkDocs(start = "content") {
    const files = await fsPromises.readdir(start, { withFileTypes: true });

    for (const f of files) {
        if (f.isDirectory()) {
            yield* walkDocs(path.join(start, f.name));
        } else if (f.name.endsWith(".md")) {
            yield path.join(start, f.name);
        }
    }
}

module.exports = walkDocs;
