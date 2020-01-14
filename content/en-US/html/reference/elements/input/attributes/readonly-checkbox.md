---
specifications: https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly
---
# `readonly`

A Boolean attribute indicating whether or not the value of this checkbox can be changed by the user. Note that since the value of the checkbox is not exposed by the browser to the user this attribute only changes the appearance of the checkbox, typically by displaying with a gray rather than black outline and gray rather than white background when not checked. However this attribute does not apply to the checked state of the attribute, which can still be altered by the user. If you also want to prevent the user from changing the checked state of the element you must also specify the disabled attribute. However if you do specify the disabled attribute in order to prevent the user from changing the checked state note that the value of the element will not be passed to the application when the form is submitted.

## Type

Boolean
