---
title: '<footer>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/footer
tags:
    group: Content sectioning
api: HTMLElement
permitted_aria_roles:
    - group
    - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/footer.html
browser_compatibility: html.elements.footer
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<footer>` element** represents a footer for its nearest
[sectioning content](/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document#Defining_sections)
or [sectioning root](/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document#Sectioning_roots)
element. A footer typically contains information about the author of the
section, copyright data or links to related documents.

## Overview

- Enclose information about the author in an
  [`<address>`](/en-US/docs/Web/HTML/Element/address)
  element that can be included into the `<footer>` element.
- The `<footer>` element is not sectioning content and therefore
  doesn't introduce a new section in the
  [outline](/en-US/docs/Sections_and_Outlines_of_an_HTML5_document).

## Accessibility concerns

The [VoiceOver](https://help.apple.com/voiceover/info/guide/) screen
reader has an issue where the footer [landmark
role](/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#SignpostsLandmarks)
is not announced in the landmark rotor. To address this, add
`role="contentinfo"` to the `footer` element.

- [WebKit Bugzilla: 146930 -- AX: HTML native elements (header,
  footer, main, aside, nav) should work the same as ARIA landmarks,
  sometimes they don't](https://bugs.webkit.org/show_bug.cgi?id=146930)

## See also

- Other section-related elements:
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
  [`<header>`](/en-US/docs/Web/HTML/Element/header),
  [`<section>`](/en-US/docs/Web/HTML/Element/section),
  [`<address>`](/en-US/docs/Web/HTML/Element/address);
- [Sections and outlines of an HTML5 document](/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document).
- [ARIA: `contentinfo` role](/en-US/docs/Web/Accessibility/ARIA/Roles/Contentinfo_role)
