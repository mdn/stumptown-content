# stumptown-content

[![Build Status](https://travis-ci.org/mdn/stumptown-content.svg?branch=master)](https://travis-ci.org/mdn/stumptown-content)

## Installation

First [fork](https://help.github.com/en/articles/fork-a-repo) then [clone the repo on your machine](https://help.github.com/en/articles/cloning-a-repository-from-github).

```
cd stumptown-content
npm install
```

## Development

### Linting content

Before building, run checks on the content first. To lint content, run:

```sh
npm run lint-md
```

Alternatively, to partially lint content, add arguments for one or more paths to the content to be linted. For example:

```sh
npm run lint-md content/html/reference/elements/abbr
```

### Building content

Stumptown builds the content into JSON files (located under `/packaged`). In order to build all of the files, use:

```sh
npm run build-json <section>
```

For instance, if you want to build the HTML section documents, type:

```sh
npm run build-json html
```

### Validating content

```sh
npm test
```

## Refresh your fork

Before sending a new pull request, please [refresh your fork and clone](https://help.github.com/en/articles/syncing-a-fork).
