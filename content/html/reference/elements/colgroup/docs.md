---
title: '<colgroup>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/colgroup
tags:
    group: Table content
api: HTMLTableColElement
permitted_aria_roles: none
tag_omission: yes
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/colgroup.html
    height: html-tall
browser_compatibility: html.elements.colgroup
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<colgroup>` element** defines a group of columns within a table.

## Overview

This element allows styling columns using CSS, but only a few properties
will have an effect on the column ([see the CSS 2.1
specification](https://www.w3.org/TR/CSS21/tables.html#columns) for a
list).

## See also

- Other table-related HTML elements:
  [`<caption>`](/en-US/docs/Web/HTML/Element/caption),
  [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup),
  [`<table>`](/en-US/docs/Web/HTML/Element/table),
  [`<tbody>`](/en-US/docs/Web/HTML/Element/tbody),
  [`<td>`](/en-US/docs/Web/HTML/Element/td),
  [`<tfoot>`](/en-US/docs/Web/HTML/Element/tfoot),
  [`<th>`](/en-US/docs/Web/HTML/Element/th),
  [`<thead>`](/en-US/docs/Web/HTML/Element/thead),
  [`<tr>`](/en-US/docs/Web/HTML/Element/tr);
- CSS properties and pseudo-classes that may be specially useful to
  style the `<col>` element:
  - the
    [`width`](/en-US/docs/Web/CSS/width)
    property to control the width of the column;
  - the
    [`:nth-child`](/en-US/docs/Web/CSS/:nth-child)
    pseudo-class to set the alignment on the cells of the column;
  - the
    [`text-align`](/en-US/docs/Web/CSS/text-align)
    property to align all cells content on the same character
