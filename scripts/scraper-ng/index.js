const { RateLimit } = require("async-sema");
const fetch = require("node-fetch");
const fileReporter = require("vfile-reporter");
const rehype = require("rehype");

const mdnUrl = require("./mdn-url");
const summaryReporter = require("./vfile-reporter-summary");
const toVFile = require("./url-to-vfile");

const examplePage =
  "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div";
const exampleShorthand = "/en-US/docs/Web/HTML/Element/div";

const { argv } = require("yargs")
  .parserConfiguration({ "boolean-negation": false })
  .usage("Usage: $0 <url>")
  .example(`$0 ${examplePage}`, "scrape a page and all its subpages")
  .example(`$0 ${exampleShorthand}`, "omit the protocol and domain")

  .describe("n", "Dry run (lint-only)")
  .alias("n", "dry-run")
  .example(`$0 -n ${exampleShorthand}`, "dry run (lint)")

  .describe("no-subpages", "Don't walk the entire tree from the URL")
  .default("no-subpages", false)
  .example(`$0 --no-subpages ${exampleShorthand}`, "one page only")

  .describe("q", "Suppress success and progress messages")
  .alias("q", "quiet")

  .describe("summary", "Summarize messages across all pages")
  .alias("s", "summary")
  .example(
    `$0 --summary ${exampleShorthand}`,
    "summary of report of message types"
  )

  .describe("v", "Expand linter notes, if applicable")
  .alias("v", "verbose")

  .demandCommand(1, 1, "A URL is required", "Too many arguments")
  .boolean(["n", "no-subpages", "q", "s", "v"]);

const processor = rehype()
  .use([require("./plugins/kumascript-macros")])
  .use([require("./preset")]);
// TODO: add YAML frontmatter insertion

async function run() {
  const root = await fetchTree(argv._[0]);
  const urls = argv.noSubpages ? [root.url] : flattenTree(root);

  console.log(`Preparing to lint ${urls.length} pages…`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // give 2 seconds to gracefully bail out

  const limiter = RateLimit(4, { uniformDistribution: true });
  const files = urls.map(async url => {
    await limiter();
    if (!argv.quiet) console.log(`Fetching ${url}`);
    const file = await toVFile(url);
    const hasFileErrors = file.messages.length > 0;
    if (!hasFileErrors) {
      await processor.process(file);
    }
    return file;
  });
  const processed = await Promise.all(files);

  const reporter = argv.summary ? summaryReporter : fileReporter;
  console.log(
    reporter(processed, { quiet: argv.quiet, verbose: argv.verbose })
  );
}

async function fetchTree(input) {
  const response = await fetch(mdnUrl(input + "$children"));
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

function flattenTree(root) {
  const urls = [root.url];

  if (root.subpages) {
    for (const p of root.subpages) {
      urls.push(...flattenTree(p));
    }
  }

  return urls;
}

run();
