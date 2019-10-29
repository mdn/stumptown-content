---
recipe: html-element
title: '<acronym>'
mdn_url: /en-US/docs/Web/HTML/Element/acronym
browser_compatibility: html.elements.acronym
attributes:
  global: /content/html/global_attributes
examples:
  - examples/example
specifications: non-standard
---

## Short description

The HTML Acronym Element (`<acronym>`) allows authors to clearly indicate a sequence of characters that compose an acronym or abbreviation for a word.

## Overview

This element has been removed in HTML5 and shouldn't be used anymore. Instead web developers should use the [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr) element.

## DOM Interface

This element implements the [`HTMLElement`](/en-US/docs/Web/API/HTMLElement) interface.

**Implementation note:** Up to Gecko 1.9.2 inclusive, Firefox implements the [`HTMLSpanElement`](/en-US/docs/Web/API/HTMLSpanElement) interface for this element.

## Styling

Though the purpose of this tag is purely for the convenience of the author, its default styling varies from one browser to another:

-   Some browsers, like Internet Explorer, do not style it differently than a [`<span>`](/en-US/docs/Web/HTML/Element/span) element.
-   Opera, Firefox, Chrome, and some others add a dotted underline to the content of the element.
-   A few browsers not only add a dotted underline, but also put it in small caps; to avoid this styling, adding something like [`font-variant`](/en-US/docs/Web/CSS/font-variant)`: none` in the CSS takes care of this case.

It is therefore recommended that web authors either explicitly style this element, or accept some cross-browser variation.

## Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## See also

-   The [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr) HTML element

