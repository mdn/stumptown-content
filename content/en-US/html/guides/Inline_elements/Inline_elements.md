---
title: 'Inline elements'
mdn_url: /en-US/docs/Web/HTML/Inline_elements
related_content: /related_content/html.yaml
recipe: guide
---
HTML (**Hypertext Markup Language**) elements historically were categorized as either ["block-level" elements](/en-US/docs/Web/HTML/Block-level_elements) or "inline" elements. Inline elements are those which only occupy the space bounded by the tags defining the element, instead of breaking the flow of the content. In this article, we'll examine HTML inline elements and how they differ from [block-level elements](/en-US/docs/Web/HTML/Block-level_elements).

An inline element does not start on a new line and only takes up as much width as necessary.

## Inline vs. block-level elements: a demonstration

{{{{{embed-example:examples/Inline.md}}}}}

{{{{{embed-example:examples/Block-level.md}}}}}

## Changing element levels

You can change the _visual presentation_ of an element using the CSS [`display`](/en-US/docs/Web/CSS/display) property. For example, by changing the value of `display` from `"inline"` to `"block"`, you can tell the browser to render the inline element in a block box rather than an inline box, and vice versa. However, doing this will not change the _category_ and the _content model_ of the element. For example, even if the `display` of the `span` element is changed to `"block"`, it still would not allow to nest a `div` element inside it.

## Conceptual differences

In brief, here are the basic conceptual differences between inline and block-level elements:

- Content model

    Generally, inline elements may contain only data and other inline elements. You can't put block elements inside inline elements.

- Formatting

    By default, inline elements do not force a new line to begin in the document flow. Block elements, on the other hand, typically cause a line break to occur (although, as usual, this can be changed using CSS).

## List of "inline" elements

The following elements are inline by default (although block and inline elements are no longer defined in HTML 5, use [content categories](/en-US/docs/Web/Guide/HTML/Content_categories) instead):

- [`<a>`](/en-US/docs/Web/HTML/Element/a)
- [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr)
- [`<acronym>`](/en-US/docs/Web/HTML/Element/acronym)
- [`<audio>`](/en-US/docs/Web/HTML/Element/audio) (if it has visible controls)
- [`<b>`](/en-US/docs/Web/HTML/Element/b)
- [`<bdi>`](/en-US/docs/Web/HTML/Element/bdi)
- [`<bdo>`](/en-US/docs/Web/HTML/Element/bdo)
- [`<big>`](/en-US/docs/Web/HTML/Element/big)
- [`<br>`](/en-US/docs/Web/HTML/Element/br)
- [`<button>`](/en-US/docs/Web/HTML/Element/button)
- [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas)
- [`<cite>`](/en-US/docs/Web/HTML/Element/cite)
- [`<code>`](/en-US/docs/Web/HTML/Element/code)
- [`<data>`](/en-US/docs/Web/HTML/Element/data)
- [`<datalist>`](/en-US/docs/Web/HTML/Element/datalist)
- [`<del>`](/en-US/docs/Web/HTML/Element/del)
- [`<dfn>`](/en-US/docs/Web/HTML/Element/dfn)
- [`<em>`](/en-US/docs/Web/HTML/Element/em)
- [`<embed>`](/en-US/docs/Web/HTML/Element/embed)
- [`<i>`](/en-US/docs/Web/HTML/Element/i)
- [`<iframe>`](/en-US/docs/Web/HTML/Element/iframe)
- [`<img>`](/en-US/docs/Web/HTML/Element/img)
- [`<input>`](/en-US/docs/Web/HTML/Element/input)
- [`<ins>`](/en-US/docs/Web/HTML/Element/ins)
- [`<kbd>`](/en-US/docs/Web/HTML/Element/kbd)
- [`<label>`](/en-US/docs/Web/HTML/Element/label)
- [`<map>`](/en-US/docs/Web/HTML/Element/map)
- [`<mark>`](/en-US/docs/Web/HTML/Element/mark)
- [`<meter>`](/en-US/docs/Web/HTML/Element/meter)
- [`<noscript>`](/en-US/docs/Web/HTML/Element/noscript)
- [`<object>`](/en-US/docs/Web/HTML/Element/object)
- [`<output>`](/en-US/docs/Web/HTML/Element/output)
- [`<picture>`](/en-US/docs/Web/HTML/Element/picture)
- [`<progress>`](/en-US/docs/Web/HTML/Element/progress)
- [`<q>`](/en-US/docs/Web/HTML/Element/q)
- [`<ruby>`](/en-US/docs/Web/HTML/Element/ruby)
- [`<s>`](/en-US/docs/Web/HTML/Element/s)
- [`<samp>`](/en-US/docs/Web/HTML/Element/samp)
- [`<script>`](/en-US/docs/Web/HTML/Element/script)
- [`<select>`](/en-US/docs/Web/HTML/Element/select)
- [`<slot>`](/en-US/docs/Web/HTML/Element/slot)
- [`<small>`](/en-US/docs/Web/HTML/Element/small)
- [`<span>`](/en-US/docs/Web/HTML/Element/span)
- [`<strong>`](/en-US/docs/Web/HTML/Element/strong)
- [`<sub>`](/en-US/docs/Web/HTML/Element/sub)
- [`<sup>`](/en-US/docs/Web/HTML/Element/sup)
- [`<svg>`](/en-US/docs/Web/HTML/Element/svg)
- [`<template>`](/en-US/docs/Web/HTML/Element/template)
- [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea)
- [`<time>`](/en-US/docs/Web/HTML/Element/time)
- [`<u>`](/en-US/docs/Web/HTML/Element/u)
- [`<tt>`](/en-US/docs/Web/HTML/Element/tt)
- [`<var>`](/en-US/docs/Web/HTML/Element/var)
- [`<video>`](/en-US/docs/Web/HTML/Element/video)
- [`<wbr>`](/en-US/docs/Web/HTML/Element/wbr)

## See also

- [Block-level elements](/en-US/docs/Web/HTML/Block-level_elements)
- [HTML element reference](/en-US/docs/Web/HTML/Element)
- [`display`](/en-US/docs/Web/CSS/display)
- [Content categories](/en-US/docs/Web/Guide/HTML/Content_categories)
- [Block and Inline Layout in Normal Flow](/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow)
