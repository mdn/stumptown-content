const frontmatter = require("remark-frontmatter");
const parse = require("remark-parse");
const report = require("vfile-reporter");
const statistics = require("vfile-statistics");
const stringify = require("remark-stringify");
const unified = require("unified");
const vfile = require("to-vfile");

const collectRecipes = require("./collect-recipes");
const deprecatedSections = require("./plugins/deprecated-sections");
const missingSections = require("./plugins/missing-sections");
const slugifySections = require("./plugins/slugify-sections");
const validRecipe = require("./plugins/valid-recipes");
const walkDocs = require("./walk-docs");
const yamlLoader = require("./plugins/yaml-loader");

async function main() {
    const recipes = await collectRecipes();

    const markdownParser = unified()
        .use(parse)
        .use(stringify)
        .use(frontmatter, ["yaml"])
        .use(yamlLoader)
        .use(validRecipe, { recipes })
        .use(slugifySections)
        .use(deprecatedSections, {
            sections: {
                "html-element": ["usage_notes"],
                "css-property": ["usage_notes"]
            }
        })
        .use(missingSections);

    const reportedFiles = [];

    for await (const fp of walkDocs()) {
        const file = await vfile.read(fp);
        await markdownParser().process(file);
        reportedFiles.push(file);
    }

    console.error(report(reportedFiles, { quiet: true }));

    const exitCode = statistics(reportedFiles).fatal ? 1 : 0;
    process.exit(exitCode);
}

if (require.main === module) {
    main();
}
