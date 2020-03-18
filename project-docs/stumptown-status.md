## What are we trying to achieve?

This document describes the current state of our attempts to describe a replacement for the MDN platform, Kuma.

We're trying to describe a replacement that will meet the following objectives:

- pull request model for content updates: content will live on GitHub and be updated using pull requests
- a structure for reference docs:
  - concisely and clearly define and enforce the structure that docs (especially reference docs) will follow
  - be able to restructure reference docs relatively easily
  - be able to offer the structured content to third parties via an API
- make it easy to contribute to our docs using commonly understood tools and formats
- have a website that's faster, simpler, and easier to maintain than Kuma

This is not intended to be a clone of Kuma. We will implement what we actually need, not whatever Kuma does. There will be things that were possible in Kuma that will not be possible in the replacement, where we think that these things are not essential and that supporting them will prevent us from meeting the objectives above.

We should emphasise that this an early experimental proposal. A lot more work would be needed to determine whether it's really a viable approach, and we are open to quite fundamental changes at this point.

## Background

### What is an MDN reference document?

We can think of MDN reference docs as "enhanced prose". That is, they consist fundamentally of prose, but this is augmented by various fancy features (like interactive examples, browser compat tables, live samples) that are built by custom code from some supplementary content.

Historically in Kuma we've done this by embedding KumaScript macros (directives) in the prose, that are able to build and insert these extra features.

One problem with this "directive-based" approach is that the documents have no structure: authors can insert directives anywhere they choose. We have to rely on having clear written guidelines, on people following them properly, and on us updating everything manually when things change. This is not realistic.

In the new proposal we want to define "recipes" for different sorts of MDN reference docs - HTML element docs, CSS property docs, and so on. A recipe describes a particular collection of sections arranged in a particular order. For example:

- short description
- interactive example
- description
- accessibility concerns
- live examples
- browser compatibility
- see also

We want the code that builds MDN reference documents to use these recipes to build complete documents out of the sections.

Note that some of these sections are fundamentally prose, while others are fancy features like interactive examples, browser compat tables, and so on, that are built using custom code (the equivalent of a macro like Compat.ejs).

Also note that this approach is specifically for reference docs, which want a very well-defined structure. The old "directive-based" approach would still work for tutorials and guides.

### Structuring prose content and frustrating writers

We've said that some of the components of a document are "fundamentally prose". We can think of a couple of different ways to structure prose:

1. a page is presented to the author as a collection of different pieces that are then assembled into a single document. Note that we do this already to some extent - interactive examples, BCD, CSS syntax, for example, are all provided outside the main prose content of the page. But we might, for example, want to make the author create the short description or the "See also" section in a separate file from the main body of the prose content.

2. a page is written as a single entity but uses some semantic markup to indicate structure. Some kind of linting can be applied to the doc to make sure it has the correct structure.

The problem of both these approaches is that they tend to make writing more difficult and frustrating. Approach 1 tends towards making writing docs into an exercise in form-filling, while with approach 2, semantic markup formats are hard to write and hard to read.

So part of designing a solution is to find a balance where structured content is possible but writers are not too frustrated. In general, it's a goal as far as possible to:

- have a "holistic source document": keep the prose content together in a single piece, that makes sense on its own
- use a simple format for authoring the prose content.

### Prose format choices

One basic question is: which format should we use for writing prose? There are two main criteria we'd like to satisfy here:

- it should be easy to read and write
- it should enable authors to express semantic structure in a machine-readable way: for example, it would be useful for us to be able to mark up a section of a doc as the "short description" and have software able to extract this reliably.

Unfortunately these tend to be opposed. At one extreme is something like DITA, which would enable us to express semantics very well, but is too hard for most people to want to write. At the other extreme is Markdown, which is very easy to write but is incapable of expressing semantics: it's purely a presentational language.

Somewhere in between is reStructuredText, which is fairly easy to write but still enables us to express some semantic structure.

Currently it's our recommendation to use Markdown. This has some serious disadvantages:

- multiple competing versions: we would probably choose GitHub Flavored Markdown.
- very limited: even basic elements like `<dl>` can't be expressed directly in basic Markdown.
- most seriously, no ability to express semantics: Markdown is entirely presentational. This will lead us into some hacks later on.

However Markdown is so ubiquitous and so easy to write that it's hard to imagine anything else being accepted by authors. Everyone already knows Markdown: choosing anything else is asking a large proportion of people to learn a new format just for MDN. reStructuredText seems promising but it seems as if even people who already know it don't like using it.

## Overview

In this proposal, the docs are stored in a GitHub repository. The repository has two directories in the root: `content` and `recipes`.

Underneath `content` we will have a hierarchy which mirrors the structure already used in browser-compat-data:

```
content
    - api
        - ...
    -css
        -properties
            -transform
    -html
        -elements
            -video
    -javascript
        - ...
```

In directories that want a page in MDN (for example, `transform` and `video` in the example above) we will have at least two files:

- `meta.yaml`
- `prose.md`

