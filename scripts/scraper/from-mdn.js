/*
Turns MDN Document API JSON into stumptown docs.

Usage:

npm run from-mdn <sourcedirectory> <destination> [searchfilter]

<sourcedirectory>: Directory where the MDN docs have been downloaded to.
<destination>: Where we put the transform JSON into markdown files.
<destination>: Where to put the processed document. This is relative to the current
working directory.
<searchfilter>: Used when recursively scanning the sourcedirectory.

*/
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const minimist = require("minimist");
const buildOptions = require("minimist-options");
const cheerio = require("cheerio");
const matchAll = require("string.prototype.matchall");

const { packageBCD } = require("../build-json/resolve-bcd");

const currentErrorLogFile = `processing-errors-${new Date().toISOString()}.log`;

// Enums for return values
const processing = {
  ALREADY: "already",
  PROCESSED: "processed",
  EMPTY: "empty",
  NO_HTML: "no_html"
};

function processDoc({ filepath, uri, destination, digestPrefix, cache }) {
  const filecontent = fs.readFileSync(filepath, "utf8");

  const hashSum = crypto.createHash("md5");
  const sourceDigest = `${digestPrefix}.${hashSum
    .update(filecontent)
    .digest("hex")
    .slice(0, 7)}`;

  if (sourceDigest === cache[filepath]) {
    // Already processed!
    return [processing.ALREADY, null];
  }
  let json;
  if (filecontent) {
    json = JSON.parse(filecontent);
  } else {
    console.warn(`${filepath} is completely empty`);
    return [processing.EMPTY, null];
  }
  const { documentData } = json;

  const doc = {};
  if (!documentData) {
    if (!json.redirectURL) {
      throw new Error(`No idea how to deal with that! ${filecontent}`);
    }
    doc.redirect_url = json.redirectURL;
    doc.mdn_url = json.absoluteURL || apiURLtoRealURL(uri);
  } else if (!documentData.bodyHTML) {
    return [processing.NO_HTML, null];
  } else {
    doc.mdn_url = documentData.absoluteURL;

    const $ = cheerio.load(`<div id="_body">${documentData.bodyHTML}</div>`);

    // Remove those '<span class="alllinks"><a href="/en-US/docs/tag/Web">View All...</a></span>' links
    // Remove any completely empty <p>, <dl>, or <div> tags.
    $("p:empty,dl:empty,div:empty,span.alllinks").remove();

    if (documentData.raw === undefined) {
      throw new Error(`documentData in ${filepath} does not have 'raw'`);
    }
    let macroCalls;
    try {
      macroCalls = extractMacroCalls(documentData.raw);
    } catch (err) {
      logError(err, `extractMacroCalls failed on ${filepath}:`);
      throw err;
    }

    const sections = [];
    let section = cheerio
      .load("<div></div>")("div")
      .eq(0);

    let iterable;
    try {
      iterable = [...$("#_body")[0].childNodes];
    } catch (err) {
      logError(err, `Unable to find childNodes`);
      throw err;
    }

    let c = 0;
    iterable.forEach(child => {
      if (child.tagName === "h2") {
        if (c) {
          sections.push(addSection(section.clone(), macroCalls));
          section.empty();
        }
        c = 0;
      }
      // console.log("CHILD:", child.tagName);
      c++;
      section.append(child);
    });
    if (c) {
      sections.push(addSection(section.clone(), macroCalls));
    }
    delete section;

    doc.title = documentData.title;
    doc.body = sections;
    doc.sidebarHTML = documentData.quickLinksHTML.trim();
    doc.last_modified = documentData.lastModified;
  }

  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(destination, JSON.stringify(doc, null, 2));
  // fs.writeFileSync(digestDestination, sourceDigest);
  cache[filepath] = sourceDigest;
  return [processing.PROCESSED, destination];
}

/** If we all we have is the slug as it's known in the v1 API, we don't
 * know what the absolute URL ought to be we have to deduce it.
 * For example, a slug like 'Foo/Bar/baz' in locale 'en-US' might be called
 * '/api/v1/doc/en-US/Foo/Bar/baz' here.
 * So figure out a way to return '/en-US/docs/Foo/Bar/baz'
 */
