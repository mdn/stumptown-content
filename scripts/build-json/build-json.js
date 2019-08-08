const fs = require('fs');
const path = require('path');

const buildPage = require('./build-page-json');

function walk(directory, filepaths) {
    const files = fs.readdirSync(directory);
    for (let filename of files) {
        const filepath = path.join(directory, filename);
        if (path.extname(filename) === '.md') {
            filepaths.push(path.join(directory, filename));
            continue;
        }
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, filepaths);
        }
    }
}

function collectItems(directory, searchPaths) {
    let filepaths = [];
    walk(directory, filepaths);
    filepaths = filepaths.map( 
        filepath => filepath.slice(path.join(process.cwd(), './content/').length) 
    ).filter(filepath => !searchPaths.length || searchPaths.some(searchPath => filepath.includes(searchPath)))
    return filepaths;
}

function buildJSON(searchPaths) {
    let errors = 0;
    const items = collectItems(path.resolve(process.cwd(), './content'), searchPaths);
    if (!items.length && searchPaths.length) {
        console.error("No elements found");
        errors++;
    }
    for (let item of items) {
        const parsed = path.parse(item);
        errors += buildPage.buildPageJSON(parsed.dir, parsed.base);
    }
    return errors;
}

process.exitCode = buildJSON(process.argv.slice(2));
