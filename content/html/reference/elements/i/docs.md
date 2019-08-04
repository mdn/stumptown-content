---
title: '<i>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/i
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/i.html
browser_compatibility: html.elements.i
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<i>` element** represents a range of text that is set off
from the normal text for some reason. Some examples include technical
terms, foreign language phrases, or fictional character thoughts. It is
typically displayed in italic type.

## Overview

- Use the `<i>` element for text that is set off from the normal prose
  for readability reasons. This would be a range of text with
  different semantic meaning than the surrounding text.
- In earlier versions of the HTML specification, the `<i>` element was
  merely a presentational element used to display text in italics,
  much like the `<b>` element was used to display text in bold
  letters. This is no longer true, as these tags now define semantics
  rather than typographic appearance. A browser will typically still
  display the contents of the `<i>` element in italic type, but is, by
  definition, no longer required to.
- Typically this element is displayed in italic type. However, it
  should not be used simply to apply italic styling; use the CSS
  [`font-style`](/en-US/docs/Web/CSS/font-style)
  property for that purpose.
- Be sure the text in question is not actually more appropriate for
  another element.
  - Use [`<em>`](/en-US/docs/Web/HTML/Element/em) to indicate stress emphasis.
  - Use [`<strong>`](/en-US/docs/Web/HTML/Element/strong)
    to indicate stronger importance.
  - Use [`<mark>`](/en-US/docs/Web/HTML/Element/mark")
    to indicate relevance.
  - Use [`<cite>`](/en-US/docs/Web/HTML/Element/cite)
    to mark the name of a work, such as a book, play, or song.
  - Use [`<dfn>`](/en-US/docs/Web/HTML/Element/dfn)
    to mark the defining instance of a term.
- It is a good idea to use the **class** attribute to identify why the
  element is being used, so that if the presentation needs to change
  at a later date, it can be done selectively with style sheets.

## See also

- [`<em>`](/en-US/docs/Web/HTML/Element/em)
