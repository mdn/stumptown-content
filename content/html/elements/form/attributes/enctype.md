---
browser-compatibility: html.elements.form.enctype
---

# enctype

When the value of the `method` attribute is `post`, enctype is the
[MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that
is used to submit the form to the server.

This value can be overridden by a `formenctype` attribute on a
[`<button>`](/en-US/docs/Web/HTML/Element/button) or
[`<input>`](/en-US/docs/Web/HTML/Element/input) element.

## Values

### application/x-www-form-urlencoded

The default value if the attribute is not specified.

### multipart/form-data

The value used for an [`<input>`](/en-US/docs/Web/HTML/Element/input)
element with the `type` attribute set to "file".

### text/plain

## Type

String