The `prose.md` file contains the prose content part of the page. It's written in GitHub Flavored Markdown. The `meta.yaml` file contains supplementary information needed to build the complete page.

The first property we need to talk about in `meta.yaml` is the `recipe` property. It identifies the type of page that should be built for this item. For example, the `meta.yaml` property for `video` will contain:

```yaml
recipe: `html-element`
```

This will match the name of a YAML file in the `recipes` directory. Here's what the `recipes/html-element.yaml` file might look like:

```yaml
body:
  - prose.short-description
  - meta.interactive-example
  - prose.description?
  - meta.attributes
  - prose.usage-notes
  - prose.*
  - prose.accessibility-concerns?
  - meta.examples
  - meta.info-box:
      - meta.api
      - meta.permitted-aria-roles
      - meta.tag_omission
  - meta.specifications
  - meta.browser-compatibility
  - prose.see-also
```

Each property in this file represents a section of the document, listed in the order that they should appear. Some properties are prefixed `prose.`: this means that their content should be extracted from the `prose.md` file for the item. Other properties are prefixed `meta.`: this means that their content needs to be constructed using some custom process based on parameters that can be found in the `meta.yaml` file for the item.

So the way the page builder will proceed is:

- open the item's `meta.yaml` and get the value of its `recipe` property
- use this to find the recipe for this item
- use the other properties of `meta.yaml`, and the contents of `prose.md`, to construct the complete document.

For example:

- the page builder opens `content/html/elements/video`
- it opens `meta.yaml` and finds `html-element` as the value of `recipe`
- it finds `html-element.yaml` in `recipes`:
  - it extracts the `short-description` section from `video/prose.md`
  - it fetches the URL for the interactive example from the `interactive-examples` property in `video/meta.yaml`
  - it extracts the `description` section from `video/prose.md`
  - ...and so on.

The idea is that recipes provide a concise description of the structure of the various MDN page types, that is kept in one place and is enforced by the code that constructs MDN pages.

### More about `meta` sections

Here's what the `meta.yaml` file for `video` might look like:

```yaml
recipe: html-element
title: "<video>: The Video Embed element"
mdn-url: https://developer.mozilla.org/docs/Web/HTML/Element/video
tags:
  group: Image and multimedia
dom-interface: HTMLVideoElement
permitted-aria-roles: application
tag_omission: none
interactive-example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/video.html
specifications:
  - link: https://html.spec.whatwg.org/multipage/embedded-content.html#the-video-element
    status: Living Standard
browser-compatibility: html.elements.video
examples:
  - title: Simple video example
    html-source: examples/simple-video-example/example.html
    description: examples/simple-video-example/description.md
    size:
      width: 640
      height: 370
  - title: Multiple sources example
    html-source: examples/multiple-sources-example/example.html
    description: examples/multiple-sources-example/description.md
    size:
      width: 640
      height: 370
attributes:
  element-specific: ./attributes
  global-attributes: /content/html/global_attributes
```

First we specify that the builder should use the `html-element` recipe to build this page. That's also a promise that the rest of this file contains all the data needed to build all the `meta` sections of that recipe.

Next are some quite generic items: `title`, `mdn-url`, and `tags`.

The names of the remaining properties match items in the `html-example.yaml` recipe file:

- `dom-interface`, `permitted-aria-roles`, and `tag_omission` are used to populate the HTML element info-box.

- `interactive-example` is the URL where the interactive example can be found.

- `specifications` lists all the specifications for this item.

