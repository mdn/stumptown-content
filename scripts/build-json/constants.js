const path = require("path");

// Root of the whole stumptown-content.
// To be used instead of process.cwd()
const ROOT = path.join(__dirname, "..", "..");

module.exports = {
  ROOT,
};
