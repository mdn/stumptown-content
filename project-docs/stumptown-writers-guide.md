# Writers' guide to stumptown

**Table of contents:**

- [stumptown-content and stumptown-renderer](#stumptown-content-and-stumptown-renderer)
- [The content directory](#the-content-directory)
- [Recipe files](#recipe-files)
- [Meta ingredient details](#meta-ingredient-details)
- [Landing pages](#landing-pages)
- [Guide pages](#guide-pages)
- [Related content](#related-content)
- [Chapter lists](#chapter-lists)
- [Specifications](#specifications-1)
- [Contributors](#contributors)

## stumptown-content and stumptown-renderer

This document describes stumptown from the point of view of a technical writer.

We can think of the MDN documentation landscape like this:

- there are _technical writers_, who are humans skilled in expressing technical concepts. They create content (open Web documentation).

- there are _consumers_ of this content, which are software components that take this content and present it to human users. A website like developer.mozilla.org is a consumer of this content, but so potentially are devtools or text editors.

Accordingly, stumptown is implemented in two Git repositories, ["stumptown-content"](https://github.com/mdn/stumptown-content) and ["stumptown-renderer"](https://github.com/mdn/stumptown-renderer).

The "stumptown-content" repository contains all the documentation that's created by writers. It also contains tooling that converts this content as-authored into JSON structures that are designed to be usable by code.

The "stumptown-renderer" repository implements the most important consumer of stumptown-content: the website developer.mozilla.org. It includes "stumptown-content" as a Git submodule, and relies on the JSON structures built from the authored content.

Almost all of this document focuses on the stumptown-content repository, since this is where authors spend their time. Authors do not need to understand what's going on inside stumptown-renderer, and they do not need to understand the JSON structures that stumptown-content builds. However, they will need to use stumptown-renderer so they can see what their content looks like when rendered as MDN pages.

## The /content directory

All content created by writers lives in the /content directory. This directory contains a collection of Markdown and YAML files. Markdown is used for prose content, and YAML is used to tell stumptown where it can find other content (such as BCD) and how it should combine prose content with other content. The Markdown files often also contain YAML in the form of front matter.

Not all Markdown files under /content correspond directly to MDN pages, but most of them do. Those that do all contain YAML front matter which contains a property named `recipe`. This property tells stumptown what kind of page this content wants to be.

Let's look at one of these Markdown files. It's located at /content/html/reference/elements/b/docs.md, and is the content for the [HTML `<b>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b) page:

```
---
title: '<b>: The Bring Attention To element'
short_title: <b>
mdn_url: /en-US/docs/Web/HTML/Element/b
specifications: https://html.spec.whatwg.org/multipage/semantics.html#the-b-element
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/b.html
    height: html-short
browser_compatibility: html.elements.b
examples:
    - examples/simple-b-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Bring Attention To element** (**`<b>`**) is used to draw the
reader's attention to the element's contents, which are not otherwise
granted special importance.

## Description

This was formerly known as the
**Boldface element**, and most browsers still draw the text in boldface.
[...more content here...]

## See also

- Others elements conveying [text-level semantics](/en-US/docs/HTML/Text_level_semantics_conveying_elements):
  [`<a>`](/en-US/docs/Web/HTML/Element/a),
[...more content here...]

```

The file is in 2 main parts:

- a YAML front matter section
- a Markdown prose section

The prose section has a number of H2 headings: these divide the document into top-level sections.

The YAML front matter has a `recipe` property, and in this case it has a value of `html-element`.

## Recipe files

All files that can be built as MDN pages contain a `recipe` property, and its value determines the type of page this piece of content wants to be. With two exceptions (landing pages and guide pages) this value names a short YAML file that tells stumptown what this type of page needs to contain, and in what order. All recipe files are kept in a top-level directory called "./recipes".

Recipes are central to stumptown.

- they provide a kind of high-level meta-documentation for writers, explaining concisely what a particular type of page must contain

- they help the linter enforce a particular structure for page types

- they describe not just what a page contains, but the order in which items should appear in the rendered page.

Let's look at ./recipes/html-element.yaml:

```
related_content: /content/related_content/html.yaml
body:
- prose.short_description
- meta.interactive_example?
- prose.description?
- prose.attributes_text?
- meta.attributes
- prose.styling?
- prose.accessibility_concerns?
- prose.*
- meta.examples
- meta.info_box
- meta.specifications
- meta.browser_compatibility
- prose.see_also
```

This describes what must be present (and in some cases what _may_ be present) in all HTML element pages, and the order in which items must appear. Each distinct type of page in MDN - CSS property pages, Web API method pages, JS function pages - will have one of these files, although some of them will be very similar.

The first item, `related_content`, points to a special YAML file that describes other pages related to this one. It's used to build a sidebar for this page (but could have other uses too). See [Related content](#related-content).

The other item, `body`, describes the structure of the page content. Each property under here names a piece of the page.

We said before that a docs file was split into two parts: YAML front matter and Markdown prose. Correspondingly, ingredients in the recipe's `body` have one of two prefixes:

- `meta.` ingredients are supplied by the YAML front matter
- `prose.` ingredients are supplied by the Markdown prose

Ingredients with a `?` suffix are optional.

### Meta ingredients

Here are just the `meta` ingredients from the recipe:

```
- meta.interactive_example?
- meta.attributes
- meta.examples
- meta.info_box
- meta.specifications
- meta.browser_compatibility
```

Looking back at our docs file for the `<b>` element, we should see that each `meta` item has a corresponding property in the front matter:

```yaml
---
title: "<b>: The Bring Attention To element"
short_title: <b>
mdn_url: /en-US/docs/Web/HTML/Element/b
specifications: https://html.spec.whatwg.org/multipage/semantics.html#the-b-element
interactive_example:
  url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/b.html
  height: html-short
browser_compatibility: html.elements.b
examples:
  - examples/simple-b-example
attributes:
  global: /content/html/global_attributes
recipe: html-element
---

```

(well, `info_box` is missing, because we haven't figured its syntax out yet.)

The syntax of each item is completely specific to this item. Some syntaxes are very simple: for example `browser_compatibility` is just the BCD query string for the item. Some, like `examples` are much more complicated.

Note that the front matter also contain three items not in the recipe:

```yaml
title: "<b>: The Bring Attention To element"
short_title: <b>
mdn_url: /en-US/docs/Web/HTML/Element/b
```

**Note: It's arguable whether these three items should actually be in the recipe, but they are applicable to every page, so it seemed redundant. Filed as https://github.com/mdn/stumptown-content/issues/203.**

See [meta ingredient details](#meta-ingredient-details) for detailed descriptions of each meta ingredient.

### Prose ingredients

Here are just the prose ingredients from the recipe:

```
- prose.short_description
- prose.description
- prose.attributes_text?
- prose.styling?
- prose.accessibility_concerns?
- prose.*
- prose.see_also
```

So there are three mandatory prose sections, three optional ones, and one weird `prose.*` thing.

Here again is the prose part of the `<b>` doc:

```
## Short description

The **HTML Bring Attention To element** (**`<b>`**) is used to draw the
reader's attention to the element's contents, which are not otherwise
granted special importance.

## Description

This was formerly known as the
**Boldface element**, and most browsers still draw the text in boldface.
[...more content here...]

## See also

- Others elements conveying [text-level semantics](/en-US/docs/HTML/Text_level_semantics_conveying_elements):
  [`<a>`](/en-US/docs/Web/HTML/Element/a),
[...more content here...]

```

Heading names are mapped to identifiers by being lowercased and having spaces converted to underscores. So we can see here that the `<b>` docs include all the three mandatory prose sections, and none of the optional sections.

As for `prose.*`, this is a mechanism for authors to include custom sections with any heading they choose. For example, the `<iframe>` page wants a heading "Scripting".

## Meta ingredient details

### title

Mandatory for all docs pages, even guide pages and landing pages. Not included in the recipe.
A string that's used as the H1 heading for the doc page itself, and may also be used in other contexts such as generated lists of links.

### short_title

Optional for all docs pages, even guide pages and landing pages. Not included in the recipe.
A string that's used as an alternative to `title` in certain contexts. For example the renderer might choose to display link text in sidebars using `short_title` rather than `title`.

### mdn_url

Mandatory for all docs pages, even guide pages and landing pages. Not included in the recipe.

A string that's used by the renderer to set the URL for the docs page to build. This must be given as a relative URL, and includes the locale: `/en-US/docs/Web/HTML/Element/a`.

### interactive_example

An object used to specify an interactive example to include in the page. The object contains two properties:

- `url`: URL for the build interactive example, e.g. `https://interactive-examples.mdn.mozilla.net/pages/tabbed/abbr.html`
- `height`: String determining which height to select for the iframe. This may be any of:
  - "js-short"
  - "js-standard"
  - "js-tall"
  - "css-standard"
  - "html-short"
  - "html-standard"
  - "html-tall"

### attributes

An object that's used to describe which HTML attributes the item supports.

The `attributes` ingredient contains two properties:

- `global`: Mandatory. This is a path to a directory containing the global attributes.
- `element-specific`: Optional. This may be either:
  - a path to a directory containing the element-specific attributes.
  - an array of file paths, each of which contains documentation for a single attribute.

For example:

```yaml
attributes:
  element_specific: ./attributes
  global: /content/html/global_attributes
```

In this example, there should be an "attributes" subdirectory of the directory containing this front matter, and it contains files describing the element-specific attributes.

```yaml
attributes:
  element_specific:
    - ../input/attributes/autocomplete.md
    - ../input/attributes/name.md
  global: /content/html/global_attributes
```

In this example, there are two element-specific attributes, found at "../input/attributes/autocomplete.md" and "../input/attributes/name.md", relative to the directory containing this front matter.

Paths may be given as an absolute path from the stumptown root directory, or a path relative to the file containing the ingredient.

**Note: I think we should remove `global`, since everyone always has it and it always has the same value. Filed as https://github.com/mdn/stumptown-content/issues/202.**

Each element-specific attribute is described in its own Markdown file, with its own syntax.

#### Element-specific HTML attribute syntax

Here's an example HTML attribute file:

```md
---
browser-compatibility: html.elements.audio.crossorigin
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin
---

# `crossorigin`

This enumerated attribute ...

## Values

### `anonymous`

Sends a cross-origin request without a credential...

### `use-credentials`

Sends a cross-origin request with a credential...

## Type

String
```

The file may contain some YAML front matter, with the following two properties, both optional:

- `browser_compatibility`: syntax is the same as the `browser_compatibility` ingredient
- `specifications`: syntax is the same as the `specifications` ingredient.

The H1 heading must be in `code format` and its content must be the name of the attribute:

```md
# `crossorigin`
```

**Note: We should not use code format here or in the "Values" bit. Filed as https://github.com/mdn/stumptown-content/issues/198.**

Prose immediately after this describes the attribute.

Some attributes, such as the `crossorigin` attribute above, can take special enumerated values. For such attributes, the description should be followed by an H2 with the text "Values":

```
## Values
```

If there is a "Values" H2, then it must be followed by one or more H3 headings, with text content in `code format`, whose text content is a possible value for the attribute.

The text following this H3 describes that value.

After the "Values" section there is a mandatory H2 "Type":

```
## Type
```

After this there is an string describing the type of this attribute. The following are valid values for this string:

"String", "Number", "Boolean", "URL", "RegExp".

### examples

An object used to specify static or live samples to include in the page.

**Note: this does not specify interactive examples, because we'd have to rewrite the interactive example system if we wanted to do that.**

It is given as an array of paths to directories. Each directory contains a single example:

```yaml
examples:
  - examples/simple-example
  - examples/audio-element-with-video-element
  - examples/multiple-source-elements
```

**Note: it looks like this is using a different path convention from attributes. We should be consistent here. Filed as https://github.com/mdn/stumptown-content/issues/204.**

Examples will be included in the rendered output in the order given here: so for example you may want to present the basic example first in the array, then more complex ones.

Each example is specified as a directory containing four files, one mandatory and three optional:

- "description.md" - the only mandatory one
- "example.html"
- "example.css"
- "example.js"

**Note: we don't yet support "hidden" sources One suggestion was just to call them "hidden.css" etc. Filed as https://github.com/mdn/stumptown-content/issues/205.**

#### description.md

A Markdown file containing some YAML front matter.

The front matter contains a mandatory `title` and an optional `height`:

```
---
title: Custom error messages
height: 192
---
```

If `height` is included, then stumptown treats this example as a live sample, and `height` is the height of the "Result" iframe in pixels (the iframe always gets full page width). The renderer will render the example like a live sample in the current MDN (that is, displaying the sources, and the output in an iframe).

If `height` is omitted, then stumptown treats this example as just a static example.

**Note: many examples currently omit "title".**

**Note: we have also considered having a less implicit way to signal whether or not an example is live (https://github.com/mdn/stumptown-content/issues/45 ).**

The rest of the "description.md" file is a prose description of the example.

#### example.\*

The example.html, example.css, and example.js files contain the example sources themselves.

### specifications

This property lists specifications for the item.

This is given as one of:

- the string "non-standard"
- a single URL
- an array of URLs

URLs must match one of the URLs listed in "specifications.yaml" (see the "Specifications" section), where "match" means they fully contain it, although they may add additional path or hash items. For example:

    https://html.spec.whatwg.org/multipage/embedded-content.html#the-audio-element

matches an entry like:

    html.spec.whatwg.org/multipage

### info_box

TBD

### browser_compatibility

A string representing a BCD query, e.g. "html.elements.abbr".

### link_lists

An object used to describe a list of lists of internal links. This is currently used only in landing pages and sidebars, but might be useful in other contexts as well.

This is specified as an array of "link list" objects. Each of these objects will have a title and a list of links. Each link has a URL, a title, and a short description. This enables the renderer to build landing pages like:

```
## Title of a list of Links

* [link text 1](link target 1): short description for the link 1
* [link text 2](link target 2): short description for the link 2
...

## Title of another list of Links

* [link text 3](link target 3): short description for the link 3
* [link text 4](link target 4): short description for the link 4
...
```

**Note: we don't currently support short descriptions for guide pages. But we should.**

Each "link list" object may be specified in one of three ways:

- as a directory. An object that consists of two properties: `title`, which is a string that will be used as the list title, and `directory`, which is a path to a directory. Stumptown will look for all pages immediately inside the given directory, and make links to them. For example, if you give it "/content/html/reference/elements" it will make a list of all the HTML elements.

- as an explicit list of pages. An object that consists of two properties: `title`, which is a string that will be used as the list title, and `pages`, which is an array of paths to pages. Stumptown will make links to all the pages listed.

- as a `chapter_list`. An object that consists of one property: `chapter_list`, which is a path to a "Chapter list" YAML file. Stumptown will make links to all the pages listed in the chapter_list. This is really just a reusable version of the explicit list of pages.

For example:

```
link_lists:
  - title: Index of HTML elements
    directory: "/content/html/reference/elements"
  - title: Some guide pages
    pages:
      - "/content/html/guides/Block-level_elements"
      - "/content/html/guides/Inline_elements"
  - chapter_list: "/content/learn/html/Introduction_to_HTML.yaml"
```

This specifies three link lists.

- The first has the title "Index of HTML elements" and contains links to all the pages under "/content/html/reference/elements".
- The second has the title "Some guide pages", and contains links to the two pages listed.
- the third as the title and link list that's given in the referenced chapter list.

## Landing pages

From MDN's own meta-docs:

> A landing page serves as a menu, of sorts, for its subpages, and is therefore primarily a navigation page. A landing page layout is typically used for the root page of a tree of pages about a particular topic. It opens with a brief summary of the topic, then presents a structured list of links to its subpages, and optionally, additional material that be useful to the reader... The list of subpages can be generated automatically...

So typically they are made of some prose content on some high-level topic like HTML, followed by a collection of links to the pages comprising the docs for this topic.

Stumptown supports landing pages using Markdown files with YAML front matter. Although their front matter does list a `recipe: landing-page` property, the recipe itself isn't used in building the page.

**Note: we should just make landing pages recipe-driven like the reference pages.**

The landing page front matter looks like:

```yaml
---
title: "HTML: Hypertext Markup Language"
mdn_url: /en-US/docs/Web/HTML
specifications: https://html.spec.whatwg.org/multipage/
recipe: landing-page
related_content: /content/related_content/html.yaml
link_lists:
  - title: Learn HTML
    pages:
      - "/content/learn/html/Introduction_to_HTML"
  - title: Reference
    pages:
      - "/content/html/reference/elements"
---

```

The `title`, `mdn_url`, `specifications`, and `recipe` properties are all the same as in a normal recipe-driven page like `html-element`. The `related_content` is in the landing page itself rather than in the recipe: this is because different landing pages want different sidebars, while all the HTML elements should get the same sidebar.

The other property is a `link_lists` object describing the lists of links to include.

The Markdown part of the landing page provides an overview of the technology.

## Guide pages

For reference pages (and to a lesser extent landing pages) we've described a system where a page has a clear structure that's described in the recipe and enforced by stumptown.

I'd estimate that about 90% of the web documentation pages on MDN are reference pages and will be (we hope) amenable to this treatment.

But MDN also contains a substantial number of "guide" pages. These pages are fundamentally unstructured prose content, and the recipe model doesn't work for them. Still, we can't treat them just as prose, because they want to embed special content such as browser compatibility tables or live samples - and they want to be able to embed them just anywhere.

In stumptown, guide pages are Markdown files with YAML front matter. The front matter is quite minimal:

```yaml
---
title: Applying color to HTML elements using CSS
mdn_url: /en-US/docs/Web/HTML/Applying_color
related_content: /content/related_content/html.yaml
recipe: guide
---

```

Like everything else, it has a `title` and a `mdn_url` and a `recipe`. Like landing pages, it has `related_content` in the front matter rather than the recipe, because because different guide pages want different sidebars. These are the only items allowed in the front matter.

For guide pages, the recipe is empty, so doesn't put any constraints on the things that the page can contain.

The Markdown part is of course the guide's prose. To support the "special content" that guides want to embed, stumptown has the concept of "directives". A directive looks like:

```
{{{{{embed-example:examples/specifying-colors-in-stylesheets}}}}}
```

We currently support two directives:

- "embed-example": this tells stumptown that the guide wants to embed a live sample at this point. Its argument is "examples/specifying-colors-in-stylesheets", which is a path to a directory containing an example. The content of this directory is just the same as the directories references by the `examples` front matter property, with a mandatory "description.md" and optional "example.[html|css|js]" files.

- "embed-compat": this tells stumptown that the guide wants to embed a BCD table at this point. Its argument is a BCD query string like "html.elements.audio".

We will probably add support for more directives in future, not too many. One likely candidate would be "embed-link-list".

Directives can be inserted anywhere in guide pages. They can only be used in guide pages.

Directives look a lot like KumaScript macros, because they are essentially the same.

**Note: we have an open issue to use a less terrible syntax for directives: https://github.com/mdn/stumptown-content/issues/103 .**

## Related content

This feature enables us to represent collections of links to stumptown pages, organized into groups.

It is currently used only to specify sidebars, although it's deliberately described and named in such a way that it might be usable for other applications.

Each collection of related content is described in a special YAML file. All "related content" YAML files live together in content/related_content.

It's specified as an array of objects. Each object describes a section of the related content. A section has two properties:

- `title`: the name of this section
- `directory` or `chapter_list` or `pages` or `children`:
  - if `directory`, then this section contains links to all pages in the given directory
  - if `chapter_list` then this section contains links to all pages as specified in the given chapter list
  - if `pages` then this section contains links to all pages listed explicitly
  - if `children`, then this section itself contains sections: this enables you to nest groups of links to an arbitrary depth.

So for example, here's a "related content" file for HTML:

```yaml
- title: Learn HTML
  children:
    - chapter_list: "/content/learn/html/Introduction_to_HTML.yaml"
    - chapter_list: "/content/learn/html/Multimedia_and_embedding.yaml"
- title: Guides
  children:
    - chapter_list: "/content/html/guides/Guides.yaml"
- title: Reference
  children:
    - title: Elements
      directory: "/content/html/reference/elements"
    - title: Global attributes
      directory: "/content/html/reference/attributes"
```

It consists of three top-level sections.

- The first section "Learn HTML" consists of two subsections, each specified using a chapter list ("Introduction_to_HTML.yaml" and "Multimedia_and_embedding.yaml").

- The second section "Guides" consists of one subsection, specified using a chapter list ("Guides.yaml").

- The third section "Reference" consists of two subsections, each specified using a directory ("/content/html/reference/elements" and "/content/html/reference/attributes").

The resulting structure looks like:

- Learn HTML
  - Introduction to HTML
    - ... all Introduction to HTML chapters
  - Multimedia and embedding
    - ... all Multumedia and embedding chapters
- Guides
  - HTML guides
    - ...all HTML guide pages
- Reference
  - Elements
    - ...all HTML element pages
  - Global attributes
    - ...all HTML global attribute pages

These related content files are referenced using the `related_content` property. This may appear either in recipes (for page types that all want the same related content collection), or in the front matter section of individual pages (for page types, like guides and landing pages, that don't all want the same related content collection).

**Note: we will need to think about how to extend this grammar for more complex sidebars.**

**Note: we should probably abandon this "infinite levels of sections" thing here and perhaps restrict ourselves to three levels (by not allowing children to contain children).**

## Chapter lists

A "chapter list" is just a way to provide a reusable list of links to pages, presented in a particular order. For example, a sidebar might want to list all the HTML guide pages in a curated order, with the most basic first, and more advanced concepts later. So the sidebar specification could provide its own list of pages to include. But an HTML landing page might also want to include the same list, in the same order. This is what chapter lists enable you to do.

A chapter list is a YAML file with the following contents:

- `title`: a mandatory property whose value is a string. This provides a title for the list.
- `chapters`: an array of paths to pages to include, relative to the location of the chapter list itself.

For example, the chapter list for HTML guides, which is at content/html/guides:

```
title: Guides
chapters:
    - Block-level_elements
    - Inline_elements
    - Link_types
    - Applying_color
    - Date_and_time_formats
    - Preloading_content
    - CORS_settings_attributes
    - CORS_enabled_image
    - DASH_Adaptive_Streaming_for_HTML_5_Video
    - Microdata
    - microformats
    - Quirks_Mode_and_Standards_Mode
```

## Specifications

Writers use the `specifications` front matter property to describe the specifications that define a particular item. But they just list URLs there, and we want the rendered output to include the name of the specification too.

We could ask writers to include the specification name as well, but this would involve repetition and place a burden on the writers to get the name right. So instead we keep a separate file that maps specification URLs to specification names. This file is called "specifications.yaml" and is kept under content/data.

Here's an example:

```yaml
# Allowed specification domains and their titles
# Never add historical specfications to this allow list

html.spec.whatwg.org: "WHATWG HTML Living Standard"
w3c.github.io/webappsec-cspee: "Content Security Policy: Embedded Enforcement"
w3c.github.io/webappsec-feature-policy: "Feature Policy"
wicg.github.io/priority-hints: "Priority Hints"
```

Items listed in the `specifications` front matter property must match one of the URLs in this file. They may add extra path elements and fragments, to point to individual items within a specification:

```
specifications: https://html.spec.whatwg.org/multipage/semantics.html#the-abbr-element
```

**Note: I don't see a reason why the front matter property includes a scheme, but the scheme is not present in "specifications.yaml".**

## Contributors

Markdown files in stumptown that can be built into pages must have a "contributors.md" file in the same directory. This lists contributions made to the original page in the Kuma Wiki. This file is created when the page is first migrated from the Wiki and should then be treated as read only.

**Note: this approach to attributing legacy contributions is very likely to change in future, and contributors.md will be moved out of /content.**
