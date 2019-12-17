const chalk = require("chalk");
const statistics = require("vfile-statistics");

/**
 * Generate a summary report of the messages for the given `VFile`, `Array.<VFile>`, or `Error`.
 *
 * @param {(VFile|Array.<VFile>|Error)} files - `VFile`, `Array.<VFile>`, or `Error`
 * @param {Object} options
 * @returns A string
 */
function reporter(files) {
  // Undefined or `null`
  if (!files) {
    return "";
  }

  // A single Error
  if ("name" in files && "message" in files) {
    throw Error("Not implemented");
  }

  // A single file
  if (!("length" in files)) {
    files = [files];
  }

  // Do the things with the files
  return summarize(files);
}

function summarize(files) {
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

  const rulesArray = Object.entries(rules)
    .map(([ruleId, details]) => ({
      ruleId,
      ...details
    }))
    .sort((a, b) => a.count - b.count)
    .reverse();

  const lineParts = rulesArray.map(formatRule);

  const columns = lineParts[0].length;
  const partWidths = lineParts.map(parts => parts.map(part => part.length));
  const maxWidths = partWidths.reduce(
    (prev, curr) => prev.map((number, index) => Math.max(number, curr[index])),
    Array(columns).fill(0)
  );

  const paddedLineParts = lineParts.map(line =>
    line.map((part, columnNumber) => part.padEnd(maxWidths[columnNumber]))
  );

  const prologue = [""];
  const body = paddedLineParts.map(line => line.join("  "));
  const epilogue = ["", formatStats(files, body)];

  return [].concat(prologue, body, epilogue).join("\n");
}

function formatRule({ count, fatal, reason, ruleId }) {
  const plural = count > 1 ? "s" : "";
  const severity = fatal
    ? chalk.red(`error${plural}`)
    : chalk.yellow(`warning${plural}`);
  return [reason, `${count} ${severity}`, ruleId];
}

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
