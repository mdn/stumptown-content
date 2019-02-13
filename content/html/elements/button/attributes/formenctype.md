---
browser-compatibility: html.elements.button.formenctype
---

# formenctype

If the button is a submit button, this attribute specifies the type
of content that is used to submit the form to the server. Possible
values are:

If this attribute is specified, it overrides the `enctype` attribute
of the button's form owner.

## Values

### application/x-www-form-urlencoded

The default value if the attribute is not specified.

### multipart/form-data

Use this value if you are using an
[`<input>`](/en-US/docs/Web/HTML/Element/input)
element with the `type` attribute set to `file`.

### text/plain

## Type

String
