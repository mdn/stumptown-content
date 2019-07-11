---
browser-compatibility: html.elements.button.formmethod
---

# `formmethod`

If the button is a submit button, this attribute specifies the HTTP
method that the browser uses to submit the form.

If specified, this attribute overrides the `method` attribute of the
button's form owner.

## Values

### `post`

The data from the form are included in the body of the
form and sent to the server.

### `get`

The data from the form are appended to the **form**
attribute URI, with a '?' as a separator, and the resulting
URI is sent to the server. Use this method when the form has no
side-effects and contains only ASCII characters.

## Type

String
