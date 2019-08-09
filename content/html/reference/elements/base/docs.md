---
title: '<base>: The Document Base URL element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/base
tags:
    group: Document metadata
api: HTMLBaseElement
permitted_aria_roles: none
tag_omission: no-closing-tag
browser_compatibility: html.elements.base
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<base>` element** specifies the base URL to use for all
relative URLs contained within a document. There can be only one
`<base>` element in a document.

## Overview

The base URL of a document can be queried from a script using
[`document.baseURI`](/en-US/docs/Web/API/Document/baseURI).

If multiple `<base>` elements are specified, only the first `href` and
first `target` value are used; all others are ignored.
