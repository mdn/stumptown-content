---
specifications: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fae-form
---
# `form`

A string specifying the [`<form>`](/en-US/docs/Web/HTML/Element/form) element with which the input is associated (that is, its **form owner**). This string's value, if present, must match the `id` of a `<form>` element in the same document. If this attribute isn't specified, the `<input>` element is associated with the nearest containing form, if any.

The `form` attribute lets you place an input anywhere in the document but have it included with a form elsewhere in the document.

**Note:** An input can only be associated with one form.

## Type

String
