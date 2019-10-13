const visit = require("unist-util-visit");
const yaml = require("js-yaml");

/**
 * Parse the value of YAML-type unist nodes (i.e., frontmatter) and add the resulting object to the node's `data.yaml` field.
 */
function attacher() {
    return function transformer(tree) {
        visit(tree, "yaml", node => {
            node.data = { yaml: yaml.safeLoad(node.value) };
        });
    };
}

module.exports = attacher;
