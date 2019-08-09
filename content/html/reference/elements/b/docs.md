---
title: '<b>: The Bring Attention To element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/b
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles:
    - any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/b.html
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

## Overview

This was formerly known as the
**Boldface element**, and most browsers still draw the text in boldface.
However, you should not use `<b>` for styling text; instead, you should
use the CSS
[`font-weight`](/en-US/docs/Web/CSS/font-weight)
property to create boldface text, or the
[`<strong>`](/en-US/docs/Web/HTML/Element/strong)
element to indicate that text is of special importance.

- Use the `<b>` for cases like keywords in a summary, product names in
  a review, or other spans of text whose typical presentation would be
  boldfaced (but not including any special importance).
- Do not confuse the `<b>` element with the
  [`<strong>`](/en-US/docs/Web/HTML/Element/strong),
  [`<em>`](/en-US/docs/Web/HTML/Element/em),
  or
  [`<mark>`](/en-US/docs/Web/HTML/Element/mark)
  elements. The
  [`<strong>`](/en-US/docs/Web/HTML/Element/strong)
  element represents text of certain *importance*,
  [`<em>`](/en-US/docs/Web/HTML/Element/em)
  puts some emphasis on the text and the
  [`<mark>`](/en-US/docs/Web/HTML/Element/mark)
  element represents text of certain *relevance*. The `<b>` element
  doesn't convey such special semantic information; use it only when
  no others fit.
- Similarly, do not mark titles and headings using the `<b>` element.
  For this purpose, use the
  [`<h1>`](/en-US/docs/Web/HTML/Element/h1)
  to
  [`<h6>`](/en-US/docs/Web/HTML/Element/h6)
  tags. Further, stylesheets can change the default style of these
  elements, with the result that they are not *necessarily* displayed
  in bold.
- It is a good practice to use the `class` attribute on the `<b>`
  element in order to convey additional semantic information as needed
  (for example `<b class="lead">` for the first sentence in a
  paragraph). This makes it easier to manage multiple use cases of
  `<b>` if your stylistic needs change, without the need to change all
  of its uses in the HTML.
- Historically, the `<b>` element was meant to make text boldface.
  Styling information has been deprecated since HTML4, so the meaning
  of the `<b>` element has been changed.
- If there is no semantic purpose to using the `<b>` element, you
  should use the CSS
  [`font-weight`](/en-US/docs/Web/CSS/font-weight)
  property with the value `"bold"` instead in order to make text bold.

## See also

- Others elements conveying [text-level semantics](/en-US/docs/HTML/Text_level_semantics_conveying_elements):
  [`<a>`](/en-US/docs/Web/HTML/Element/a),
  [`<em>`](/en-US/docs/Web/HTML/Element/em),
  [`<strong>`](/en-US/docs/Web/HTML/Element/strong),
  [`<small>`](/en-US/docs/Web/HTML/Element/small),
  [`<cite>`](/en-US/docs/Web/HTML/Element/cite),
  [`<q>`](/en-US/docs/Web/HTML/Element/q),
  [`<dfn>`](/en-US/docs/Web/HTML/Element/dfn),
  [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr),
  [`<time>`](/en-US/docs/Web/HTML/Element/time),
  [`<code>`](/en-US/docs/Web/HTML/Element/code),
  [`<var>`](/en-US/docs/Web/HTML/Element/var),
  [`<samp>`](/en-US/docs/Web/HTML/Element/samp),
  [`<kbd>`](/en-US/docs/Web/HTML/Element/kbd),
  [`<sub>`](/en-US/docs/Web/HTML/Element/sub),
  [`<sup>`](/en-US/docs/Web/HTML/Element/sup),
  [`<i>`](/en-US/docs/Web/HTML/Element/i),
  [`<mark>`](/en-US/docs/Web/HTML/Element/mark),
  [`<ruby>`](/en-US/docs/Web/HTML/Element/ruby),
  [`<rp>`](/en-US/docs/Web/HTML/Element/rp),
  [`<rt>`](/en-US/docs/Web/HTML/Element/rt),
  [`<bdo>`](/en-US/docs/Web/HTML/Element/bdo),
  [`<span>`](/en-US/docs/Web/HTML/Element/span),
  [`<br>`](/en-US/docs/Web/HTML/Element/br),
  [`<wbr>`](/en-US/docs/Web/HTML/Element/wbr).
- [Using \<b\> and \<i\> elements (W3C)](https://www.w3.org/International/questions/qa-b-and-i-tags)
