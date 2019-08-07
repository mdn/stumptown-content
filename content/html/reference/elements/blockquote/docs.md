---
title: '<blockquote>: The Block Quotation element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/blockquote
tags:
    group: Text content
api: HTMLQuoteElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/blockquote.html
browser_compatibility: html.elements.blockquote
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<blockquote>` Element** (or *HTML Block Quotation Element*)
indicates that the enclosed text is an extended quotation.

## Overview

Usually, this is rendered visually by indentation. A URL for the source of the
quotation may be given using the **cite** attribute, while a text representation
of the source can be given using the
[`<cite>`](/en-US/docs/Web/HTML/Element/cite) element.

To change the indentation applied to the quoted text, use the
[CSS](/en-US/docs/Glossary/CSS")
[`margin-left`](/en-US/docs/Web/CSS/margin-left)
and/or
[`margin-right`](/en-US/docs/Web/CSS/margin-right)
properties, or the
[`margin`](/en-US/docs/Web/CSS/margin)
shorthand property.

To include shorter quotes inline rather than in a separate block, use
the
[`<q>`](/en-US/docs/Web/HTML/Element/q)
(Quotation) element.

## See also

- The [`<q>`](/en-US/docs/Web/HTML/Element/q)
  element for inline quotations.
- The [`<cite>`](/en-US/docs/Web/HTML/Element/cite)
  element for source citations.
