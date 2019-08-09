---
title: '<address>: The Contact Address element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/address
tags:
    group: Content sectioning
api: HTMLElement
permitted_aria_roles:
    - none
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/address.html
browser_compatibility: html.elements.address
examples:
    - examples/simple-address-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<address>` element** indicates that the enclosed HTML
provides contact information for a person or people, or for an
organization.

## Overview

The contact information provided by an `<address>` element\'s contents
can take whatever form is appropriate for the context, and may include
any type of contact information that is needed, such as physical
address, URL, email address, phone number, social media handle,
geographic coordinates, and so forth. The `<address>` element should
include the name of the person, people, or organization to which the
contact information refers.

`<address>` can be used in a variety of contexts, such as providing a
business\'s contact information in the page header, or indicating the
author of an article by including an `<address>` element within the
[`<article>`](/en-US/docs/Web/HTML/Element/article "The HTML <article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry.").

- To represent an arbitrary address, one that is not related to the
  contact information, use a
  [`<p>`](/en-US/docs/Web/HTML/Element/p)
  element rather than the `<address>` element.
- This element should not contain more information than the contact
  information, like a publication date (which belongs in a
  [`<time>`](/en-US/docs/Web/HTML/Element/time)
  element).
- Typically an `<address>` element can be placed inside the
  [`<footer>`](/en-US/docs/Web/HTML/Element/footer)
  element of the current section, if any.

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
  [`<header>`](/en-US/docs/Web/HTML/Element/header);
- [Sections and outlines of an HTML5 document](/en-US/docs/Sections_and_Outlines_of_an_HTML5_document).
