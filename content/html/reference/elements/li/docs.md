---
title: '<li>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/li
tags:
    group: Text content
api: HTMLLIElement
permitted_aria_roles:
    - menuitem
    - menuitemcheckbox
    - menuitemradio
    - option
    - presentation
    - radio
    - separator
    - tab
    - treeitem
tag_omission: yes
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/li.html
browser_compatibility: html.elements.li
examples:
    - examples/simple-example
    - examples/using-value-attribute
    - examples/ul-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<li>` element** is used to represent an item in a list. It
must be contained in a parent element: an ordered list
([`<ol>`](/en-US/docs/Web/HTML/Element/ol)),
an unordered list
([`<ul>`](/en-US/docs/Web/HTML/Element/ul)),
or a menu
([`<menu>`](/en-US/docs/Web/HTML/Element/menu)).

## Overview

In menus and unordered lists, list items are usually displayed using
bullet points. In ordered lists, they are usually displayed with an
ascending counter on the left, such as a number or letter.

## Styling with CSS

Use the
[`list-style-image`](/en-US/docs/Web/CSS/list-style-image),
[`list-style-position`](/en-US/docs/Web/CSS/list-style-position), and
[`list-style-type`](/en-US/docs/Web/CSS/list-style-type)
properties to style list items.

## See also

- Other list-related HTML Elements:
  [`<ul>`](/en-US/docs/Web/HTML/Element/ul),
  [`<ol>`](/en-US/docs/Web/HTML/Element/ol),
  [`<menu>`](/en-US/docs/Web/HTML/Element/menu)
- CSS properties that may be specially useful to style the `<li>`
  element:
  - the [`list-style`](/en-US/docs/Web/CSS/list-style)
    property, to choose the way the ordinal is displayed,
  - [CSS counters](/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters),
    to handle complex nested lists,
  - the [`margin`](/en-US/docs/Web/CSS/margin) property, to control the indent of the list item.
