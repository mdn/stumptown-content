const fetch = require("node-fetch");
const rehype = require("rehype");
const reporter = require("vfile-reporter");

const mdnUrl = require("./mdn-url");
const toVFile = require("./url-to-vfile");

const examplePage =
  "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div";
const exampleShorthand = "/en-US/docs/Web/HTML/Element/div";

const argv = require("yargs")
  .parserConfiguration({ "boolean-negation": false })
  .usage("Usage: $0 <url>")
  .example(`$0 ${examplePage}`, "scrape a page and all its subpages")
  .example(`$0 ${exampleShorthand}`, "omit the protocol and domain")
  .example(`$0 --no-subpages ${exampleShorthand}`, "one page only")
  .example(`$0 -n ${exampleShorthand}`, "dry run (lint)")
  .demandCommand(1, 1, "A URL is required", "Too many arguments")
  .describe("no-subpages", "Don't walk the entire tree from the URL")
  .default("no-subpages", false)
  .describe("n", "Dry run (lint)")
  .alias("n", "dry-run")
  .describe("q", "Suppress success messages")
  .alias("q", "quiet")
  .describe("v", "Expand linter notes, if applicable")
  .alias("v", "verbose")
  .boolean(["n", "q", "v", "no-subpages"]).argv;

const processor = rehype()
  .use([require("./plugins/kumascript-macros")])
  .use([require("./preset")]);
// TODO: add YAML frontmatter insertion

async function run() {
  const root = await fetchTree(argv._[0]);
  const urls = argv.noSubpages ? [root.url] : flattenTree(root);
  const files = urls.map(async url => {
    const file = await toVFile(url);
    const hasFileErrors = file.messages.length > 0;
    if (!hasFileErrors) {
      await processor.process(file);
    }
    return file;
  });
  const processed = await Promise.all(files);

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
