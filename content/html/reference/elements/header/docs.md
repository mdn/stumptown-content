---
title: '<header>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/header
tags:
    group: Content sectioning
api: HTMLElement
permitted_aria_roles:
    - group
    - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/header.html
browser_compatibility: html.elements.header
examples:
    - examples/page-header
    - examples/article-header
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<header>` element** represents introductory content,
typically a group of introductory or navigational aids. It may contain
some heading elements but also a logo, a search form, an author name,
and other elements.

## Overview

The `<header>` element is not sectioning content and therefore does not
introduce a new section in the
[outline](/en-US/docs/Sections_and_Outlines_of_an_HTML5_document). That
said, a `<header>` element is intended to usually contain the
surrounding section's heading (an `h1`--`h6` element), but this is
**not** required.

### Historical Usage

Although the `<header>` element didn't make its way into specifications
until HTML 5, it actually existed at the very beginning of HTML. As seen
in [the very first website](http://info.cern.ch/), it was originally
used as the `<head>` element. At some point, it was decided to use a
different name. This allowed `<header>` to be free to fill a different
role later on.

## See also

- Others section-related elements:
  [`<body>`](/en-US/docs/Web/HTML/Element/body),
  [`<nav>`](/en-US/docs/Web/HTML/Element/nav),
  [`<article>`](/en-US/docs/Web/HTML/Element/article),
  [`<aside>`](/en-US/docs/Web/HTML/Element/aside),
  [`<h1>`](/en-US/docs/Web/HTML/Element/h1),
  [`<h2>`](/en-US/docs/Web/HTML/Element/h2),
  [`<h3>`](/en-US/docs/Web/HTML/Element/h3),
  [`<h4>`](/en-US/docs/Web/HTML/Element/h4),
  [`<h5>`](/en-US/docs/Web/HTML/Element/h5),
  [`<h6>`](/en-US/docs/Web/HTML/Element/h6),
  [`<hgroup>`](/en-US/docs/Web/HTML/Element/hgroup),
  [`<footer>`](/en-US/docs/Web/HTML/Element/footer),
  [`<section>`](/en-US/docs/Web/HTML/Element/section),
  [`<address>`](/en-US/docs/Web/HTML/Element/address).
- [Sections and outlines of a HTML5 document](/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document)
