const frontmatter = require("remark-frontmatter");
const parse = require("remark-parse");
const report = require("vfile-reporter");
const stringify = require("remark-stringify");
const unified = require("unified");
const vfile = require("to-vfile");

const collectRecipes = require("./collect-recipes");
const collectDocs = require("./collect-docs");
const deprecatedSections = require("./plugins/deprecated-sections");
const missingSections = require("./plugins/missing-sections");
const validRecipe = require("./plugins/valid-recipes");
const yamlLoader = require("./plugins/yaml-loader");

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
        const file = await vfile.read(fp);
        await markdownParser().process(file);
        reportedFiles.push(file);
    }

    console.error(report(reportedFiles, { quiet: true }));
}

if (require.main === module) {
    main();
}
