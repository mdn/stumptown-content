const chalk = require("chalk");

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

  const lineParts = rulesArray.map(humanize);

  const columns = lineParts[0].length;
  const partWidths = lineParts.map(parts => parts.map(part => part.length));
  const maxWidths = partWidths.reduce(
    (prev, curr) => prev.map((number, index) => Math.max(number, curr[index])),
    Array(columns).fill(0)
  );

  const paddedLineParts = lineParts.map(line =>
    line.map((part, columnNumber) => part.padEnd(maxWidths[columnNumber]))
  );

  // TODO: Add stats at the end, with number of pages, etc.

  return paddedLineParts.map(line => line.join("\t")).join("\n");
}

function humanize({ count, fatal, reason, ruleId }) {
  const plural = count > 1 ? "s" : "";
  const severity = fatal
    ? chalk.red(`error${plural}`)
    : chalk.yellow(`warning${plural}`);
  return [reason, `${count} ${severity}`, ruleId];
}

module.exports = reporter;
