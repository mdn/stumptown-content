const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const buildPage = require('./build-page-json');

function walk(directory, filepaths) {
    const files = fs.readdirSync(directory);
    for (let filename of files) {
        const filepath = path.join(directory, filename);
        if (filename === 'meta.yaml') {
            filepaths.push(directory);
            continue;
        }
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, filepaths);
        }
    }
}

function collectItems(directory) {
    let filepaths = [];
    walk(directory, filepaths);
    filepaths = filepaths.map( filepath => filepath.slice(path.join(process.cwd(), './content/').length) )
    return filepaths;
}

function buildJSON() {
    const items = collectItems(path.resolve(process.cwd(), './content'));
    for (let item of items) {
        buildPage.buildPageJSON(item);
    }
}

if (process.argv[2]) {
    buildPage.buildPageJSON(process.argv[2]);
} else {
    buildJSON();
}