function apiURLtoRealURL(uri) {
  if (!uri.startsWith("/api/v1/doc/")) {
    throw new Error(`No idea how to process this! ${uri}`);
  }
  uri = uri.replace("/api/v1/doc/", "/");
  const split = uri.split("/");
  split.splice(2, 0, "docs");
  return split.join("/");
}

function logError(err, msg) {
  console.warn(msg, err);
  fs.appendFileSync(currentErrorLogFile, `${msg}: ${err}`);
}

function addSection($, macroCalls) {
  // If the section is BCD scrap all the HTML
  if (macroCalls.Compat && $.find("div.bc-data").length) {
    // XXX WRONG!! THERE MIGHT BE MORE THAN ONE!
    let compat = macroCalls.Compat[0];
    if (Array.isArray(compat)) {
      // In KumaScript there's a 2nd argument that is the depth.
      // E.g. `{{compat("html.elements.link", 2)}}`
      // XXX I *think* that's just a KumaScript thing and not
      // related to the 'mdn-browser-compat-data' package.
      compat = compat[0];
    }
    if (typeof compat !== "string") {
      throw new Error(`Unrecognized Compat first argument: ${compat}`);
    }
    const data = packageBCD(compat);
    return {
      type: "browser_compatibility",
      value: { data, query: compat }
    };
  }

  // Maybe this should check that the h2 is first??
  const h2s = $.find("h2");
  if (h2s.length === 1) {
    const id = h2s.attr("id");
    const title = h2s.text();
    // XXX Maybe this is a bad idea.
    // See https://wiki.developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Page_types/API_reference_page_template
    // where the <h2> needs to be INSIDE the `<div class="note">`.
    h2s.remove();
    return {
      type: "prose",
      value: {
        id,
        title,
        content: $.html().trim()
      }
    };
    // } else if (h2s.length > 1) {
    //     throw new Error("Too many H2 tags");
  }
  // all else, leave as is
  return {
    type: "prose",
    value: {
      content: $.html().trim()
    }
  };
}

// https://www.peterbe.com/plog/nodejs-fs-walk-or-glob-or-fast-glob
function walk(directory, search = "", filepaths = []) {
  const files = fs.readdirSync(directory);
  for (let filename of files) {
    const filepath = path.join(directory, filename);
    const isDirectory = fs.statSync(filepath).isDirectory();
    // Leafs first!
    // The extra `!isDirectory` trick is to avoid thinking a folder
    // with the matching end is a file.
    if (path.extname(filename) === ".json" && !isDirectory) {
      if (!search || filepath.includes(search)) {
        filepaths.push(filepath);
      }
    } else if (isDirectory) {
      walk(filepath, search, filepaths);
    }
  }
  return filepaths;
}

const CACHE_DIGESTS_FILE = ".from-mdn-cache.json";

