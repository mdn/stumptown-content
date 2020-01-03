const chalk = require("chalk");
const statistics = require("vfile-statistics");

/**
 * Generate a summary report of VFile messages.
 *
 * @param {(VFile|Array.<VFile>|Error)} files - `VFile`, `Array.<VFile>`, or `Error`
 * @returns A string
 */
function reporter(files) {
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

  // Actually generate the summary
  return summarize(files);
}

function summarize(files) {
  const count = countRules(files);

  const sortedRules = Object.entries(count)
    .map(([ruleId, details]) => ({
      ruleId,
      ...details
    }))
    .sort((a, b) => a.count - b.count)
    .reverse();

  const ruleFields = sortedRules.map(formatRule);

  const columns = ruleFields[0].length;
  const widths = ruleFields.map(rule => rule.map(field => field.length));
  const maxWidths = widths.reduce(
    (prev, curr) => prev.map((number, index) => Math.max(number, curr[index])),
    Array(columns).fill(0)
  );

  const paddedFields = ruleFields.map(rule =>
    rule.map((field, columnNumber) => field.padEnd(maxWidths[columnNumber]))
  );

  const prologue = ["", chalk`{yellow {underline Summary}}`];
  const body = paddedFields.map(field => field.join("  "));
  const epilogue = ["", formatStats(files, body)];

  return [].concat(prologue, body, epilogue).join("\n");
}

/**
 * Count each message ruleId found in the array of vfiles.
 *
 * @param {Array.<VFile>} files
 * @returns
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
          count: 1
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
 * @returns
 */
function formatRule({ count, fatal, reason, ruleId }) {
  const plural = count > 1 ? "s" : "";
  const severity = fatal
    ? chalk.red(`error${plural}`)
    : chalk.yellow(`warning${plural}`);
  return [reason, `${count} ${severity}`, ruleId];
}

/**
 * Make a human-readable string of statistics from the summary.
 *
 * @param {Array.<VFile>} files
 * @param {Array.<String>} summaryLines
 * @returns {String}
 */
function formatStats(files, summaryLines) {
  const { fatal, nonfatal, total } = statistics(files);

  const plural = num => (num === 1 ? "" : "s");

  const notices = total > 0 ? `${total} notice${plural(total)}` : "";
  const errors =
    fatal > 0 ? `${chalk.red("✖")} ${fatal} error${plural(fatal)}` : "";
  const warnings =
    nonfatal > 0
      ? `${chalk.yellow("⚠")} ${nonfatal} warning${plural(nonfatal)}`
      : "";

  const breakdown = [notices, errors, warnings].filter(Boolean).join(", ");
  const parenthetical = breakdown ? `(${breakdown})` : "";

  return [
    `${summaryLines.length} notice type${plural(summaryLines.length)}`,
    parenthetical,
    `in ${files.length} file${plural(files.length)}`
  ].join(" ");
}

module.exports = reporter;
