const visit = require("unist-util-visit");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..");
const dataDir = path.resolve(ROOT, "content", "data");
const specMap = yaml.safeLoad(
  fs.readFileSync(path.join(dataDir, "specifications.yaml"), "utf8")
);

const ruleId = "stumptown-linter:valid-specifications";
const specURLRegex = new RegExp("^http(s)?://[^#]+#.+");

/**
 * Check the front-matter for valid `specifications`
 */
function attacher() {
  return function transformer(tree, file) {
    visit(tree, "yaml", (node) => {
      let specs = node.data.yaml.specifications;
      // specifications are optional
      if (specs) {
        // specifications can be single url or array of urls
        if (!Array.isArray(specs)) {
          specs = [specs];
        }
        specs.forEach((spec) => {
          // "non-standard" is a special string indicating that there is no spec. Allow this one.
          if (spec === "non-standard") {
            return;
          }
          // Any other strings should be URLs and provide a deep link to a spec section.
          if (!specURLRegex.test(spec)) {
            const message = file.message(
              `"${spec}" is not a valid specification link (anchored deep link required).`,
              node,
              ruleId
            );
            message.fatal = true;
          }
          // Spec URLs should be allow-listed, so that we don't list any outdated specs.
          const allowedSpecs = Object.keys(specMap);
          if (!allowedSpecs.some((key) => spec.includes(key))) {
            const message = file.message(
              `Domain for "${spec}" not found in data/specifications.yaml`,
              node,
              ruleId
            );
            message.fatal = true;
          }
        });
      }
    });
  };
}

module.exports = attacher;
