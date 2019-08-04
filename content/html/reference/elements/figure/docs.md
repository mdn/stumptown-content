---
title: '<figure>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/figure
tags:
    group: Text content
api: HTMLElement
permitted_aria_roles:
    - group
    - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/figure.html
browser_compatibility: html.elements.figure
examples:
    - examples/images
    - examples/code-snippets
    - examples/quotations
    - examples/poems
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<figure>` element** represents self-contained content,
frequently with a caption
([`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption)),
and is typically referenced as a single unit.

## Overview

- Usually a `<figure>` is an image, illustration, diagram, code
  snippet, etc., that is referenced in the main flow of a document,
  but that can be moved to another part of the document or to an
  appendix without affecting the main flow.
- Being a [sectioning root](/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Sectioning_roots),
  the outline of the content of the `<figure>` element is excluded
  from the main outline of the document.
- A caption can be associated with the `<figure>` element by inserting
  a [`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption)
  inside it (as the first or the last child).

## See also

- The [`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption) element.
