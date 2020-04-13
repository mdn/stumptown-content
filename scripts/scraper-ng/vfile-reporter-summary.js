const chalk = require("chalk");
const fileReporter = require("vfile-reporter");
const statistics = require("vfile-statistics");

/**
 * Create a report for one or more vfiles and add a summary.
 *
 * @param {(VFile|Array.<VFile>|Error)} files - `VFile`, `Array.<VFile>`, or
 * `Error`
 * @param {Object} options - settings for `vfile-reporter`
 * @param {boolean} [options.verbose=false] - Output long form descriptions of
 * messages
 * @param {boolean} [options.quiet=false] - Do not output anything for a file
 * which has no warnings or errors
 * @param {boolean} [options.silent=false] - Do not output messages without
 * `fatal` set to `true`. Also sets `quiet` to `true`.
 * @returns {String} the report as a string
 */
function reporter(files, options) {
  // Undefined or `null`
  if (!files) {
    return "";
  }

  // A single Error
  if (files instanceof Error) {
    // We might want to implement the full reporter API at some point, but not now.
    throw Error("Not implemented");
  }

  // A single file
  if (!Array.isArray(files)) {
    files = [files];
  }

  // Actually generate the report
  return [fileReporter(files, options), summarize(files)].join("\n");
}

function summarize(files) {
  const count = countRules(files);

  if (Object.entries(count).length === 0) {
    return [
      "",
      chalk.yellow(chalk.underline("Summary")),
      "No issues found. Hooray! 🎉",
    ].join("\n");
  }

  const sortedRules = Object.entries(count)
    .map(([ruleId, details]) => ({
      ruleId,
      ...details,
    }))
    .sort((a, b) => b.count - a.count);

  const ruleFields = sortedRules.map(formatRule);

  const columns = ruleFields[0].length;
  const widths = ruleFields.map((rule) => rule.map((field) => field.length));
  const maxWidths = widths.reduce(
    (prev, curr) => prev.map((number, index) => Math.max(number, curr[index])),
    Array(columns).fill(0)
  );

  const paddedFields = ruleFields.map((rule) =>
    rule.map((field, columnNumber) => field.padEnd(maxWidths[columnNumber]))
  );

  const prologue = ["", chalk.yellow(chalk.underline("Summary"))];
  const body = paddedFields.map((field) => field.join("  "));
  const epilogue = ["", formatStats(files, body)];

  return [].concat(prologue, body, epilogue).join("\n");
}

/**
 * Count each message ruleId found in the array of vfiles.
 *
 * @param {Array.<VFile>} files
 * @returns {Object} An object such that each key is a `ruleId` and each value
 * is an object consisting of a `count` (an integer), a VFile message `reason`,
 * and whether the message is `fatal`.
 */
function countRules(files) {
  const rules = {};

  for (const file of files) {
    for (const message of file.messages) {
      if (rules[message.ruleId]) {
        rules[message.ruleId].count += 1;
      } else {
        rules[message.ruleId] = {
          reason: message.reason,
          fatal: message.fatal,
          count: 1,
        };
      }
    }
  }

  return rules;
}

/**
 * Make an array of human-readable strings describing the rule and its count.
 *
 * @param {Object}
 * @returns {Array.<String>} An array of strings: a VFile message reason, a count and severity, and a ruleId.
 */
function formatRule({ count, fatal, reason, ruleId }) {
  const s = plural(count);
  const severity = fatal ? chalk.red(`error${s}`) : chalk.yellow(`warning${s}`);
  return [reason, `${count} ${severity}`, ruleId];
}

/**
 * Make a human-readable string of statistics from the summary.
 *
 * @param {Array.<VFile>} files - an array of VFiles
 * @param {Array.<String>} summaryLines - an array of lines from the summary
 * @returns {String} a string of statistics
 */
function formatStats(files, summaryLines) {
  const { fatal, nonfatal, total } = statistics(files);

  const notices = total > 0 ? `${total} message${plural(total)}` : "";
  const errors =
    fatal > 0 ? `${chalk.red("✖")} ${fatal} error${plural(fatal)}` : "";
  const warnings =
    nonfatal > 0
      ? `${chalk.yellow("⚠")} ${nonfatal} warning${plural(nonfatal)}`
      : "";

  const breakdown = [notices, errors, warnings].filter(Boolean).join(", ");
  const parenthetical = breakdown ? `(${breakdown})` : "";

  return [
    `${summaryLines.length} message type${plural(summaryLines.length)}`,
    parenthetical,
    `in ${files.length} file${plural(files.length)}`,
  ].join(" ");
}

/**
 * Return an "s" or an empty string, depending on the value of `num`.
 *
 * @param {Number} num
 * @returns {String} "s" or an empty string
 */
function plural(num) {
  return num === 1 ? "" : "s";
}

module.exports = reporter;
