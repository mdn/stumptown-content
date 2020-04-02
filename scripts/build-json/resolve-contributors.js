const fs = require("fs");

const markdown = require("./markdown-converter");

function packageContributors(contributorsPath) {
  const contributorsMD = fs.readFileSync(contributorsPath, "utf8");
  return markdown.markdownToHTML(contributorsMD);
}

module.exports = {
  packageContributors,
};
