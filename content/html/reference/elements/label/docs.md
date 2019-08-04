---
title: '<label>'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/label
tags:
    group: Forms
api: HTMLLabelElement
permitted_aria_roles: none
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/label.html
browser_compatibility: html.elements.label
examples:
    - examples/simple-example
    - examples/using-for-attribute
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<label>` element** represents a caption for an item in a
user interface.

## Overview

Associating a `<label>` with an input element offers some major
advantages:

- The label text is not only visually associated with its
  corresponding text input; it is programmatically associated with it
  too. This means that, for example, a screenreader will read out the
  label when the user is focused on the form input, making it easier
  for an assistive technology user to understand what data should be
  entered.
- You can click the associated label to focus/activate the input, as
  well as the input itself. This increased hit area provides an
  advantage to anyone trying to activate the input, including those
  using a touch-screen device.

To associate the `<label>` with an `<input>` element, you need to give
the `<input>` an `id` attribute. The `<label>` then needs a `for`
attribute whose value is the same as the input's `id`.

Alternatively, you can nest the `<input>` directly inside the `<label>`,
in which case the `for` and `id` attributes are not needed because the
association is implicit:

```html
<label>Do you like peas?
  <input type="checkbox" name="peas">
</label>
```

- The form control that the label is labeling is called the *labeled
  control* of the label element. One input can be associated with
  multiple labels.
- Labels are not themselves directly associated with forms. They are
  only indirectly associated with forms through the controls with
  which they're associated.
- When a `<label>` is clicked or tapped and it is associated with a
  form control, the resulting `click` event is also raised for the
  associated control.

## Styling with CSS

There are no special styling considerations for `<label>` elements ---
structurally they are simple inline elements, and so can be styled in
much the same way as a
[`<span>`](/en-US/docs/Web/HTML/Element/span)
or
[`<a>`](/en-US/docs/Web/HTML/Element/a)
element. You can apply styling to them in any way you want, as long as
you don't cause the text to become difficult to read.

## Accessibility concerns
### Interactive content

Don't place interactive elements such as
[anchors](/en-US/docs/Web/HTML/Element/a)
or
[buttons](/en-US/docs/Web/HTML/Element/button)
inside a `label`. Doing so makes it difficult for people to activate the
form input associated with the `label`.

#### Don't

```html
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions">
  I agree to the <a href="terms-and-conditions.html">Terms and Conditions</a>
</label>
```

#### Do

```html
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions">
  I agree to the Terms and Conditions
</label>
<p>
  <a href="terms-and-conditions.html">Read our Terms and Conditions</a>
</p>
```

### Headings

Placing [heading elements](/en-US/docs/Web/HTML/Element/Heading_Elements) within a
`<label>` interferes with many kinds of assistive technology, because
headings are commonly used as [a navigation aid](/en-US/docs/Web/HTML/Element/Heading_Elements#Navigation). If the
label's text needs to be adjusted visually, use CSS classes applied to
the `<label>` element instead.

If a [form](/en-US/docs/Web/HTML/Element/form), or a section of a form
needs a title, use the
[`<legend>`](/en-US/docs/Web/HTML/Element/legend)
element placed within a
[`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset).

#### Don't

```html
<label for="your-name">
  <h3>Your name</h3>
  <input id="your-name" name="your-name" type="text">
</label>
```

#### Do

```html
<label class="large-label" for="your-name">
  Your name
  <input id="your-name" name="your-name" type="text">
</label>
```

### Buttons

An [`<input>`](/en-US/docs/Web/HTML/Element/input)
element with a `type="button"` declaration and a valid `value` attribute
does not need a label associated with it. Doing so may actually
interfere with how assistive technology parses the button input. The
same applies for the
[`<button>`](/en-US/docs/Web/HTML/Element/button)
element.

## See also

Other form-related elements:

- [`<form>`](/en-US/docs/Web/HTML/Element/form)
- [`<input>`](/en-US/docs/Web/HTML/Element/input)
- [`<button>`](/en-US/docs/Web/HTML/Element/button)
- [`<datalist>`](/en-US/docs/Web/HTML/Element/datalist)
- [`<legend>`](/en-US/docs/Web/HTML/Element/legend)
- [`<select>`](/en-US/docs/Web/HTML/Element/select)
- [`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup)
- [`<option>`](/en-US/docs/Web/HTML/Element/option)
- [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea)
- [`<keygen>`](/en-US/docs/Web/HTML/Element/keygen)
- [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset)
- [`<output>`](/en-US/docs/Web/HTML/Element/output)
- [`<progress>`](/en-US/docs/Web/HTML/Element/progress)
- [`<meter>`](/en-US/docs/Web/HTML/Element/meter)
