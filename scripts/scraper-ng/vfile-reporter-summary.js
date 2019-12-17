/**
 * Generate a summary report of the messages for the given `VFile`, `Array.<VFile>`, or `Error`.
 *
 * @param {(VFile|Array.<VFile>|Error)} files - `VFile`, `Array.<VFile>`, or `Error`
 * @param {Object} options
 * @returns A string
 */
function reporter(files, options) {
  const settings = options || {};

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
  throw Error("Not implemented");
}

module.exports = reporter;
