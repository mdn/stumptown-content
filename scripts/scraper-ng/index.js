const fetch = require("node-fetch");
const fileReporter = require("vfile-reporter");
const jsonReporter = require("vfile-reporter-json");
const VMessage = require("vfile-message");
const yargs = require("yargs");

const kumascriptRehype = require("./plugins/kumascript-rehype-parse");
const limiter = require("./rate-limiter");
const mdnUrl = require("./mdn-url");
const summaryReporter = require("./vfile-reporter-summary");
const toVFile = require("./url-to-vfile");

const examplePage =
  "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div";
const exampleShorthand = "/en-US/docs/Web/HTML/Element/div";

const { argv } = yargs
  .parserConfiguration({ "boolean-negation": false })
  .usage("Usage: $0 <url>")
  .example(`$0 ${examplePage}`, "scrape a page and all its subpages")
  .example(`$0 ${exampleShorthand}`, "omit the protocol and domain")

  .describe("json", "Format results as JSON")
  .example(`$0 --json ${exampleShorthand}`)

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
  .boolean(["n", "no-subpages", "q", "s", "v"])

  .wrap(yargs.terminalWidth());

const processor = kumascriptRehype()
  .use([
    require("./plugins/kuma-metadata"),
    require("./plugins/identify-recipes"),
  ])
  .use([require("./preset")]);
// TODO: add YAML frontmatter insertion

async function run() {
  const root = await fetchTree(argv._[0]);
  const urls = argv.noSubpages ? [root.url] : flattenTree(root);

  console.error(`Preparing to lint ${urls.length} pages…`);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // give 2 seconds to gracefully bail out

  const files = urls.map(async (url) => {
    await limiter();
    if (!argv.quiet) console.error(`Fetching ${url}`);
    const file = await toVFile(url);
    const hasFileErrors = file.messages.length > 0;
    if (!hasFileErrors) {
      try {
        await processor.process(file);
      } catch (err) {
        // If a VMessage gets thrown, then this should not interrupt subsequent
        // files, but other errors should break everything
        if (!(err instanceof VMessage)) {
          throw err;
        }
      }
    }
    return file;
  });
  const processed = await Promise.all(files);

  console.log(
    report(processed, {
      json: argv.json,
      quiet: argv.quiet,
      summary: argv.summary,
      verbose: argv.verbose,
    })
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

/**
 * Choose and generate a report.
 *
 * @param {Array.<VFile>} files - processed files to report on
 * @param {Object} [options={}] - options for report formats. Options are also
 * passed through to the end reporter; see specific reporters for additional options.
 * @param {boolean} [options.json=false] - format the report as JSON
 * @param {boolean} [options.summary=false] - append a summary (not applicable to JSON reports)
 * @returns {String} - a report string
 */
function report(files, options = {}) {
  let reporter = fileReporter;

  if (options.json) {
    reporter = jsonReporter;
  } else if (options.summary) {
    reporter = summaryReporter;
  }

  return reporter(files, options);
}

run();