function start(
  source,
  outDir,
  searchfilter = "",
  showmemory = false,
  forgiving = false,
  quiet = false
) {
  // Every input file's content is a parameter to precheck if we've
  // already consumed it before.
  // But what if *this* very file here has changed but the inputs
  // haven't? That's what this is for...
  const digestPrefix = crypto
    .createHash("md5")
    .update(fs.readFileSync(__filename, "utf8"))
    .digest("hex")
    .slice(0, 7);

  let cache;
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_DIGESTS_FILE, "utf8"));
    console.log(
      `Loaded ${Object.keys(
        cache
      ).length.toLocaleString()} cached file digests.`
    );
  } catch (err) {
    console.warn("Starting from scratch with the cache!");
    cache = {};
  }

  function dumpCache() {
    fs.writeFileSync(CACHE_DIGESTS_FILE, JSON.stringify(cache, null, 2));
  }

  const allFilesStart = Date.now();
  const allFiles = walk(source, searchfilter);
  const allFilesTook = (Date.now() - allFilesStart) / 1000;
  console.log(
    `Walked and found ${allFiles.length.toLocaleString()} (Took ${allFilesTook.toFixed(
      1
    )}s)`
  );

  const files = allFiles.map(filepath => {
    let uri = "/";
    if (path.basename(filepath) === "index.json") {
      // E.g. /en-US/Web/HTML/Element/index.json
      uri = "/" + path.relative(source, path.dirname(filepath));
    } else {
      // E.g. /en-US/Web/HTML/Element/video.json
      uri = "/" + path.relative(source, filepath).replace(/\.json$/, "");
    }
    const destination = path.join(outDir, uri) + ".json";
    return { filepath, uri, destination };
  });

  progressBar = new ProgressBar({ includeMemory: showmemory });
  progressBar.init(files.length);

  const filesLength = files.length;

  let countForgivenesses = 0;
  const counts = {};
  Object.values(processing).forEach(key => {
    counts[key] = 0;
  });

  files.forEach((o, index) => {
    const t0 = Date.now();
    let wrote;
    let result;
    try {
      [result, wrote] = processDoc({ ...o, digestPrefix, cache });
    } catch (err) {
      console.log(`File that failed: ${o.filepath}`);
      if (forgiving) {
        console.warn(err);
        countForgivenesses++;
        if (countForgivenesses > 100) {
          // One or two errors might be fine but if it's just too
          // many there's probably something fundamentally broken.
          // Better give up and study the errors and warnings.
          throw new Error("Too many errors to forgive. I give up!");
        }
        return;
      } else {
        dumpCache();
        throw err;
      }
    }
    if (quiet) {
      progressBar.update(index + 1);
    }

    const t1 = Date.now();
    const p = (100 * (index + 1)) / filesLength;
    if (result === processing.PROCESSED) {
      !quiet &&
        console.log(`(${p.toFixed(1)}%) Wrote ${wrote} in ${t1 - t0}ms`);
    } else if (result === processing.ALREADY) {
      !quiet &&
        console.log(`(${p.toFixed(1)}%) Skipped ${o.filepath} in ${t1 - t0}ms`);
    } else if (result === processing.EMPTY) {
      !quiet &&
        console.log(`(${p.toFixed(1)}%) Empty ${o.filepath} in ${t1 - t0}ms`);
    } else if (result === processing.NO_HTML) {
      !quiet &&
        console.log(`(${p.toFixed(1)}%) No HTML ${o.filepath} in ${t1 - t0}ms`);
    } else {
      throw new Error(`Unrecognized enum ${result}`);
    }
    counts[result]++;
  });
  if (quiet) {
    progressBar.stop();
  }
  dumpCache();
  return counts;
}

class ProgressBar {
  constructor({ prefix = "Progress: ", includeMemory = false }) {
    this.total;
    this.current;
    this.prefix = prefix;
    this.includeMemory = includeMemory;
    // console.log(prefix.length + "100.0%".length);
    this.barLength =
      process.stdout.columns - prefix.length - "100.0%".length - 5;
    if (includeMemory) {
      this.barLength -= 10;
    }

    this.updateFrequency = 0.01; // every 1%
  }

  init(total) {
    this.total = total;
    this.current = 0;
    this.every = Math.round(total * this.updateFrequency);
    this.update(this.current);
  }

  update(current) {
    this.current = current;
    // if (this.current % this.every === 0) {
    this.draw(this.current / this.total);
    // }
  }

