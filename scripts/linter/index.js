const frontmatter = require("remark-frontmatter");
const parse = require("remark-parse");
const path = require("path");
const report = require("vfile-reporter");
const stringify = require("remark-stringify");
const unified = require("unified");
const vfile = require("to-vfile");

const collectRecipes = require("./collect-recipes");
const collectDocs = require("./collect-docs");
const deprecatedSections = require("./deprecated-sections");
const missingSections = require("./missing-sections");
const validRecipe = require("./valid-recipes");
const yamlLoader = require("./yaml-loader");

/**
 * Lint a Markdown file from a path and return a `VFile` with attached messages.
 */
async function lintMarkdownDoc(mdParser, filePath) {
    const file = await vfile.read(filePath);
    await mdParser().process(await file);
    return file;
}

/**
 * Lint a `meta.yaml` file path and return an array of `VFile`s with attached messages.
 */
async function lintMetaYamlDoc(mdParser, filePath) {
    const file = await vfile.read(filePath);
    const reportedFiles = [];

    file.message(
        "meta.yaml is deprecated",
        file,
        "stumptown-linter:deprecated-meta-yaml"
    );
    reportedFiles.push(file);

    const proseFile = await vfile.read(
        path.join(path.dirname(file.path), "prose.md")
    );

    // Copy `meta.yaml` contents as frontmatter for `prose.md`.
    proseFile.contents = [
        "---",
        file.contents.toString(),
        "---",
        proseFile.contents.toString()
    ].join("\n");

    await mdParser().process(proseFile);
    reportedFiles.push(proseFile);

    return reportedFiles;
}

async function main() {
    const recipes = await collectRecipes();

    const markdownParser = unified()
        .use(parse)
        .use(stringify)
        .use(frontmatter, ["yaml"])
        .use(yamlLoader)
        .use(validRecipe, { recipes })
        .use(deprecatedSections, {
            sections: {
                "html-element": ["usage_notes"],
                "css-property": ["usage_notes"]
            }
        })
        .use(missingSections);

    const filePaths = await collectDocs();

    const reportedFiles = [];

    for (const fp of filePaths) {
        if (fp.endsWith("meta.yaml")) {
            const files = await lintMetaYamlDoc(markdownParser, fp);
            reportedFiles.push(...files);
        } else {
            reportedFiles.push(await lintMarkdownDoc(markdownParser, fp));
        }
    }

    console.error(report(reportedFiles, { quiet: true }));
}

if (require.main === module) {
    main();
}
