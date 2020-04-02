const fs = require("fs");
const path = require("path");

const buildPage = require("./build-page-json");
const { ROOT } = require("./constants");

function findItems(directory, searchPaths, filepaths = []) {
  const files = fs.readdirSync(directory);
  for (let filename of files) {
    const filepath = path.join(directory, filename);
    if (fs.statSync(filepath).isDirectory()) {
      findItems(filepath, searchPaths, filepaths);
    } else if (path.extname(filename) === ".md") {
      if (
        !searchPaths.length ||
        searchPaths.some((s) => filepath.includes(s))
      ) {
        filepaths.push(filepath);
      }
    }
  }
  return filepaths;
}

function buildJSON(searchPaths) {
  let errors = 0;
  const items = findItems(path.resolve(ROOT, "content"), searchPaths);
  if (!items.length && searchPaths.length) {
    console.error("No elements found");
    errors++;
  }

  const cwd = process.cwd() + path.sep;
  function printPath(p) {
    return p.replace(cwd, "");
  }
  items.forEach((item) => {
    let built;
    try {
      built = buildPage.buildPageJSON(item);
      const { docsPath, destPath } = built;
      if (destPath !== null) {
        console.log(
          `Packaged ${printPath(docsPath)} to ${printPath(destPath)}`
        );
      }
    } catch (error) {
      console.warn(`Failed to build page JSON from ${item}`);
      console.error(error);
      errors++;
    }
  });
  return errors;
}

process.exitCode = buildJSON(process.argv.slice(2));
