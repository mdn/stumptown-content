# HTML element recipe breakdown

This document is intended to help explain how we could take a "recipe" for an HTML element, and the structured content for the element, (for example: https://github.com/mdn/stumptown-content/tree/master/content/html/elements/video) and generate an MDN page from it.

The overall outline of an HTML element reference page on MDN is like this:

```
short description prose
interactive example
description prose

H2 Attributes
attributes prose
attributes list

H2 Usage notes
usage notes prose

... any other H2 prose sections

H2 Accessibility concerns
accessibility concerns prose

H2 Examples
examples list

H2 Technical summary
technical summary table (aka info-box)

H2 Browser compatibility
BCD table

H2 See also
see also prose

```

The recipe for an HTML element, as it's currently specified, is like this:

```yml
body:
  - prose.short-description
  - meta.interactive-example?
  - prose.description?
  - prose.attributes-text?
  - meta.attributes
  - prose.usage-notes
  - prose.*
  - prose.accessibility-concerns?
  - meta.examples
  - meta.info-box:
      - meta.api
      - meta.permitted-aria-roles
      - meta.tag_omission
  - meta.browser-compatibility
  - prose.see-also
```

Entries in the recipe are either prefixed "prose.", in which case they are bits of the prose.md file and are generally just inserted as Markdown, or they are prefixed "meta." in which case they are bits of the meta.yaml file. Some meta.yaml entries point somewhere else and require special handling.

Entries followed by "?" are optional.

I think one unresolved thing is: where do we represent H2 heading text? I think this should be defined in the recipe (rather than in the content itself), so we can guarantee that all pages use consistent headings. But at the moment it is not represented in the recipe, so the heading text is just implicit.

Maybe the "recipe" is more like the first block above, that explicitly represents H2 headings, but also includes pointer into the meta.yaml and prose.md files?

```yml
- prose.short-description
- meta.interactive-example?
- prose.description?
- H2.Attributes
- prose.attributes-text?
- meta.attributes
- H2.Usage notes
- prose.usage-notes
- prose.*
- H2.Accessibility concerns
- prose.accessibility-concerns
- H2.Examples
- meta.examples
- H2.Technical summary
- meta.info-box
- H2.Browser compatibility
- meta.browser-compatibility
- H2.See also
- prose.see-also
```

I don't know.

## Recipe fields

### prose.short-description

Mandatory.

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.

### meta.interactive-example

Optional.

This is found as a property in the meta.yaml file.

It's a URL pointing to a built interactive example (e.g. https://interactive-examples.mdn.mozilla.net/pages/tabbed/audio.html ).

The linked page should be embedded in an iframe for inclusion in the page - in Kuma this work is done in [EmbedInteractiveExample.ejs](https://github.com/mdn/kumascript/blob/master/macros/EmbedInteractiveExample.ejs).

The way we handle interactive examples here is likely to change in the future, but that's a different conversation.

### prose.description

Optional.

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.

### prose.attributes-text

Optional.

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.

### meta.attributes

Mandatory.

These are specified in meta.yaml as two properties, "global" and "element-specific", both given as paths relative to the meta.yaml file itself.

For MDN pages we could just handle "global" with some text like "Like all other HTML elements, this element supports the global attributes." (see e.g. the boilerplate at the start of https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Attributes ).

"element-specific": is more complicated. The directory pointed to should contain one or more Markdown files each of which documents an attribute. Each of those files has its own structure:

- front matter which is currently just a BCD reference

- H1: this is the name of the attribute (marked up in ``), and is followed by some freeform Markdown describing the attribute.

- H2 "Values" (optional): If present this contains the values it can take. Each H3 under here is the value's name (marked up in ``), and is followed by some Markdown describing that value.

- H2: "Type" (mandatory (?)): If present this is followed by a string describing the type of the attribute. I think this ought to be an enumerated list of possible types, including "String", "Boolean", "Number", and possibly "URL".

For an example of a relatively complex attribute see [video.crossorigin](https://github.com/mdn/stumptown-content/blob/master/content/html/elements/video/attributes/crossorigin.md).

To render it in an MDN page, we could say:

- element-specific attributes are a `<dl>`

- each attribute is a `<dt><dd>` item, where the `<dt>` is the attribute name and the `<dd>` is the description.

- the `<dd>` description starts with the type, followed by the description. If values are specified they are given as a `<ul>`, in which each `<li>` consists of the value name followed by the value description.

This would give us something close to what MDN currently does to render attributes (see for example "referrerpolicy" in https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes ). We might choose to do something different though, and MDN is currently quite inconsistent here.

### prose.usage-notes

Mandatory (apparently, although perhaps this ought to be optional).

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.

### prose.\*

Optional.

This just says: for any other named sections in prose.md that are not otherwise explicitly listed, convert them to HTML and add them to the document here.

This gives writers a way to add extra sections of prose into the document. For example, the [`iframe` page wants a section on scripting](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Scripting).

### prose.accessibility-concerns

Optional.

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.

### meta.examples

Mandatory.

This is another complicated one. As background, there are [several ways examples are presented on MDN](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Code_examples).

The meta.examples item does not cover interactive-examples, they are handled separately (for now anyway). It covers the (often) longer-form examples, with accompanying descriptions, that live in the ["Examples" section of a page like `<dfn>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn#Examples).

There are two cases to handle:

- static examples which are really just a code block and a text description

- live examples which are a text description plus some executable code, which need to be made executable in the page (for example in an iframe as [the current live samples do](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Code_examples#Traditional_live_samples))

So, "meta.examples" is found as a property in the meta.yaml file. It's a list of paths relative to the meta.yaml file. Each item in the list specifies an example, and examples should be rendered in the order given (this is different from the specification of attributes, which just gives you a directory: that's because writers want to present examples in a particular order, while attributes should always be listed alphabetically).

To render each example, look in its directory. I think we probably need to think more about the specification of an example, but it's something like this.

- an example may have any of the following files:
  - a file called "description.md"
  - files called "example.js", "example.css", "example.html"

If "description.md" exists it may have:

- a front matter section that may contain:
  - "title": if this is present the example gets an H3 heading containing the specified title text
  - "width" and "height": if these are present then the example is a live sample, and these properties define the width and height of the output iframe in pixels.

* some Markdown text describing what the example does (or sometimes, just referring the reader to a different page where examples could be found, e.g. in [col#Examples](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#Examples). If this is present it should be rendered as HTML after the H3 heading, if there was one.

For any example.\* files found:

- they are rendered as code blocks (probably with a heading identifying JS/CSS/HTML?) in some predefined order (maybe HTML, CSS, JS?)
- if the example is to be treated as a live sample, then that has to be handled in a functionally similar way to that in which Kuma handles live samples now (this is I believe a combination of the [EmbedLiveSample macro](https://github.com/mdn/kumascript/blob/master/macros/EmbedLiveSample.ejs) and some Kuma core code). This gives an output box in which the result of the code is shown.

As I say, I think we might want to improve the specification of examples. This is a first effort to try to capture the main ways in which people write examples at the moment. I'd like to find a balance between giving writers flexibility to present examples in the way they want, and keeping the code that handles them from being too complicated.

One thing that people will probably want to do that isn't supported here, and probably should be, is the ability for writers to ask to hide particular code blocks in live samples - for example, if you want a little CSS to make a live sample work better, but it's not key to the example itself.

One thing that people do occasionally that I'm not proposing here, for live samples anyway, is breaking up a code block into pieces and interspersing descriptive text among the pieces. It just seems like this will be complex to specify and implement, and isn't IMO such a critical feature. Maybe some writers would disagree with me here.

### meta.info-box

Mandatory.

This is data for the blue box that shows up in all pages, sometimes under the heading ["Technical summary"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Technical_summary). We're not sure yet exactly which data should be in this box, but that the moment we're listing three things:

- meta.api: identifies the JavaScript interface to the element. Although it's just specified as a string at the moment, it should probably be a link.

- meta.permitted-aria-roles: get this from the meta.yaml file. It lists, well, permitted ARIA roles. I think it is a bit underspecified at the moment.

- meta.tag_omission: whether you can omit the closing tag. Obviously this should be renamed "meta.tag-omission".

All these items can be got from the meta.yaml file, and they should be rendered into a table/box like the blue box that's there now.

### meta.browser-compatibility

Mandatory.

This is found in the meta.yaml and is represented as a BCD query, like "html.elements.dfn". Given a BCD package you can use it to fetch the browser compat data for the element as a JSON object.

The JSON then needs to be rendered into a browser compat table, [like the ones currently in the pages](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Browser_compatibility). This is currently done using the [Compat](https://github.com/mdn/kumascript/blob/master/macros/Compat.ejs) macro, so the renderer here is basically a clone of that macro.

### prose.see-also

Mandatory (apparently, although perhaps this ought to be optional).

This is found as a named section of the prose.md file.

It's a blob of Markdown that should just be converted to HTML and added to the document.
