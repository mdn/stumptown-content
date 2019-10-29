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

function main(args) {
    const recipes = collectRecipes();

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

    if (args.length === 0) {
        args.push(undefined); // use default starting directory
    }

    for (const arg of args) {
        for (const fp of walkDocs(arg)) {
            const file = vfile.readSync(fp);
            markdownParser().processSync(file);
            reportedFiles.push(file);
        }
    }

    console.error(report(reportedFiles, { quiet: true }));

    const exitCode = statistics(reportedFiles).fatal ? 1 : 0;
    process.exit(exitCode);
}

if (require.main === module) {
    main(process.argv.slice(2));
}
