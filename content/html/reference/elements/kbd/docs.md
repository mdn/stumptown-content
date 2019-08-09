---
title: '<kbd>: The Keyboard Input element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/kbd
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/kbd.html
browser_compatibility: html.elements.kbd
examples:
    - examples/simple-example
    - examples/keystrokes
    - examples/echoed-input
    - examples/onscreen-input
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Keyboard Input element** (**`<kbd>`**) represents a span of
inline text denoting textual user input from a keyboard, voice input, or
any other text entry device.

## Overview

By convention, the [user agent](/en-US/docs/Glossary/user_agent)
defaults to rendering the contents of a `<kbd>` element using its
default monospace font, although this is not mandated by the HTML
standard.

`<kbd>` may be nested in various combinations with the
[`<samp>`](/en-US/docs/Web/HTML/Element/samp)
(Sample Output) element to represent various forms of input or input
based on visual cues.

Other elements can be used in tandem with `<kbd>` to represent more
specific scenarios:

- Nesting a `<kbd>` element within another `<kbd>` element represents
  an actual key or other unit of input as a portion of a larger input.
- Nesting a `<kbd>` element inside a
  [`<samp>`](/en-US/docs/Web/HTML/Element/samp)
  element represents input that has been echoed back to the user by
  the system.
- Nesting a `<samp>` element inside a `<kbd>` element, on the other
  hand, represents input which is based on text presented by the
  system, such as the names of menus and menu items, or the names of
  buttons displayed on the screen.

You can define a custom style to override the browser's default font
selection for the `<kbd>` element, although the user's preferences may
potentially override your CSS.

## See also

- [`<code>`](/en-US/docs/Web/HTML/Element/code)
