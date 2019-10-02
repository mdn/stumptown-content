/*
A linter that can check that all of our URLs match URLs in MDN's sitemaps.

Usage:

npm run mdn-sitemap-compare [locale [locale2]]

*/

const url = require("url");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const baseURL = "https://developer.mozilla.org";

const ROOT = path.join(__dirname, "..", "..");

async function fetchSitemap(url) {
    if (url.startsWith("/")) url = `${baseURL}${url}`;
    let r = await fetch(url);
    let payload = await r.text();
    return payload;
}

async function getLocs(url) {
    const payload = await fetchSitemap(url);
    return [...payload.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}

async function getMDNURL(filepath) {
    const content = await readFile(filepath, "utf8");
    const match = content.match(/mdn_url:\s*(.*)/);
    if (match) {
        return match[1];
    }
    return null;
}

async function checkAll(allPossible) {
    function findFiles(directory) {
        const found = fs
            .readdirSync(directory, { withFileTypes: true })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith(".md"))
            .map(dirent => path.join(directory, dirent.name));

        fs.readdirSync(directory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(directory, dirent.name))
            .map(findFiles)
            .forEach(files => found.push(...files));

        return found;
    }
    const files = findFiles(path.join(ROOT, "content"));
    return Promise.all(files.map(getMDNURL)).then(values => {
        const ourURIs = values.filter(v => v);
        let fails = 0;
        let has = 0;
        const maxLength = 100;
        ourURIs.forEach(uri => {
            const wspace = " ".repeat(maxLength - 1 - uri.length);
            let icon = "✅";
            if (!allPossible[uri]) {
                fails++;
                icon = "🚫";
            } else {
                has++;
            }
            console.log(`${uri}${wspace}${icon}`);
        });
        return { fails, has };
    });
}

async function main(args) {
    const sitemapUrls = await getLocs("/sitemap.xml");
    const urls = sitemapUrls.filter(url_ => {
        return (
            url_.includes("/sitemap.xml") &&
            (!args.length ||
                args.includes(url.parse(url_).pathname.split("/")[2]))
        );
    });

    Promise.all(urls.map(getLocs))
        .then(async values => {
            const allPossible = {};
            values.forEach(urls => {
                urls.forEach(url_ => {
                    const pathname = url.parse(url_).pathname;
                    const locale = pathname.split("/")[1];
                    allPossible[pathname] = locale;
                });
            });
            let checked;
            try {
                checked = await checkAll(allPossible);
            } catch (ex) {
                console.error(ex);
                process.exitCode = 2;
                return;
            }
            const { fails, has } = checked;
            console.log(
                `\nIn conclusion: ${has.toLocaleString()} successful. ` +
                    `${fails} fails.`
            );
            if (fails) {
                console.log("More than 0 fails.");
                process.exitCode = 2;
            }
            const L = Object.keys(allPossible).length;
            const p = (100 * (fails + has)) / L;
            console.log(
                `\nFYI, we have ${has +
                    fails} docs and there are ${L.toLocaleString()} possible (${p.toFixed(
                    1
                )}%).\n`
            );
        })
        .catch(ex => {
            console.error(ex);
            process.exitCode = 1;
        });
}

main(process.argv.slice(2));
