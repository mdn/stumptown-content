---
specifications: https://html.spec.whatwg.org/multipage/input.html#attr-input-value
---
# `value`

The input control's value. When specified in the HTML, this is the initial value, and from then on it can be altered or retrieved at any time using JavaScript to access the respective [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) object's `value` property. The `value` attribute is always optional.

**Note:** Unlike other input controls, checkboxes and radio buttons are only included in the submitted data if the checkbox or radio button is currently `checked`. If it is, then the `value` attribute is reported as the input's value.

For example, if a checkbox whose `name` is `status` has a `value` of `active`, and the checkbox is checked, the form data submitted will include `status=active`. If the checkbox isn't active, it isn't listed in the form data at all. The default `value` for checkboxes and radio buttons is `on`.

## Type

String
