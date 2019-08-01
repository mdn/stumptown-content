---
title: '<form>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/form
tags:
    group: Forms
api: HTMLFormElement
permitted_aria_roles:
    - group
    - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/form.html
browser_compatibility: html.elements.form
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<form>` element** represents a document section that
contains interactive controls for submitting information to a web
server.

## Overview

It is possible to use the
[`:valid`](/en-US/docs/Web/CSS/:valid) and [`:invalid`](/en-US/docs/Web/CSS/:invalid)
CSS pseudo-classes to style a `<form>` element based on whether or not
the individual [`elements`](/en-US/docs/Web/API/HTMLFormElement/elements)
within the form are valid.

## See also

- [HTML forms guide](/en-US/docs/Web/Guide/HTML/Forms)
- Other elements that are used when creating forms:
  [`<button>`](/en-US/docs/Web/HTML/Element/button),
  [`<datalist>`](/en-US/docs/Web/HTML/Element/datalist),
  [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset),
  [`<input>`](/en-US/docs/Web/HTML/Element/input),[`<keygen>`](/en-US/docs/Web/HTML/Element/keygen),
  [`<label>`](/en-US/docs/Web/HTML/Element/label),
  [`<legend>`](/en-US/docs/Web/HTML/Element/legend),
  [`<meter>`](/en-US/docs/Web/HTML/Element/meter),
  [`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup),
  [`<option>`](/en-US/docs/Web/HTML/Element/option),
  [`<output>`](/en-US/docs/Web/HTML/Element/output),
  [`<progress>`](/en-US/docs/Web/HTML/Element/progress),
  [`<select>`](/en-US/docs/Web/HTML/Element/select),
  [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea).
- Getting a list of the elements in the form:
  [`HTMLFormElement.elements`](/en-US/docs/Web/API/HTMLFormElement/elements)
- [ARIA: Form role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Form_Role)
- [ARIA: Search role](/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role)
