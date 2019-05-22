const fs = require("fs");
const path = require("path");

const matter = require("gray-matter");
const marked = require("marked");

function packageDescription(examplePath) {
    const descriptionMD = fs.readFileSync(
        path.join(examplePath, "description.md"),
        "utf8"
    );
    const { data, content } = matter(descriptionMD);
    data.content = marked(content);
    return data;
}

function packageSources(examplePath) {
    const exampleSource = {};

    const jsPath = path.join(examplePath, "example.js");
    if (fs.existsSync(jsPath)) {
        exampleSource.js = fs.readFileSync(jsPath, "utf8");
    }

    const cssPath = path.join(examplePath, "example.css");
    if (fs.existsSync(cssPath)) {
        exampleSource.css = fs.readFileSync(cssPath, "utf8");
    }

    const htmlPath = path.join(examplePath, "example.html");
    if (fs.existsSync(htmlPath)) {
        exampleSource.html = fs.readFileSync(htmlPath, "utf8");
    }

    return exampleSource;
}

function packageExample(examplePath) {
    return {
        description: packageDescription(examplePath),
        sources: packageSources(examplePath)
    };
}

function package(paths) {
    return paths.map(packageExample);
}

module.exports = {
    package
};
