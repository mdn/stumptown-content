/*
A linter that can check that all of our URLs match URLs in MDN's sitemaps.

Usage:

npm run mdn-sitemap-compare [locale [locale2]]

*/

const url = require("url");
const fs = require("fs");
const path = require("path");

const fetch = require("node-fetch");
const matter = require("gray-matter");

const BASE_URL = "https://developer.mozilla.org";
const MAX_WIDTH = 100;
const ROOT = path.join(__dirname, "..", "..");

async function fetchSitemap(url) {
  if (url.startsWith("/")) url = `${BASE_URL}${url}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`${r.status} (${r.statusText}) trying to open ${url}`);
  }
  const payload = await r.text();
  return payload;
}

async function getLocs(url) {
  const payload = await fetchSitemap(url);
  return [...payload.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

function getMDNURL(filePath) {
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  if (data.mdn_url) {
    return data.mdn_url;
  }
  return null;
}

function checkAll(allPossible, locales) {
  function findFiles(directory) {
    const found = fs
      .readdirSync(directory, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
      .map((dirent) => path.join(directory, dirent.name));

    fs.readdirSync(directory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(directory, dirent.name))
      .map(findFiles)
      .forEach((files) => found.push(...files));

    return found;
  }
  const files = findFiles(path.join(ROOT, "content"));
  // This is an array of every possible `mdn_url:` value in all the
  // front matters of all the .md files. ...filtered by locales.
  const ownMdnUrls = files.map(getMDNURL).filter((uri) => {
    if (uri) {
      if (!locales.length) {
        return true;
      } else {
        const locale = uri.split("/")[1];
        return locales.includes(locale);
      }
    }
    return false;
  });
  let fails = 0;
  // Make a map of all possible URIs in lowercase.
  // This is useful to see if case was the reason it doesn't exist.
  const allPossibleLowercase = {};
  Object.entries(allPossible).forEach(([uri, locale]) => {
    allPossibleLowercase[uri.toLowerCase()] = locale;
  });
  ownMdnUrls.forEach((uri) => {
    const hasURI = !!allPossible[uri];
    let icon = "✅";
    let note = "";
    if (!hasURI) {
      fails++;
      icon = "🚫";
      if (allPossibleLowercase[uri.toLowerCase()]) {
        note = "wrong case!";
      }
    }
    if (note) {
      note = ` (${note})`;
    }
    const wspace = " ".repeat(MAX_WIDTH - 1 - uri.length);
    console.log(`${uri}${wspace}${icon}${note}`);
  });
  const successes = Object.keys(ownMdnUrls).length - fails;
  return { fails, successes };
}

async function main(locales) {
  let sitemapUrls;
  try {
    sitemapUrls = await getLocs("/sitemap.xml");
  } catch (ex) {
    console.error(ex);
    process.exitCode = 1;
    return;
  }

  const allUrls = sitemapUrls.filter((url_) => {
    return (
      url_.includes("/sitemap.xml") &&
      (!locales.length ||
        locales.includes(url.parse(url_).pathname.split("/")[2]))
    );
  });
  try {
    const values = await Promise.all(allUrls.map(getLocs));
    const allPossible = {};
    values.forEach((urls) => {
      urls.forEach((url_) => {
        const pathname = url.parse(url_).pathname;
        const locale = pathname.split("/")[1];
        allPossible[url.parse(url_).pathname] = locale;
      });
    });
    const { fails, successes } = checkAll(allPossible, locales);
    console.log(
      `\nIn conclusion: ${successes.toLocaleString()} successful. ` +
        `${fails.toLocaleString()} fails.`
    );
    const L = Object.keys(allPossible).length;
    const p = (100 * (fails + successes)) / L;
    console.log(
      `\nFYI, we have ${(
        successes + fails
      ).toLocaleString()} docs and there are ${L.toLocaleString()} possible (${p.toFixed(
        1
      )}%).\n`
    );
    if (fails) {
      process.exitCode = fails;
    }
  } catch (ex) {
    console.error(ex);
    process.exitCode = 1;
  }
}

main(process.argv.slice(2));
