---
title: '<abbr>: The Abbreviation element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/abbr
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles:
    - any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/abbr.html
browser_compatibility: html.elements.abbr
examples:
    - examples/marking-up-an-abbreviation
    - examples/styling-an-abbreviation
    - examples/providing-an-expansion
    - examples/defining-an-abbreviation
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Abbreviation element** (**`<abbr>`**) represents an
abbreviation or acronym.

## Overview

The article *[How to mark abbreviations and make them
understandable](/en-US/Learn/HTML/Howto/Mark_abbreviations_and_make_them_understandable)*
is a guide to learning to use `<abbr>` and related elements.

### Typical use cases

It's certainly not required that all abbreviations be marked up using
`<abbr>`. There are, though, a few cases where it's helpful to do so:

- When an abbreviation is used and you want to provide an expansion or
  definition outside the flow of the document's content, use `<abbr>`
  with an appropriate `title`.
- To define an abbreviation which may be unfamiliar to the reader,
  present the term using `<abbr>` and either a `title` attribute or
  inline text providing the definition.
- When an abbreviation's presence in the text needs to be
  semantically noted, the `<abbr>` element is useful. This can be
  used, in turn, for styling or scripting purposes.
- You can use `<abbr>` in concert with
  [`<dfn>`](/en-US/docs/Web/HTML/Element/dfn)
  to establish definitions for terms which are abbreviations or
  acronyms. See the example [Defining an abbreviation](#Defining_an_abbreviation) below.

### Grammar considerations

In languages with [grammatical
number](https://en.wikipedia.org/wiki/grammatical%20number "grammatical number")
(that is, languages where the number of items affects the grammar of a
sentence), use the same grammatical number in your `title` attribute as
inside your `<abbr>` element. This is especially important in languages
with more than two numbers, such as Arabic, but is also relevant in
English.

### title attribute

The optional `title` attribute can provide an
expansion or description for the abbreviation. If present,
`title` must contain this full description and nothing else.

## Accessibility concerns

Spelling out the acronym or abbreviation in full the first time it is
used on a page is beneficial for helping people understand it,
especially if the content is technical or industry jargon.

### Example

``` {.brush: .html}
<p>JavaScript Object Notation (<abbr>JSON</abbr>) is a lightweight data-interchange format.</p>
```

This is especially helpful for people who are unfamiliar with the
terminology or concepts discussed in the content, people who are new to
the language, and people with cognitive concerns.

## Attributes text

The `title`
attribute has a specific semantic meaning when used with the `<abbr>`
element; it *must* contain a full human-readable description or
expansion of the abbreviation. This text is often presented by browsers
as a tooltip when the mouse cursor is hovered over the element.

Each `<abbr>` element you use is independent from all others; providing
a `title` for one does not automatically attach the same expansion text
to others with the same content text.

## Default styling

The purpose of this element is purely for the convenience of the author
and all browsers display it inline
([`display`](/en-US/docs/Web/CSS/display)`: inline`)
by default, though its default styling varies from one browser to
another:

- Some browsers, like Internet Explorer, do not style it differently
  than a
  [`<span>`](/en-US/docs/Web/HTML/Element/span)
  element.
- Opera, Firefox, and some others add a dotted underline to the
  content of the element.
- A few browsers not only add a dotted underline, but also put it in
  small caps; to avoid this styling, adding something like
  [`font-variant`](/en-US/docs/Web/CSS/font-variant)`: none`
  in the CSS takes care of this case.

## See also

- [Using the `<abbr>` element](/en-US/Learn/HTML/Element/abbr)
- Other elements conveying [text-level semantics](/en-US/docs/Web/HTML/Text_level_semantics_conveying_elements):
  [`<a>`](/en-US/docs/Web/HTML/Element/a),
  [`<em>`](/en-US/docs/Web/HTML/Element/em),
  [`<strong>`](/en-US/docs/Web/HTML/Element/strong),
  [`<small>`](/en-US/docs/Web/HTML/Element/small),
  [`<cite>`](/en-US/docs/Web/HTML/Element/cite),
  [`<q>`](/en-US/docs/Web/HTML/Element/q),
  [`<dfn>`](/en-US/docs/Web/HTML/Element/dfn),
  [`<time>`](/en-US/docs/Web/HTML/Element/time),
  [`<code>`](/en-US/docs/Web/HTML/Element/code),
  [`<var>`](/en-US/docs/Web/HTML/Element/var),
  [`<samp>`](/en-US/docs/Web/HTML/Element/samp),
  [`<kbd>`](/en-US/docs/Web/HTML/Element/kbd),
  [`<sub>`](/en-US/docs/Web/HTML/Element/sub),
  [`<sup>`](/en-US/docs/Web/HTML/Element/sup),
  [`<b>`](/en-US/docs/Web/HTML/Element/b),
  [`<i>`](/en-US/docs/Web/HTML/Element/i),
  [`<mark>`](/en-US/docs/Web/HTML/Element/mark),
  [`<ruby>`](/en-US/docs/Web/HTML/Element/ruby),
  [`<rp>`](/en-US/docs/Web/HTML/Element/rp),
  [`<rt>`](/en-US/docs/Web/HTML/Element/rt),
  [`<bdo>`](/en-US/docs/Web/HTML/Element/bdo),
  [`<span>`](/en-US/docs/Web/HTML/Element/span),
  [`<br>`](/en-US/docs/Web/HTML/Element/br),
  [`<wbr>`](/en-US/docs/Web/HTML/Element/wbr).
- The obsolete
  [`<acronym>`](/en-US/docs/Web/HTML/Element/acronym)
  element, whose responsibilities were folded into `<abbr>`
