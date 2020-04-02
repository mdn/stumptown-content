---
title: '<article>: The Article Contents element'
short_title: <article>
mdn_url: /en-US/docs/Web/HTML/Element/article
specifications: https://html.spec.whatwg.org/multipage/semantics.html#the-article-element
tags:
    group: Flow content
api: HTMLElement
permitted_aria_roles:
    - application
    - document
    - feed
    - main
    - presentation
    - region
tag_omission: none
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/article.html
    height: html-standard
browser_compatibility: html.elements.article
examples:
    - examples/simple-article-example.md
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<article>` element** represents a self-contained composition
in a document, page, application, or site, which is intended to be
independently distributable or reusable (e.g., in syndication). Examples
include: a forum post, a magazine or newspaper article, or a blog entry.

## Description

A given document can have multiple articles in it; for example, on a
blog that shows the text of each article one after another as the reader
scrolls, each post would be contained in an `<article>` element,
possibly with one or more `<section>`s within.

- Each `<article>` should be identified, typically by including a heading
  ([`<h1>`-`<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
  element) as a child of the `<article>` element.
- When an `<article>` element is nested, the inner element represents
  an article related to the outer element. For example, the comments
  of a blog post can be `<article>` elements nested in the `<article>`
  representing the blog post.
- Author information of an `<article>` element can be provided through
  the [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)
  element, but it doesn't apply to nested `<article>` elements.
- The publication date and time of an `<article>` element can be
  described using the `datetime` attribute of a
  [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
  element. Note that the `pubdate` attribute of
  [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
  is no longer a part of the W3C HTML 5 standard.


## See also

- Other section-related elements:
  [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body),
  [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav),
  [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section),
  [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside),
  [`<h1>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1),
  [`<h2>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2),
  [`<h3>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3),
  [`<h4>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4),
  [`<h5>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5),
  [`<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6),
  [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup),
  [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header),
  [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer),
  [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)
- [Sections and outlines of an HTML5 document](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document)
