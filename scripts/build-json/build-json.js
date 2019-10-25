const fs = require('fs');
const path = require('path');

const buildPage = require('./build-page-json');
const { ROOT } = require('./constants');


function findItems(directory, searchPaths, filepaths = []) {
    const files = fs.readdirSync(directory);
    for (let filename of files) {
        const filepath = path.join(directory, filename);
        if (path.extname(filename) === '.md') {
            if (!searchPaths.length || searchPaths.some(s => filepath.includes(s))) {
                filepaths.push(filepath);
            }
        } else if (fs.statSync(filepath).isDirectory()) {
            findItems(filepath, searchPaths, filepaths);
        }
    }
    return filepaths;
}

async function buildJSON(searchPaths) {
    const items = findItems(path.resolve(ROOT, 'content'), searchPaths);
    if (!items.length && searchPaths.length) {
        console.error("No elements found");
        return 1;
    }

    const cwd = process.cwd() + path.sep;
    function printPath(p) {
        return p.replace(cwd, '');
    }

    const results = await Promise.all(items.map(async item => {
        try {
            const built = await buildPage.buildPageJSON(item);
            const { docsPath, destPath } = built;
            if (destPath !== null) {
                console.log(`Packaged ${printPath(docsPath)} to ${printPath(destPath)}`);
            }
            return true;
        } catch (error) {
            console.warn(`Failed to build page JSON from ${item}`);
            console.error(error);
            return false;
        }
    }));
    if (!results.every(Boolean)) {
        throw new Error('At least one document failed');
    }
}

buildJSON(process.argv.slice(2)).catch(() => {
    console.warn("At least one document failed.");
    process.exitCode = 1;
});
