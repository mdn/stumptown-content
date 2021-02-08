# Examples formatting rules

This document describes how examples can be authored and will be processed. It's in three sections:

* **Authoring format** describes the formats used by writers to specify examples

* **JSON format** describes the JSON that is built from the content created by the writers

* **Rendering** describes how examples will be rendered as part of an MDN page.

There are three sorts of examples supported:

* **descriptive text only**: these aren't really examples, but enable authors to describe or link to examples if for any reason they don't want to include the example source itself. These are authored as a single Markdown file "description.md"

* **static code samples**: these consist of blocks of source code, optionally with descriptive text. The source code is intended to be illustrative rather than immediately executable (for example, the example might require so much setup or other dependencies that it's not practical to make a functional example). These are authored as a single Markdown file "description.md" containing embedded code blocks.

* **live samples**: these consist of blocks of source code, optionally with descriptive text, and a specification for the size of an iframe in which the result can be presented. The code must be functional: so a consumer can package it into a document and have it run in an iframe. These are authored as a single Markdown file "description.md" containing a description, and one or more separate source files containing the code itself.

Note that this doesn't include interactive examples, which are handled separately.

## Authoring format

To include examples for an item (e.g. the `<video>` element), set the `examples` key in the item's meta.yaml file. This key is specified as a list of paths. These might be relative to meta.yaml or absolute, in which case it must begin from the "/content" directory.

For example:

```yaml
examples:
    - examples/simple-example
    - examples/multiple-sources-example
```

```yaml
examples:
    - /content/html/elements/shared-examples/some-example
```

### Example syntax

Inside each directory listed under the `examples` property are up to five files, all optional:

* description.md
* example.css
* example.html
* example.js
* hidden.css

If any of the example.* files are present, then this example is treated as a live sample.

#### description.md

This is a Markdown file containing some front matter. The front matter may contain up to three properties:

* `title`: Optional. A human-readable title for this example. If present this will be represented in the JSON and used as a section heading by the MDN renderer. If an item contains more than one example with a title, then all titles must be unique. If any examples for an item have titles, then all of them must (so it's OK for there to be multiple examples with no titles, but not for some to have titles and others not).

* `height`: Mandatory if this is a live sample. This represents the height of the result iframe in pixels.

The rest of "description.md" consists of a description of this example.

Example "description.md":

```
---
title: Marking up an abbreviation semantically
height: 192
---
To mark up an abbreviation without providing an expansion or
description, use `<abbr>` without any attributes, as seen in this example.
```

#### example.css, example.html, example.js

These files contain the example's CSS, HTML, and JS. Only one file of each type may be included.

#### hidden.css

This file contains extra CSS rules that should be included in a live sample. However, the code itself should not be shown in the page.

## JSON format

This section describes how the content as authored will be represented in JSON format. This is the format that would be made available to consumers, including the thing that renders MDN pages.

The item will get a property `examples`. This is a list of examples in the order given in the meta.yaml file.

Each item in the list is an object with the following properties, both optional:

* `description`: if present this is an object which may contain up to four properties, all optional:
  * `title`: the title from "description.md" front matter
  * `width`: the width from "description.md" front matter
  * `height`: the width from "description.md" front matter
  * `content`: the Markdown from "description.md", converted to HTML
* `sources`: if present this is an object with the following properties, all optional:
  * `css`: the content of "example.css"
  * `html`: the content of "example.html"
  * `js`: the content of "example.js"
  * `hidden`: the content of "hidden.css"

For example:

```json
"examples": [
  {
    "description": {
      "title": "Simple video example",
      "width": 640,
      "height": 370,
      "content": "<p>This example plays a video...</p>\n"
    },
    "sources": {
      "html": "<video src=...>...</video>\n"
    }
  },
  {
    "description": {
      "title": "Multiple video example",
      "width": 640,
      "height": 370,
      "content": "<p>This example...</p>\n"
    },
    "sources": {
      "html": "<video...>...</video>\n"
    }
  }
]
```

## Rendering

Examples are displayed underneath an H2 heading with the content "Examples" (en-US).

The renderer renders each example in the order they are listed in meta.yaml.

If there is a `title` specified, then each example also gets an H3 whose content is the content of `title`.

After that the renderer puts the contents of description.md, converted to HTML.

### Special treatment for live samples

After the description, if there are any example.* files, the renderer puts the example sources if any, in a determined order (HTML, CSS, JavaScript). Each source gets a heading: "HTML", "CSS", "JavaScript". If a title was given these are H4, otherwise they are H3.

After that the renderer puts a heading "Result" (en-US), that again is H4 if there was a title and H3 otherwise. After that the renderer puts an iframe with the specified `height`, whose document is initialized with all the sources given.
