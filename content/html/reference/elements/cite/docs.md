---
title: '<cite>: The Citation element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/cite
tags:
    group: Text content
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/cite.html
browser_compatibility: html.elements.cite
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Citation element** (**`<cite>`**) is used to describe a
reference to a cited creative work, and must include either the title or
author or the URL of that work. The reference may be in an
abbreviated form according to context-appropriate conventions related to
citation metadata.

## Overview

In the context of the `<cite>` element, a creative work that might be
cited could be, for example, one of the following:

- A book
- A research paper
- An essay
- A poem
- A musical score
- A song
- A play or film script
- A film
- A television show
- A game
- A sculpture
- A painting
- A theatrical production
- A play
- An opera
- A musical
- An exhibition
- A legal case report
- A computer program
- A web site
- A web page
- A blog post or comment
- A forum post or comment
- A tweet
- A Facebook post
- A written or oral statement

The W3C specification says that a reference to a
creative work, as included within a `<cite>` element, may include the
name of the work's author. However, the WHATWG specification for
`<cite>` says the opposite: that a person's name must *never* be
included, under any circumstances.

To include a reference to the source of quoted material which is
contained within a
[`<blockquote>`](/en-US/docs/Web/HTML/Element/blockquote)
or
[`<q>`](/en-US/docs/Web/HTML/Element/q)
element, use the `cite` attribute on the element.

Typically, browsers style the contents of a `<cite>` element in italics
by default. To avoid this, apply the CSS
[`font-style`](/en-US/docs/Web/CSS/font-style)
property to the `<cite>` element.

## See also

- The element
  [`<blockquote>`](/en-US/docs/Web/HTML/Element/blockquote)
  for long quotations.
- The element
  [`<q>`](/en-US/docs/Web/HTML/Element/q)
  for inline quotations.
