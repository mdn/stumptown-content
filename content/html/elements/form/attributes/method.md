---
browser-compatibility: html.elements.form.method
---

# `method`

The [HTTP](/en-US/docs/Web/HTTP) method that the browser uses to
submit the form.

This value can be overridden by a `formmethod` attribute on a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
or
[`<input>`](/en-US/docs/Web/HTML/Element/input)
element.

## Values

### `post`

Corresponds to the HTTP [POST
method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5)
; form data are included in the body of the form and sent to the
server.

### `get`

Corresponds to the HTTP [GET
method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3);
form data are appended to the `action` attribute URI with a
'?' as separator, and the resulting URI is sent to the server.
Use this method when the form has no side-effects and contains
only ASCII characters.

### `dialog`

Use when the form is inside a
[`<dialog>`](/en-US/docs/Web/HTML/Element/dialog)
element to close the dialog when submitted.

## Type

String
