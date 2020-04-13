const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { ROOT } = require("./constants");

function packageSpecs(specifications) {
  // specifications can be just "non-standard", route it through in that case
  if (specifications === "non-standard") {
    return specifications;
  }

  const dataDir = path.resolve(ROOT, "content", "data");
  const specMap = yaml.safeLoad(
    fs.readFileSync(path.join(dataDir, "specifications.yaml"), "utf8")
  );

  function findTitle(specification) {
    let title = "";
    Object.entries(specMap).forEach(([key, value]) => {
      if (specification.includes(key)) {
        title = value;
      }
    });
    if (title === "") {
      throw new Error(
        `Domain for "${specification}" not found in data/specifications.yaml`
      );
    }
    return title;
  }

  // For authoring convenience, you can provide one or more specs
  if (!Array.isArray(specifications)) {
    specifications = [specifications];
  }

  let packageSpecs = [];
  specifications.forEach((specification) => {
    packageSpecs.push({
      url: specification,
      title: findTitle(specification),
    });
  });

  return packageSpecs;
}

module.exports = {
  packageSpecs,
};
