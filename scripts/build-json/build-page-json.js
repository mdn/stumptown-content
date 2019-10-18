const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const { packageContributors } = require('./resolve-contributors');
const related = require('./related-content');
const guidePage = require('./build-guide-page-json');
const landingPage = require('./build-landing-page-json');
const recipePage = require('./build-recipe-page-json');
const { ROOT } = require('./constants');


function writeToFile(json, elementPath) {
    // 'elementPath' is the folder the source came from
    // Like '/path/to/stumptown/content/html/element/video for example.
    const propertyName = path.basename(elementPath);
    const dirName = path.dirname(elementPath);
    const dest = path.join(dirName.replace(
        path.join(ROOT, 'content'),
        path.join(ROOT, 'packaged')
    ), `${propertyName}.json`);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(dest, JSON.stringify(json, null, 2));
    return dest;
}

const recipeCache = {};
async function buildPageJSON(docsPath) {
    // open docs.md and parse front matter(data) from Markdown(content)
    const docsDirectory = path.dirname(docsPath);
    const docs = fs.readFileSync(docsPath, 'utf8');
    const { data, content } = matter(docs);

    // What was written
    let destPath = null;

    // check whether this is a buildable item
    if (data && data.recipe) {
        let body = null;
        let relatedContentSpec = data.related_content;
        let contributors = null;

        switch (data.recipe) {
            case 'guide':
                body = await guidePage.buildGuideContentJSON(docsDirectory, data, content);
                break;
            case 'landing-page':
                body = await landingPage.buildLandingPageJSON(docsDirectory, data, content);
                break;
            case 'html-element':
            case 'html-input-element': {
                    const cached = recipeCache[data.recipe];
                    let recipe;
                    if (cached !== undefined) {
                      recipe = cached;
                    } else {
                      // for recipe-driven content, related_content is in the recipe
                      const recipePath = path.join(__dirname, '..', '..', 'recipes', `${data.recipe}.yaml`);
                      recipe = yaml.safeLoad(fs.readFileSync(recipePath, 'utf8'));
                      recipeCache[data.recipe] = recipe;
                    }
                    relatedContentSpec = recipe.related_content;
                    body = await recipePage.buildRecipePageJSON(docsDirectory, data, content, recipe);
                    // currently only reference-driven content supports contributors
                    contributors = await packageContributors(path.join(docsDirectory, 'contributors.md'))
                    break;
                }
            default:
                throw new Error(`Not a supported recipe: ${data.recipe}`);
        }

        // build the item
        const item = {
          title: data.title,
          mdn_url: data.mdn_url,
          related_content: await related.buildRelatedContent(relatedContentSpec),
          body: body,
          contributors: contributors
        };

        destPath = writeToFile(item, docsDirectory);
    }

    return { docsPath, destPath };
}

module.exports = {
    buildPageJSON
}
