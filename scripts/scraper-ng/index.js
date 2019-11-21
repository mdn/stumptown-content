const rehype = require("rehype");
const reporter = require("vfile-reporter");

const toVFile = require("./url-to-vfile");

const examplePage = "https://developer.mozilla.org/…/div";
const examplePath = "https://developer.mozilla.org/…/div";
const secondExample = "https://developer.mozilla.org/…/span";

const argv = require("yargs")
  .usage("Usage: $0 <url> …")
  .example(`$0 ${examplePage}`, "scrape a page")
  .example(`$0 -n ${examplePath}`, "dry run (lint)")
  .example(`$0 -n ${examplePath} ${secondExample}`, "scrape many URLs")
  .demandCommand(1, "Not enough URLs")
  .describe("n", "Dry run (lint)")
  .alias("n", "dry-run")
  .describe("q", "Suppress success messages")
  .alias("q", "quiet")
  .describe("v", "Expand linter notes, if applicable")
  .alias("v", "verbose")
  .boolean(["n", "q", "v"]).argv;

const processor = rehype()
  .use([require("./plugins/kumascript-macros")])
  .use([
    require("./rules/html-has-bcd-table"),
    require("./rules/html-warn-macros")
  ]);
// TODO: add YAML frontmatter insertion

async function run() {
  const vfiles = [];

  for (const opt of argv._) {
    const file = await toVFile(opt);

    // If any messages are fatal, then don't process the file contents (as it
    // probably doesn't exist)
    const hasFatalError = file.messages.reduce(
      (prev, curr) => prev || curr.fatal,
      false
    );
    if (!hasFatalError) {
      await processor.process(file);
    }

    // TODO: write processed file to disk
    // Implementation notes:
    // - "rename" vfile (i.e., change file.path) to a real destination path
    // - write file.contents to disk
    vfiles.push(file);
  }

  console.log(reporter(vfiles, { quiet: argv.quiet, verbose: argv.verbose }));
}

run();
