const path = require("path");

const { packageBCD } = require("./resolve-bcd");
const { packageExamples } = require("./compose-examples");
const { packageAttributes } = require("./compose-attributes");
const { packageInteractiveExample } = require("./compose-interactive-example");
const { packageProse } = require("./slice-prose");
const { packageSpecs } = require("./build-specs");
const { buildLinkList } = require("./build-link-lists");

function processMetaIngredient(elementPath, ingredientName, data) {
  // If an ingredient is missing in the data, just return null
  // Assume that the linter checks for required ingredients
  if (!data[ingredientName]) {
    return null;
  }
  switch (ingredientName) {
    case "interactive_example":
      return packageInteractiveExample(data.interactive_example);
    case "specifications":
      return packageSpecs(data.specifications);
    case "browser_compatibility":
      return {
        title: "Browser compatibility",
        id: "browser_compatibility",
        query: data.browser_compatibility,
        data: packageBCD(data.browser_compatibility),
      };
    case "attributes":
      if (data.attributes.element_specific) {
        return packageAttributes(elementPath, data.attributes.element_specific);
      } else {
        return [];
      }
    case "examples": {
      const examplesPaths = data.examples.map((relativePath) =>
        path.join(elementPath, relativePath)
      );
      return {
        title: "Examples",
        id: "examples",
        examples: packageExamples(examplesPaths),
      };
    }
    case "link_lists": {
      return data.link_lists.map(buildLinkList);
    }
    case "constructor":
      return buildLinkList({
        title: "Constructor",
        pages: [data.class_constructor],
      });
    case "static_methods":
      return buildLinkList({
        title: "Static methods",
        directory: data.static_methods,
      });
    case "instance_methods":
      return buildLinkList({
        title: "Instance methods",
        directory: data.instance_methods,
      });
    case "info_box":
      // TODO: implement packaging for info boxes
      // See: https://github.com/mdn/stumptown-content/issues/106
      return "info_box-value";
    default:
      throw new Error(`Unrecognized ingredient: ${ingredientName}`);
  }
}

function buildRecipePageJSON(elementPath, data, content, recipe) {
  const body = [];

  const proseSections = packageProse(content);
  // for each ingredient in the recipe, process the item's ingredient
  for (let ingredient of recipe.body) {
    const [ingredientType, ingredientName] = ingredient
      .replace(/\?$/, "")
      .split(".");
    if (ingredientType === "data") {
      // non-prose ingredients, which are specified in front matter
      const value = processMetaIngredient(elementPath, ingredientName, data);
      if (value !== null) {
        body.push({
          type: ingredientName,
          value: value,
        });
      }
    } else if (ingredientType === "prose" && ingredientName === "*") {
      // additional (unnamed) prose sections
      const additionalProse = proseSections.filter(
        (section) => !section.value.id
      );
      body.push(...additionalProse);
    } else if (ingredientType === "prose") {
      // named prose sections
      const matches = proseSections.filter(
        (section) => section.value.id === ingredientName
      );
      body.push(...matches);
    } else {
      throw new Error(
        `Unrecognized ingredient type: ${ingredientType} in ${elementPath}`
      );
    }
  }

  return body;
}

module.exports = {
  buildRecipePageJSON,
};
