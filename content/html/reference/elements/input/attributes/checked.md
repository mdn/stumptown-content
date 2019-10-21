---
specifications: https://html.spec.whatwg.org/multipage/input.html#attr-input-checked
---
# `checked`

A Boolean attribute indicating whether or not this checkbox is checked by default (when the page loads). It does _not_ indicate whether this checkbox is currently checked: if the checkbox’s state is changed, this content attribute does not reflect the change. (Only the [`HTMLInputElement`’s `checked` IDL attribute](/en-US/docs/Web/API/HTMLInputElement) is updated.)

**Note:** Unlike other input controls, a checkboxes value is only included in the submitted data if the checkbox is currently `checked`. If it is, then the value of the checkbox's `value` attribute is reported as the input's value.

Unlike other browsers, Firefox by default [persists the dynamic checked state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of an `<input>` across page loads. Use the `autocomplete` attribute to control this feature.

## Type

Boolean
