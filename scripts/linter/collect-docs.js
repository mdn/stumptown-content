const fsPromises = require("fs").promises;
const path = require("path");

/**
 * Walks the content directory tree (`start`) yielding Markdown or `meta.yaml` files with `recipe` frontmatter.
 */
async function* walkContent(start = "content") {
    const files = await fsPromises.readdir(start, { withFileTypes: true });

    const hasMeta = files.map(f => f.name).includes("meta.yaml");
    if (hasMeta) {
        yield path.join(start, "meta.yaml");
    } else {
        for (const f of files) {
            if (f.name.endsWith(".md")) {
                yield path.join(start, f.name);
            } else if (f.isDirectory()) {
                yield* walkContent(path.join(start, f.name));
            }
        }
    }
}

/**
 * Checks if there's a recipe name in `filePath`.
 */
async function isRootDoc(filePath) {
    const file = await fsPromises.readFile(filePath);
    return /^recipe: [\w-]+$/gm.test(file);
}

/**
 * Return an array of paths to (probably) lintable Markdown or YAML files.
 */
async function collectDocs() {
    const candidateDocs = [];

    for await (const candidateDoc of walkContent()) {
        if (await isRootDoc(candidateDoc)) {
            candidateDocs.push(candidateDoc);
        }
    }

    return candidateDocs;
}

module.exports = collectDocs;
