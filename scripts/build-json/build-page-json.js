const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const matter = require("gray-matter");

const { packageContributors } = require("./resolve-contributors");
const related = require("./related-content");
const guidePage = require("./build-guide-page-json");
const recipePage = require("./build-recipe-page-json");
const { ROOT } = require("./constants");

function writeToFile(json, elementPath) {
  // 'elementPath' is the folder the source came from
  // Like '/path/to/stumptown/content/html/element/video for example.
  const propertyName = path.basename(elementPath);
  const dirName = path.dirname(elementPath);
  const dest = path
    .join(
      dirName.replace(path.join(ROOT, "content"), path.join(ROOT, "packaged")),
      `${propertyName}.json`
    )
    .toLowerCase();
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, JSON.stringify(json, null, 2));
  return dest;
}

const recipeCache = {};
function getRecipeUsingCache(recipeName) {
  let recipe;
  if (recipe in recipeCache === false) {
    const recipePath = path.join(
      __dirname,
      "..",
      "..",
      "recipes",
      `${recipeName}.yaml`
    );
    if (!fs.existsSync(recipePath)) {
      throw new Error(`Not a supported recipe: ${recipeName}`);
    }
    recipeCache[recipeName] = yaml.safeLoad(
      fs.readFileSync(recipePath, "utf8")
    );
  }
  return recipeCache[recipeName];
}

function buildPageJSON(docsPath) {
  // open docs.md and parse front matter(data) from Markdown(content)
  const docsDirectory = path.dirname(docsPath);
  const locale = path
    .relative("content", path.relative(ROOT, docsDirectory))
    .split(path.sep)[0];
  const docs = fs.readFileSync(docsPath, "utf8");
  const { data, content } = matter(docs);

  // What was written
  let destPath = null;

  // check whether this is a buildable item
  // skip css-property for now, until we have fixed the data there
  if (data && data.recipe && data.recipe !== "css-property") {
    let body = null;
    let relatedContentSpec = data.related_content;
    let contributors = null;
    // special-case guide pages
    if (data.recipe === "guide") {
      body = guidePage.buildGuideContentJSON(docsDirectory, data, content);
    } else {
      const recipe = getRecipeUsingCache(data.recipe);
      // related content may be specified in the recipe or in the front matter directly.
      // prefer the version in the front matter
      if (!relatedContentSpec) {
        relatedContentSpec = recipe.related_content;
      }
      body = recipePage.buildRecipePageJSON(
        docsDirectory,
        data,
        content,
        recipe
      );
      // currently only recipe-driven content supports contributors
      contributors = packageContributors(
        path.join(docsDirectory, "contributors.md")
      );
    }

    // build the item
    const item = {
      title: data.title,
      mdn_url: data.mdn_url,
      related_content: related.buildRelatedContent(relatedContentSpec, locale),
      body: body,
      contributors: contributors,
    };

    destPath = writeToFile(item, docsDirectory);
  }

  return { docsPath, destPath };
}

module.exports = {
  buildPageJSON,
};
