---
specifications: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled
---
# `disabled`

A Boolean attribute which, if present, indicates that the user should not be able to interact with the input. Disabled inputs are typically rendered with a dimmer color or using some other form of indication that the field is not available for use.

Specifically, disabled inputs do not receive the `click` event, and disabled inputs are not submitted with the form.

**Note:** Although not required by the specification, Firefox will by default [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of an `<input>` across page loads. Use the `autocomplete` attribute to control this feature.

## Type

Boolean
