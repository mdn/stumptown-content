---
title: '<input type="checkbox">'
mdn_url: /en-US/docs/Web/HTML/Element/input/checkbox
spec_url: https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/input-checkbox.html
    height: html-standard
browser_compatibility: html.elements.input.input-checkbox
attributes:
    element_specific:
        - ../input/attributes/autofocus.md
        - ../input/attributes/checked.md
        - ../input/attributes/disabled.md
        - ../input/attributes/form.md
        - ../input/attributes/name.md
        - ../input/attributes/readonly-checkbox.md
        - ../input/attributes/required.md
        - ../input/attributes/type.md
        - ../input/attributes/value-checkbox.md
    global: /content/html/global_attributes
examples:
    - examples/Handling_multiple_checkboxes
    - examples/Checking_boxes_by_default
    - examples/Extended_example
recipe: html-input-element
---
## Short description

[`<input>`](/en-US/docs/Web/HTML/Element/input) elements of type **`checkbox`** are rendered by default as boxes that are checked (ticked) when activated, like you might see in an official government paper form.

## Overview

The exact appearance of a checkbox depends upon the operating system configuration under which the browser is running. Generally this is a square but it may have rounded corners. A checkbox allows you to select single values for submission in a form (or not).

[Radio buttons](/en-US/docs/Web/HTML/Element/input/radio) are similar to checkboxes, but with an important distinction — radio buttons are grouped into a set in which only one radio button can be selected at a time, whereas checkboxes allow you to turn single values on and off. Where multiple controls exist, radio buttons allow one to be selected out of them all, whereas checkboxes allow multiple values to be selected.

### Using labels

You can toggle a checkbox by clicking on its associated [`<label>`](/en-US/docs/Web/HTML/Element/label) element as well as on the checkbox itself. This is a really useful feature of HTML form labels that makes it easier to click the option you want, especially on small-screen devices like smartphones.

Beyond accessibility, this is another good reason to properly set up `<label>` elements on your forms.

### Indeterminate state checkboxes

In addition to the checked and unchecked states, there is a third state a checkbox can be in: **indeterminate**. This is a state in which it's impossible to say whether the item is toggled on or off. This is set using the [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) object's `indeterminate` property via JavaScript (it cannot be set using an HTML attribute):

    inputInstance.indeterminate = true;

A checkbox in the indeterminate state has a horizontal line in the box (it looks somewhat like a hyphen or minus sign) instead of a check/tick in most browsers.

There are not many use cases for this property. The most common is when a checkbox is available that "owns" a number of sub-options (which are also checkboxes). If all of the sub-options are checked, the owning checkbox is also checked, and if they're all unchecked, the owning checkbox is unchecked. If any one or more of the sub-options have a different state than the others, the owning checkbox is in the indeterminate state.

If you submit a form with an indeterminate checkbox, the same thing happens as if the form were unchecked — no data is submitted to represent the checkbox.

## Value

A [`DOMString`](/en-US/docs/Web/API/DOMString) representing the value of the checkbox. This is never seen on the client-side, but on the server this is the `value` given to the data submitted with the checkbox's `name`. Take the following example:

    <form>
      <div>
        <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter">
        <label for="subscribeNews">Subscribe to newsletter?</label>
      </div>
      <div>
        <button type="submit">Subscribe</button>
      </div>
    </form>

In this example, we've got a name of `subscribe`, and a value of `newsletter`. When the form is submitted, the data name/value pair will be `subscribe=newsletter`.

If the `value` attribute was omitted, the default value for the checkbox is `on` , so the submitted data in that case would be `subscribe=on`.

**Note**: If a checkbox is unchecked when its form is submitted, there is no value submitted to the server to represent its unchecked state (e.g. `value=unchecked`); the value is not submitted to the server at all.

## Validation

Checkboxes do support [validation](/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) (offered to all [`<input>`](/en-US/docs/Web/HTML/Element/input)s). However, most of the [`ValidityState`](/en-US/docs/Web/API/ValidityState)s will always be `false`. If the checkbox has the `required` attribute, but is not checked, then [`ValidityState.valueMissing`](/en-US/docs/Web/API/ValidityState/valueMissing) will be `true`.

## See also

- [`<input>`](/en-US/docs/Web/HTML/Element/input) and the [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) interface which implements it.
- The [`:checked`](/en-US/docs/Web/CSS/:checked) and [`:indeterminate`](/en-US/docs/Web/CSS/:indeterminate) CSS selectors let you style checkboxes based on their current state
