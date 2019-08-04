---
title: '<embed>: The Embed External Content element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/embed
tags:
    group: Embedded content
api: HTMLEmbedElement
permitted_aria_roles:
    - application
    - document
    - img
    - presentation
tag_omission: no-closing-tag
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/embed.html
browser_compatibility: html.elements.embed
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<embed>` element** embeds external content at the specified
point in the document. This content is provided by an external
application or other source of interactive content such as a browser
plug-in.

## Overview

**Note:** This topic documents only the element that is defined as part
of HTML5. It does not address earlier, non-standardized implementation
of the element.

Keep in mind that most modern browsers have deprecated and removed
support for browser plug-ins, so relying upon `<embed>` is generally not
wise if you want your site to be operable on the average user\'s
browser.

You can use the
[`object-position`](/en-US/docs/Web/CSS/object-position)
property to adjust the positioning of the embedded object within the
element's frame, and the [`object-fit`](/en-US/docs/Web/CSS/object-fit)
property to control how the object\'s size is adjusted to fit within the
frame.

## See also

- Other elements that are used for embedding content of various types
  include
  [`<audio>`](/en-US/docs/Web/HTML/Element/audio),
  [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas),
  [`<iframe>`](/en-US/docs/Web/HTML/Element/iframe),
  [`<img>`](/en-US/docs/Web/HTML/Element/img),
  `<math>`,
  [`<object>`](/en-US/docs/Web/HTML/Element/object),
  [`<svg>`](/en-US/docs/Web/SVG/Element/svg),
  and [`<video>`](/en-US/docs/Web/HTML/Element/video).
- Positioning and sizing the embedded content within its frame:
  [`object-position`](/en-US/docs/Web/CSS/object-position)
  and [`object-fit`](/en-US/docs/Web/CSS/object-fit)
