# stumptown-content

[![Build Status](https://travis-ci.org/mdn/stumptown-content.svg?branch=master)](https://travis-ci.org/mdn/stumptown-content)

## Overview

This project aims to change the way we create and represent MDN's documentation. The idea is to maintain our documentation in GitHub, and to explicitly represent (and lint for) structure for the reference documentation, rather than just treating pages as unstructured blobs of HTML.

In this model, people write documentation in a mixture of Markdown (for prose) and YAML (for data). There are rules about what a writer can and must include in the documentation for a given item, and the repository will enforce these rules in CI tests. For example, we might require that the documentation for every CSS property must include browser compatibility data. The ["writers' guide to stumptown" document](https://github.com/mdn/stumptown-content/blob/master/project-docs/stumptown-writers-guide.md) provides an informal overview of how documentation is written and maintained.

This repository also includes scripts that convert this documentation as-authored into a single JSON object for each item.

The most important consumer of this JSON would be the MDN website itself. The [stumptown-renderer](https://github.com/mdn/stumptown-renderer) repository is a prototype implementation of a new version of MDN powered by stumptown-content.

But it's our intention to make the JSON available to other consumers too. Providing the content as structured JSON means that a consumer can reliably access particular pieces of the content. For example:

- names and short descriptions for all the CSS properties
- sets of executable examples
- the specifications that define a particular item
- the list of methods defined for a JavaScript object

**Please note that at the moment we're still at an early and quite experimental stage.**

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

## Public domain dedication

The project code is dedicated to the public domain ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)). MDN prose content, found in the `content/` directory, is by Mozilla Contributors and is licensed under [CC-BY-SA 2.5](http://creativecommons.org/licenses/by-sa/2.5/). See [`content/LICENSE.md`](https://github.com/mdn/stumptown-content/blob/master/content/LICENSE.md) for details.
