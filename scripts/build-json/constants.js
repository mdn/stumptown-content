const path = require("path");

// Root of the whole stumptown-content.
// To be used instead of process.cwd()
const ROOT = path.join(__dirname, "..", "..");
const NON_LOCALE_DIRECTORIES = ["data"];
const CONTENT_DIR = "content";

module.exports = {
  ROOT,
  NON_LOCALE_DIRECTORIES,
  CONTENT_DIR
};
