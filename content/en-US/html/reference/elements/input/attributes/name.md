---
specifications: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name
---
# `name`

A string specifying a name for the input control. This name is submitted along with the control's value when the form data is submitted, as well as with the owning [`<form>`](/en-US/docs/Web/HTML/Element/form) element's [`elements`](/en-US/docs/Web/API/HTMLFormElement/elements) object.

When an input element is given a `name`, that name becomes a property of the owning form element's [`HTMLFormElement.elements`](/en-US/docs/Web/API/HTMLFormElement/elements) property. That means if you have an input whose `name` is set to `guest` and another whose `name` is `hat-size`, the following code can be used:

    let form = document.querySelector("form");
    let guestName = form.elements.guest;
    let hatSize = form.elements["hat-size"];

When this code has run, `guestName` will be the [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) for the `guest` field, and `hatSize` the object for the `hat-size` field.

**Warning:** You should avoid giving form elements a `name` that corresponds to a built-in property of the form, since you would then override the predefined property or method with this reference to the corresponding input.

The name `_charset_` has a special meaning. If used as the name of an `<input>` element of type `hidden`, the input's `value` is automatically set by the [user agent](/en-US/docs/Glossary/user_agent) to the character encoding being used to submit the form.

If no `name` is specified, or `name` is empty, the input's value is not submitted with the form.

**Note:** For historical reasons, the name `isindex` is not allowed. If you really want to know why, see [Naming form controls: the `name` attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name) in the HTML specification.

## Type

String