  draw(currentProgress) {
    const filledBarLength = Math.round(currentProgress * this.barLength);
    const emptyBarLength = this.barLength - filledBarLength;

    const filledBar = this.getBar(filledBarLength, "█");
    const emptyBar = this.getBar(emptyBarLength, "░");

    // const percentageProgress = (currentProgress * 100).toFixed(1);
    const percentageProgress = this.rJust(
      `${(currentProgress * 100).toFixed(1)}%`,
      "100.0%".length
    );

    let out = `${this.prefix}[${filledBar}${emptyBar}] | ${percentageProgress}`;
    if (this.includeMemory) {
      const bytes = process.memoryUsage().heapUsed;
      out += ` | ${this.rJust(this.humanFileSize(bytes))}`;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(out);
  }

  stop() {
    process.stdout.write("\n");
  }

  humanFileSize(size) {
    if (size < 1024) return size + " B";
    let i = Math.floor(Math.log(size) / Math.log(1024));
    let num = size / Math.pow(1024, i);
    let round = Math.round(num);
    num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
    return `${num} ${"KMGTPEZY"[i - 1]}B`;
  }
  rJust(str, length) {
    while (str.length < length) {
      str = ` ${str}`;
    }
    return str;
  }

  getBar(length, char, color = a => a) {
    return color(
      Array(length)
        .fill(char)
        .join("")
    );
  }
}

function extractMacroCalls(text) {
  const RECOGNIZED_MACRO_NAMES = ["Compat"];

  function evaluateMacroArgs(argsString) {
    if (argsString.startsWith("{") && argsString.endsWith("}")) {
      return JSON.parse(argsString);
    }
    if (argsString.includes(",")) {
      return eval(`[${argsString}]`);
    }
    // XXX A proper parser instead??
    return eval(argsString);
  }

  const calls = {};
  /**
   * Note that the text can have escaped macros. For example:
   *
   *    This is how you write a macros: \{{Compat("foo.bar")}}
   *
   */
  for (const match of matchAll(text, /[^\\]{{\s*(\w+)\s*\((.*?)\)\s*}}/g)) {
    const macroName = match[1];
    if (RECOGNIZED_MACRO_NAMES.includes(macroName)) {
      if (!calls[macroName]) {
        calls[macroName] = [];
      }
      const macroArgs = evaluateMacroArgs(match[2].trim());
      calls[macroName].push(macroArgs);
    }
  }
  return calls;
}

function ppMilliseconds(ms) {
  // If the number of millseconds is really large, use seconds. Or minutes
  // even.
  if (ms > 1000 * 60 * 5) {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    return `${minutes.toFixed(1)} minutes`;
  } else if (ms > 1000) {
    const seconds = ms / 1000;
    return `${seconds.toFixed(1)} seconds`;
  } else {
    return `${ms.toFixed(1)} milliseconds`;
  }
}

function main(argv) {
  const options = buildOptions({
    arguments: "string",
    help: {
      alias: ["h"],
      default: false,
      type: "boolean"
    },
    searchfilter: {
      alias: "s",
      default: "",
      type: "string"
    },
    showmemory: {
      alias: ["m"],
      default: false,
      type: "boolean"
    },
    forgiving: {
      // alias: ["m"],
      default: false,
      type: "boolean"
    },
    quiet: {
      alias: ["q"],
      default: false,
      type: "boolean"
    }
  });
  const args = minimist(argv, options);
  function usage() {
    console.log(`
Usage:
  node ${__filename} [options] SOURCE DESTINATION

Options:
  -h, --help           prints this
  -s, --searchfilter   search filter when finding from the source directory
  -m, --show-memory    print amount of memory used
  -q, --quiet          print minimally
  --forgiving          log and swallow unexpected errors instead of throwing
`);
  }

  if (args["help"]) {
    usage();
    process.exit(0);
  }
  if (args["_"].length !== 2) {
    console.error("Error: Must be 2 arguments.");
    usage();
    process.exit(1);
  }
  const [source, destination] = args["_"];
  const t0 = new Date();
  const counts = start(
    source,
    destination,
    args["searchfilter"],
    args.showmemory,
    args.forgiving,
    args.quiet
  );
  const t1 = new Date();
  const written = counts[processing.PROCESSED];
  if (written) {
    const timeRate = (t1 - t0) / written;
    const docsRate = (1000 * written) / (t1 - t0);
    console.log(
      `Wrote ${written.toLocaleString()} files. ` +
        `Roughly ${timeRate.toFixed(1)} ms/doc ` +
        `(${docsRate.toFixed(1)} docs/s)`
    );
  }
  const skipped = counts[processing.ALREADY];
  if (skipped) {
    console.log(
      `Skipped ${skipped.toLocaleString()} files because unchanged digest inputs.`
    );
  }
  const emptyOrNoHtml = counts[processing.EMPTY] + counts[processing.NO_HTML];
  if (emptyOrNoHtml) {
    console.log(
      `Skipped ${emptyOrNoHtml.toLocaleString()} empty or no HTML files.`
    );
  }
  console.log(`Total time: ${ppMilliseconds(t1 - t0)}.`);
  if (
    fs.existsSync(currentErrorLogFile) &&
    fs.statSync(currentErrorLogFile).size
  ) {
    console.log(
      `Errors and warnings written to: ${currentErrorLogFile} (${(
        fs.statSync(currentErrorLogFile).size / 1024
      ).toFixed(1)}KB)`
    );
  }
}
main(process.argv.slice(2));
