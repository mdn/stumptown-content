---
title: '<code>: The Inline Code element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/code
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/code.html
browser_compatibility: html.elements.code
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<code>` element** displays its contents styled in a fashion
intended to indicate that the text is a short fragment of computer
code. By default, the content text is displayed using the
[user agent's](/en-US/docs/Glossary/user_agent) default monospace font.

## Overview

To represent multiple lines of code, wrap the `<code>` element within a
[`<pre>`](/en-US/docs/Web/HTML/Element/pre)
element. The `<code>` element by itself only represents a single phrase
of code or line of code.

A CSS rule can be defined for the `code` selector to override the
browser's default font face. Preferences set by the user might take
precedence over the specified CSS.

## See also

- [`<samp>`](/en-US/docs/Web/HTML/Element/samp)
- [`<kbd>`](/en-US/docs/Web/HTML/Element/kbd)
- [`<command>`](/en-US/docs/Web/HTML/Element/command)
  (deprecated)
- [`<var>`](/en-US/docs/Web/HTML/Element/var)
- [`<pre>`](/en-US/docs/Web/HTML/Element/pre)
