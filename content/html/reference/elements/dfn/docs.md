---
title: '<dfn>: The Definition element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/dfn
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/dfn.html
browser_compatibility: html.elements.dfn
examples:
    - examples/basic-identification
    - examples/links-to-definitions
    - examples/abbreviations-and-definitions
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Definition element** (**\<dfn>**) is used to indicate the
term being defined within the context of a definition phrase or
sentence. The
[`<p>`](/en-US/docs/Web/HTML/Element/p)
element, the
[`<dt>`](/en-US/docs/Web/HTML/Element/dt)/[`<dd>`](/en-US/docs/Web/HTML/Element/dd)
pairing, or the
[`<section>`](/en-US/docs/Web/HTML/Element/section)
element which is the nearest ancestor of the `<dfn>` is considered to be
the definition of the term.

## Overview

- The `<dfn>` element marks the term being defined; the definition of
  the term should be given by the surrounding
  [`<p>`](/en-US/docs/Web/HTML/Element/p),
  [`<section>`](/en-US/docs/Web/HTML/Element/section)
  or definition list group (usually a
  [`<dt>`](/en-US/docs/Web/HTML/Element/dt),
  [`<dd>`](/en-US/docs/Web/HTML/Element/dd)
  pair).

### Specifying the term being defined

The term being defined is identified following these rules:

1. If the `<dfn>` element has a `title` attribute, the value of the
   `title` attribute is considered to be the term being defined. The
   element must still have text within it, but that text may be an
   abbreviation (perhaps using
   [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr))
   or another form of the term.
2. If the `<dfn>` contains a single child element and does not have any
   text content of its own, and the child element is an
   [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr)
   element with a `title` attribute itself, then the exact value of the
   `<abbr>` element's `title` is the term being defined.
3. Otherwise, the text content of the `<dfn>` element is the term being
   defined.

If the `<dfn>` element has a `title` attribute, it *must* contain the
term being defined and no other text.

### Links to `<dfn>` elements

If you include an `id` attribute on the `<dfn>` element, you can then
link to it using
[`<a>`](/en-US/docs/Web/HTML/Element/a)
elements. Such links should be uses of the term, with the intent being
that the reader can quickly navigate to the term's definition if
they're not already aware of it, by clicking on the term's link.

## See also

- Elements related to definition lists:
  [`<dl>`](/en-US/docs/Web/HTML/Element/dl),
  [`<dt>`](/en-US/docs/Web/HTML/Element/dt),
  [`<dd>`](/en-US/docs/Web/HTML/Element/dd)
- [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr)
