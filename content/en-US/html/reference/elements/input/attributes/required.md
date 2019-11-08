---
specifications: https://html.spec.whatwg.org/multipage/input.html#attr-input-required
---
# `required`

A Boolean attribute which, if present, indicates that the user must specify a value for the input before the owning form can be submitted.

When an input has the `required` attribute, the [`:required`](/en-US/docs/Web/CSS/:required) pseudo-class also applies to it. Conversely, inputs without the `required` attribute (except the elements that don't support it) have the [`:optional`](/en-US/docs/Web/CSS/:optional) pseudo-class applied.

**Note:** Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

## Type

Boolean
