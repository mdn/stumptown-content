---
browser-compatibility: html.elements.button.form
specifications: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form
---

# `form`

The form element that the button is associated with (its *form
owner*). The value of the attribute must be the **id** attribute of
a
[`<form>`](/en-US/docs/Web/HTML/Element/form)
element in the same document. If this attribute is not specified,
the `<button>` element will be associated to an ancestor
[`<form>`](/en-US/docs/Web/HTML/Element/form)
element, if one exists. This attribute enables you to associate
`<button>` elements to
[`<form>`](/en-US/docs/Web/HTML/Element/form)
elements anywhere within a document, not just as descendants of
[`<form>`](/en-US/docs/Web/HTML/Element/form)
elements.

## Type

String
