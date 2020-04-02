const visit = require("unist-util-visit");
const yaml = require("js-yaml");

/**
 * Parse the value of YAML-type unist nodes (i.e., frontmatter) and add the resulting object to the node's `data.yaml` field.
 */
function attacher() {
  return function transformer(tree, file) {
    visit(tree, "yaml", (node) => {
      try {
        node.data = { yaml: yaml.safeLoad(node.value) || {} };
      } catch (error) {
        const message = file.message(error, node);
        message.fatal = true;
      }
    });
  };
}

module.exports = attacher;
