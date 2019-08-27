const fs = require('fs');
const path = require('path');

const buildPage = require('./build-page-json');
const { ROOT } = require('./constants');

function walk(directory, filepaths) {
    const files = fs.readdirSync(directory);
    for (let filename of files) {
        const filepath = path.join(directory, filename);
        if (path.extname(filename) === '.md' && !/readme.md/i.test(filename)) {
            filepaths.push(path.join(directory, filename));
            continue;
        }
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, filepaths);
        }
    }
}

function findItems(directory, searchPaths) {
    let filepaths = [];
    walk(directory, filepaths);
    return filepaths.filter(
        filePath => !searchPaths.length || searchPaths.some(searchPath => filePath.includes(searchPath)));
}

function buildJSON(searchPaths) {
    let errors = 0;
    const items = findItems(path.resolve(ROOT, 'content'), searchPaths);
    if (!items.length && searchPaths.length) {
        console.error("No elements found");
        errors++;
    }
    
    // XXX Would it be "faster" to Promise.all() spawn these async tasks?!
    items.forEach(async item => {
        let built
        try {
            built = await buildPage.buildPageJSON(item);
            const { docsPath, destPath } = built;
            if (destPath !== null) {
                console.log(`Packaged ${docsPath} to ${destPath}`);
            }
        } catch (error) {
            console.warn(`Failed to build page JSON from ${item}`);
            console.error(error);
            errors++;
        }
        
    })
    return errors;
}

process.exitCode = buildJSON(process.argv.slice(2));
