const toVFile = require("./url-to-vfile");
const reporter = require("vfile-reporter");

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
  .describe("q", "Suppess success messages")
  .alias("q", "quiet")
  .describe("v", "Expand linter notes, if applicable")
  .alias("v", "verbose")
  .boolean(["n", "q", "v"]).argv;

async function run() {
  const vfiles = [];

  for (const opt of argv._) {
    vfiles.push(await toVFile(opt));
  }

  console.log(reporter(vfiles, { quiet: argv.quiet, verbose: argv.verbose }));
}

run();
