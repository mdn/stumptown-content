---
title: '<caption>: The Table Caption element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/caption
tags:
    group: Table content
api: HTMLTableCaptionElement
permitted_aria_roles: none
tag_omission: yes
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/caption.html
browser_compatibility: html.elements.caption
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Table Caption element** (**`<caption>`**) specifies the
caption (or title) of a table, and if used is *always* the first child
of a [`<table>`](/en-US/docs/Web/HTML/Element/table).

## Overview

When the
[`<table>`](/en-US/docs/Web/HTML/Element/table)
element that contains the `<caption>` is the only descendant of a
[`<figure>`](/en-US/docs/Web/HTML/Element/figure)
element, you should use the
[`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption)
element instead of `<caption>`.

The caption's styling and physical position relative to the table may be changed
using the CSS
[`caption-side`](/en-US/docs/Web/CSS/caption-side)
and
[`text-align`](/en-US/docs/Web/CSS/text-align)
properties.

## See also

- Other table-related HTML Elements:
  [`<col>`](/en-US/docs/Web/HTML/Element/col),
  [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup),
  [`<table>`](/en-US/docs/Web/HTML/Element/table),
  [`<tbody>`](/en-US/docs/Web/HTML/Element/tbody),
  [`<td>`](/en-US/docs/Web/HTML/Element/td),
  [`<tfoot>`](/en-US/docs/Web/HTML/Element/tfoot),
  [`<th>`](/en-US/docs/Web/HTML/Element/th),
  [`<thead>`](/en-US/docs/Web/HTML/Element/thead),
  [`<tr>`](/en-US/docs/Web/HTML/Element/tr);
- CSS properties that may be specially useful to style the
  [`<caption>`](/en-US/docs/Web/HTML/Element/caption)
  element: [`text-align`](/en-US/docs/Web/CSS/text-align), [`caption-side`](/en-US/docs/Web/CSS/caption-side).
