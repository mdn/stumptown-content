---
title: '<html>: The HTML Document / Root element'
short_title: <html>
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/html
tags:
    group: Main root
api: HTMLHtmlElement
permitted_aria_roles: none
tag_omission: yes
browser_compatibility: html.elements.html
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<html>` element** represents the root (top-level element) of
an HTML document, so it is also referred to as the *root element*. All
other elements must be descendants of this element.

## Accessibility concerns

Providing a `lang` attribute with a [valid IETF identifying language
tag](https://www.ietf.org/rfc/bcp/bcp47.txt) on the `html` element will
help screen reading technology determine the proper language to
announce. The identifying language tag should describe the language used
by the majority of the content of the page. Without it, screen readers
will typically default to the operating system's set language, which
may cause mispronunciations.

Including a valid `lang` declaration on the `html` element also ensures
that important metadata contained in the page's
[`<head>`](/en-US/docs/Web/HTML/Element/head),
such as the page's
[`<title>`](/en-US/docs/Web/HTML/Element/title),
are also announced properly.

- [MDN Understanding WCAG, Guideline 3.1 explanations](/en-US/docs/Web/Accessibility/Understanding_WCAG/Understandable#Guideline_3.1_%E2%80%94_Readable_Make_text_content_readable_and_understandable)
- [Understanding Success Criterion 3.1.1 | W3C Understanding WCAG 2.0](https://www.w3.org/TR/2016/NOTE-UNDERSTANDING-WCAG20-20161007/meaning-doc-lang-id.html)

## See also

- MathML top-level element: `<math>`
- SVG top-level element: [`<svg>`](/en-US/docs/Web/SVG/Element/svg)
