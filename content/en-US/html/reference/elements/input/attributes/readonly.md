---
specifications: https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly
---
# `readonly`

A Boolean attribute which, if present, indicates that the user should not be able to edit the value of the input.

The difference between `disabled` and `readonly` is that read-only controls can still function, whereas disabled controls generally do not function as controls until they are enabled.

**Note:** The `required` attribute is not permitted on inputs with the `readonly` attribute specified.

**Note:** Only text controls can be made read-only, since for other controls (such as checkboxes and buttons) there is no useful distinction between being read-only and being disabled, so the `readonly` attribute does not apply.

## Type

Boolean
