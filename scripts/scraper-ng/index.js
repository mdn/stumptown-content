const { RateLimit } = require("async-sema");
const fetch = require("node-fetch");
const fileReporter = require("vfile-reporter");
const rehype = require("rehype");
const yargs = require("yargs");

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

  .describe("level", "Minimum message level")
  .nargs("level", 1)
  .default("level", "info")
  .example(`$0 --level=error ${exampleShorthand}`, "only show errors")

  .describe("ignore", "Filter out a comma-separated rule ID list")
  .nargs("ignore", 1)
  .default("ignore", "")
  .example(
    `$0 --ignore=html-warn-on-macros ${exampleShorthand}`,
    "hide macro errors"
  )

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

  const filtered = filterMessages(processed, {
    level: argv.level,
    ignore: argv.ignore !== "" ? argv.ignore.split(",") : []
  });

  console.log(
    fileReporter(filtered, { quiet: argv.quiet, verbose: argv.verbose })
  );

  if (argv.summary) {
    console.log(
      summaryReporter(filtered, { quiet: argv.quiet, verbose: argv.verbose })
    );
  }
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
 * Filter a list of `VFile` objects's messages.
 *
 * The `options` argument is an object with members:
 *
 * - `level`: a message level to accept ("info", "warning", or "error")
 * - `ignore`: an array of rule ID strings to ignore
 *
 * @param {Array<VFile>} files - an array of VFile objects
 * @param {Object} options - options for filtering messages
 * @returns {Array<VFile>} the array of VFile objects
 */
function filterMessages(files, options) {
  for (const f of files) {
    f.messages = f.messages.filter(msg => {
      return (
        isLevelOrHigher(msg, options.level) && !isIgnored(msg, options.ignore)
      );
    });
  }
  return files;
}

/**
 * Check if a message is at or above a certain level.
 *
 * @param {VFileMessage} message - The message to check
 * @param {"info"|"warning"|"error"} level
 * @returns {Boolean} `true` or `false`
 */
function isLevelOrHigher(message, level) {
  switch (level) {
    case "info":
      return true; // all messages are info or higher
    case "warning":
      return message.fatal !== null;
    case "error":
      return message.fatal === true;
    default:
      return true;
  }
}

/**
 * Check if a message rule is in a list of rule IDs to be ignored.
 *
 * Rules are matched with a trailing `.*` regular expression. For example,
 * `some-rule-` will match `some-rule-one` and `some-rule-two`.
 *
 * @param {VFileMessage} message - The message to check
 * @param {Array<String>} ignorableRules - A list of rule IDs to ignore
 * @returns {Boolean} `true` or `false`
 */
function isIgnored(message, ignorableRules) {
  for (const rule of ignorableRules) {
    if (RegExp(rule + ".*").test(message.ruleId)) {
      return true;
    }
  }
  return false;
}

run();
