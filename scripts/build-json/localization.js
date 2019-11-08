const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const { ROOT, NON_LOCALE_DIRECTORIES, CONTENT_DIR } = require("./constants");

/**
 * Getting the url of all of the other locales
 * that exist for a given document.
 * For each localized version, apart from the
 * /locale/ folder, the path of the doc should be
 * the same for each locale.
 * @param {string} docPath
 * @returns {string[]} an array of URLs for the slugs
 * of each locale (as per the mdn_url attributes of the
 * Markdown file)
 */
function buildLocalesForDoc(docPath) {
  const localeRelativePath = path.relative(
    ROOT + path.sep + CONTENT_DIR,
    docPath
  );
  // ex. fr/html/reference/video/video.md

  const localeAgnosticPath = localeRelativePath
    .split(path.sep)
    .splice(1)
    .join(path.sep);
  // ex. html/reference/video/video.md

  const localizedURLs = [];
  const existingLocales = getAllLocales();

  existingLocales.forEach(locale => {
    // Get the files that have the same path
    // if such a localized version exists
    const potentialLocalePath = path.join(
      ROOT,
      CONTENT_DIR,
      locale,
      localeAgnosticPath
    );
    if (fs.existsSync(potentialLocalePath)) {
      const localizedDocPath = potentialLocalePath;
      // For each of them, fetch the mdn_url
      const { data } = matter(fs.readFileSync(localizedDocPath, "utf8"));
      if (!data || !data.mdn_url) {
        return;
      } else {
        const localizedURL = data.mdn_url;
        localizedURLs.push({
          locale: locale,
          mdn_url: localizedURL
        });
      }
    }
  });
  localizedURLs.sort((localeA, localeB) => localeA.locale > localeB.locale);
  console.table(localizedURLs);
  return localizedURLs;
}

/**
 * A utils function to list all of the existing locales
 * under content (whether they have content or not)
 */
function getAllLocales() {
  const dirContent = fs.readdirSync(ROOT + path.sep + CONTENT_DIR, {
    withFileTypes: true
  });
  const directories = dirContent.filter(
    dirent =>
      dirent.isDirectory() && !NON_LOCALE_DIRECTORIES.includes(dirent.name)
  );
  const localeDirectories = directories.map(dirent => dirent.name);
  return localeDirectories;
}

module.exports = {
  buildLocalesForDoc
};
