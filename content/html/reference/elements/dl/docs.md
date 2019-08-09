---
title: '<dl>: The Description List element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/dl
tags:
    group: Text content
api: HTMLDListElement
permitted_aria_roles:
  - group
  - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/dl.html
browser_compatibility: html.elements.dl
examples:
    - examples/single-term-and-description
    - examples/multiple-terms-single-description
    - examples/single-term-multiple-descriptions
    - examples/metadata
    - examples/wrapping-name-value-groups
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<dl>`** element represents a description list. The element
encloses a list of groups of terms (specified using the
[`<dt>`](/en-US/docs/Web/HTML/Element/dt)
element) and descriptions (provided by
[`<dd>`](/en-US/docs/Web/HTML/Element/dd)
elements). Common uses for this element are to implement a glossary or
to display metadata (a list of key-value pairs).

## Overview

Do not use this element (or
[`<ul>`](/en-US/docs/Web/HTML/Element/ul)
elements) to merely create indentation on a page. Although it works,
this is a bad practice and obscures the meaning of description lists.

To change the indentation of a description term, use the
[CSS](/en-US/docs/CSS) [`margin`](/en-US/docs/Web/CSS/margin)
property.

## See also

- [`<dt>`](/en-US/docs/Web/HTML/Element/dt) element
- [`<dd>`](/en-US/docs/Web/HTML/Element/dd) element