- `browser-compatibility` is the browser-compat query for the item. This may contain more than one item, since some pages (e.g. https://developer.mozilla.org/en-US/docs/Web/CSS/gap#Browser_compatibility) contain more than one compat table.

- `examples` describes all the live examples in this page, listed in the order that they should be included.

- `attributes` is reference to more information about this element's attributes.

Note that these items are handled in an entirely custom way. This means that the way, for example, that `browser-compatibility` is handled is completely different from the way `interactive-example` is handled. So these kinds of items are very analogous to KumaScript macro calls.

Some of these items are specific to HTML elements, but most of them should be common to at least a few page types.

#### Representing examples

We've seen above that this represents examples using an `examples` property. This property is a list of examples. Each one has an optional title.

Live examples have one or more of `html-source`, `css-source`, or `js-source` properties, which point to files containing code to include in the live example. In this case (and probably in most cases) the source is included right underneath the `video` element's own directory.

Live examples also have a `size` property defining the size of the example in the page.

Examples can also have an optional `description`, which is just a Markdown file. If this is supplied, the builder will include it before the example.

#### Representing attributes

For HTML elements, attributes are _not_ just treated as prose: they are given a structured representation. So the `attributes` property in `meta.yaml` points to:

- a place the builder can find the global attributes
- a place the builder can find the element-specific attributes

In those locations the builder will find a number of Markdown files. Each Markdown file starts with a metadata item `browser-compatibility` telling us where to get compat data for this attribute. After this the file describes the attribute using a defined structure that enables the builder to extract, for each attribute:

- name
- type
- allowed values
- general description

This is a place where we trade off ease-of-writing against structure. We want HTML element attributes to be machine readable, so an editor could list the possible attributes for a given element. So we separate them out, and move a little in the direction of "form-filling" and a little away from the "holistic source document" ideal.

### More about `prose` sections

Of course, as well as `meta.` sections, the recipe for `html-element` also asks for some prose sections. These are all sections of the `prose.md` file for the item.

This means we must have a way to break up a Markdown file into named sections, and Markdown doesn't appear to offer any way to do that. Our best suggestion here is to use HTML comments with a specific format:

```html
<!-- <short-description> -->
The **HTML Video element** (**`<video>
  `**) embeds a media player which supports video playback into the document.
  <!-- </short-description> -->

  <!-- <description> -->
  You can use `<video>
    ` for audio content as well, but the [`<audio>
      `](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
      element may provide a more appropriate user experience. ....
      <!-- </description> -->
    </audio>
  </video>
</video>
```

#### Optional and wildcard sections

The specification of `prose.` items in the recipe can use a couple of extra features that give authors a little more flexibility.

- In the recipe some sections get a question mark, like `- prose.accessibility-concerns?`. These are optional sections. If a given item doesn't include this section, the builder skips it.

- You can also include an item like `-prose.*`. This means: "include at this point any other marked sections out of prose.md, in the order they appear". This enables authors to include extra sections in the doc at a specific point.

## A CSS property example

We've also sketched out how we might define a CSS property in this system. The property chosen is `transform` and the recipe is like this:

```yaml
body:
  - prose.short-description
  - meta.interactive-example
  - prose.description?
  - prose.syntax
  - meta.formal-syntax
  - prose.*
  - prose.accessibility-concerns?
  - meta.examples
  - meta.info-box:
      - meta.animatable
      - meta.initial-value
  - meta.specifications
  - meta.browser-compatibility
  - prose.see-also
```

This is quite similar to the html-element recipe above, with just a few extra sections for things like formal syntax.

The `meta.yaml` is also fairly similar:

```yaml
recipe: css-property
title: transform
mdn-url: https://developer.mozilla.org/docs/Web/CSS/transform
interactive-example: https://interactive-examples.mdn.mozilla.net/pages/css/transform.html
formal-syntax: "none | <transform-list>"
animatable: true
initial-value: none
specifications:
  - link: https://drafts.csswg.org/css-transforms-2/#transform-functions
    name: CSS Transforms Level 2
    status: Editor's Draft
  - link: https://drafts.csswg.org/css-transforms/#transform-property
    name: CSS Transforms Level 1
    status: Working Draft
browser-compatibility: css.properties.transform
examples:
  - html-source: examples/simple-transform-example/example.html
    css-source: examples/simple-transform-example/example.css
    size:
      width: 400
      height: 160
```

## Additional notes

### The MDN API

So far we've talked mainly about how this design could enable us to build MDN pages. But it's also a goal to enable an MDN API that could be queried by third-party tools like code editors. We haven't fleshed this out, but it's our hope that the items listed in `meta.yaml` and sections of `prose.md` could be accessed through a single MDN API. This would help to give us a more coherent organization than the current one, where we have mdn/browser-compat-data, mdn/data, mdn/short-descriptions, and so on.

### Risks

One big risk is complexity. As we've noted, every `meta.` item has entirely custom handling. If we end up with too many different meta items, the page builder will get much more complex.

Another is that we are too restrictive. In this design there are things you can't do, that you could do in the old Kuma design. Sometimes this is OK, but it's a risk that there are just too many places where we are relying on this freedom.

We can only really test these risks by analysing more pages and more page types.

### KumaScript

We can distinguish 2 types of KumaScript macros:

- "block" macros, that construct a complete section of a document. For example, `Compat.ejs`, `EmbedInteractiveExample.ejs`, `EmbedLiveSample.ejs`, `cssinfo.ejs`. These are replaced quite precisely with `meta.` sections.

- "inline" macros, that appear in the flow of the prose. The most common of these are the XRef macros, but badges are also inline. These macros are not replaced in this system. With the docs in GitHub rather than the Kuma database it would be much easier to do global search and replace operation if we do want to change, for example, a lot of links at a time: this to some extent makes up for some of the benefits of XRef macros.

### Omissions

We've only taken the first step here. There are still many MDN page types to analyse.

Under "reference pages" we still have many "leaf" pages - CSS selectors, JavaScript functions, Web API methods, and so on. We also have pages that aggregate other pages, such as Web API interface pages as well as "landing pages".

Apart from the reference pages, we need a plan for tutorial and guide pages. These pages don't have such a strict structure as the reference pages, so it seems like the recipe-based approach might be too restrictive, and it might be better to adopt something more like the "directive-based" KumaScript approach for things like live samples. We also need to find a way to describe relationships between reference pages and corresponding tutorials.

We haven't seriously considered how sidebars fit into this picture. We do think that we should aim for much simpler sidebars than the current MDN.

We haven't looked at many aspects of actually running the website. We have discussed handling redirects but don't have anything concrete yet.

We haven't considered localization at all.

We haven't considered the mechanics of how we would make the content available using an API.
