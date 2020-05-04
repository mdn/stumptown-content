---
title: '<input type="button">'
mdn_url: /en-US/docs/Web/HTML/Element/input/button
specifications: https://html.spec.whatwg.org/multipage/input.html#button-state-(type=button)
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/input-button.html
    height: html-short
browser_compatibility: html.elements.input.input-button
attributes:
    element_specific:
        - ../input/attributes/autofocus.md
        - ../input/attributes/disabled.md
        - ../input/attributes/form.md
        - ../input/attributes/name.md
        - ../input/attributes/type.md
        - ../input/attributes/value.md
    global: /content/html/global_attributes
examples:
    - examples/A_simple_button.md
    - examples/Adding_keyboard_shortcuts_to_buttons.md
    - examples/Disabling_a_button.md
    - examples/Drawing_app.md
recipe: html-input-element
---
## Short description

[`<input>`](/en-US/docs/Web/HTML/Element/input) elements of type **`button`** are rendered as simple push buttons, which can be programmed to control custom functionality anywhere on a webpage as required when assigned an event handler function (typically for the `click` event).

## Description

While `<input>` elements of type `button` are still perfectly valid HTML, the newer [`<button>`](/en-US/docs/Web/HTML/Element/button) element is now the favored way to create buttons. Given that a [`<button>`](/en-US/docs/Web/HTML/Element/button)’s label text is inserted between the opening and closing tags, you can include HTML in the label, even images.

`<input type="button">` elements have no default behavior (their cousins,`<input type="submit">` and `<input type="reset">` are used to submit and reset forms, respectively). To make buttons do anything, you have to write JavaScript code to do the work.

## Value

An `<input type="button">` elements' `value` attribute contains a [`DOMString`](/en-US/docs/Web/API/DOMString) that is used as the button's label.

    <input type="button" value="Click Me">

## Validation

Buttons don't participate in constraint validation; they have no real value to be constrained.

## See also

- [`<input>`](/en-US/docs/Web/HTML/Element/input) and the [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) interface which implements it.
- The more modern [`<button>`](/en-US/docs/Web/HTML/Element/button) element.
