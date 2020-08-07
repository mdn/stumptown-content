# Lint wiki pages with `scraper-ng`

`scraper-ng` can check—also known as "lint"—MDN wiki pages for some content errors.

## What is linting?

`scraper-ng` checks pages on `developer.mozilla.org` against predefined page structures called _recipes_, plus other possible content errors. For each page you run the script on, `scraper-ng`:

1. Fetches the page and its metadata.

2. Identifies the recipe for the page based on its tags.

3. Checks the page against several content rules. The most important are:

   - the page contains all of the required [ingredients](https://github.com/mdn/stumptown-content/blob/master/project-docs/linter-spec.md) described by its [recipe](https://github.com/mdn/stumptown-content/blob/master/recipes/)
   - the ingredients appear in the order described by its [recipe](https://github.com/mdn/stumptown-content/blob/master/recipes/) (if all of the expected ingredients exist)

After it's finished, `scraper-ng` prints a report of any errors it finds.

## Before you begin

To use the linter, you must have [Node.js](https://nodejs.org/en/) (including `npm`) and [Git](https://git-scm.com/) installed.

The following steps assume that you know how to:

- use your terminal to change directories and run commands
- to use your editor to open and modify JavaScript files

## Install

To install `scraper-ng`:

1. Clone the `mnd/stumptown-content` repository.
   Run `git clone https://github.com/mdn/stumptown-content.git`.

2. Install the package dependencies.
   Change to root of the cloned repository and run `npm install`.

3. Confirm that the dependencies are installed.
   Run `node scripts/scraper-ng --help`.
   Usage instructions appear.

## Lint pages

To lint pages, run `node scripts/scraper-ng URL`, where _URL_ is the the slug or complete URL for an MDN wiki page.

By default, `scraper-ng` checks entire trees of pages: a page and all of its descendant pages. If you run `node scripts/scraper-ng /en-US/docs/Web/JavaScript/Reference/Global_Objects/Date`, then the scraper checks:

- `/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date`
- `/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date`
- `/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC`

and so on, until all of the pages in the tree are linted.

To lint one page at a time (skipping descendants), run `scraper-ng` with the `--no-subpages` option.

If you're linting many pages, you may find it helpful to use the `--summary` option, which prints a summary of error types by the number of occurrences of each type.

There are more ways to customize `scraper-ng`'s output. See [Usage notes](#usage-notes) to learn more.

## Fix errors

After running `scraper-ng` and finding one or more errors, you'll probably want to fix some. Edit the page and re-run the linter to see if the error has been resolved.

The script tries to provide some meaningful feedback to help you fix page errors. For example, `prose` ingredients expect an H2 with specific text. If such an H2 cannot be found, you'll get an error like this:

```
https://wiki.developer.mozilla.org/en-US/docs/Web/CSS/display
     1:1-1:1  error  Expected h2#Examples for data.examples  css-property/data.examples/expected-heading  html-require-ingredient
```

This is an error with the ID `css-property/data.examples/expected-heading`. It means that the recipe (`css-property`) contains an ingredient (`data.examples`) but the H2 for `Examples` wasn't found (`expected-heading`). To learn more about what an ingredient ought to contain, see the ingredient's entry in [the linter specification](https://github.com/mdn/stumptown-content/blob/master/project-docs/linter-spec.md).

Some errors can be hidden by other errors; fixing one error may reveal additional errors. For example, if a _Browser compatibility_ section cannot be found, then the script cannot check whether the section contains the expected macro.

Similarly, if a page's recipe cannot be deteremined, an error is recorded and no futher recipe-related checks take place. See [`identify-recipes.js`](https://github.com/mdn/stumptown-content/blob/master/scripts/scraper-ng/plugins/identify-recipes.js) for the map of tags to recipes.

## Usage notes

`scraper-ng` has a number of options to help you lint pages. This section convers some more complex usage.

### Slugs and URLs

`scraper-ng` accepts both slugs (such as `/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC`) and absolute URLs (such as `https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC`).

For example, to lint the page for `Date.UTC()`, each of these commands works:

```shell
$ node scripts/scraper-ng /en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
$ node scripts/scraper-ng https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
$ node scripts/scraper-ng https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
```

Note that the script respects your choice of domain for absolute URLs. If changes are slow to propagate to `developer.mozilla.org`, then you may find that linting `wiki.developer.mozilla.org` is more responsive.

## Customizing output

You can get more detail about some errors, especially ingredient order errors, with the `--verbose` option.

You can hide progress and success messages (such as `Fetching /en-us/…`) with the `--quiet` option. Confusingly, `--verbose` and `--quiet` can be used together.

If you want to turn off some linting rules, then comment out relevant lines in [`preset.js`](https://github.com/mdn/stumptown-content/blob/master/scripts/scraper-ng/scripts/scraper-ng/preset.js). For example, to turn off macro warnings, comment out this line:

```js
[require("./rules/html-no-macros"), allowedMacros],
```

If you want to do more sophisticated analysis linting results, you may find it helpful to use the `--json` option output format. See [mdn/stumptown-content#341](https://github.com/mdn/stumptown-content/pull/341) for examples.
