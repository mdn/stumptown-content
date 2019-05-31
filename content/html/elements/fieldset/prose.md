## Short description

The **HTML `<fieldset>` element** is used to group several controls as
well as labels ([`<label>`](/en-US/docs/Web/HTML/Element/label))
within a web form.

## Overview
The `<fieldset>` element provides a grouping
for a part of an HTML form, with a nested
[`<legend>`](/en-US/docs/Web/HTML/Element/legend)
element providing a caption for the `<fieldset>`. It takes few
attributes, the most notable of which are `form`, which can contain the
`id` of a [`<form>`](/en-US/docs/Web/HTML/Element/form)
on the same page, allowing you to make the `<fieldset>` part of that
`<form>` even if it is not nested inside it, and `disabled`, which
allows you to disable the `<fieldset>` and all its contents in one go.

## Styling with CSS

There are several special styling considerations for `<fieldset>`.

Its [`display`](/en-US/docs/Web/CSS/display)
value is `block` by default, and it establishes a block formatting
context. If the `<fieldset>` is styled with an inline-level `display`
value, it will behave as `inline-block`, otherwise it will behave as
`block`. By default there is a `2px` groove border surrounding the
contents, and a small amount of default padding. The element has
`min-inline-size: min-content` by default.

If a `<legend>` is present, it is placed over the block-start border.
The `<legend>` shrink-wraps, and also establishes a formatting context.
The `display` value is blockified (for example, `display: inline`
behaves as `block`).

There will be an anonymous box holding the contents of the `<fieldset>`,
which inherits certain properties from the `<fieldset>`. If the
`<fieldset>` is styled with `display: grid` or `display: inline-grid`,
then the anonymous box will be a grid formatting context. If the
`<fieldset>` is styled with `display: flex` or `display: inline-flex`,
then the anonymous box will be a flex formatting context. Otherwise it
establishes a block formatting context.

You can feel free to style the `<fieldset>` and `<legend>` in any way
you want to suit your page design.

As of this writing, there are bugs in Microsoft Edge and
Google Chrome which prevent [flexbox](/en-US/docs/Glossary/Flexbox) and
[grid](/en-US/docs/Web/CSS/CSS_Grid_Layout) layouts from being used
inside a
[`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset).
[This GitHub issue](https://github.com/w3c/csswg-drafts/issues/321)
provides bug tracking links.


## See also

- Other form-related elements:
  - [`<form>`](/en-US/docs/Web/HTML/Element/form)
  - [`<legend>`](/en-US/docs/Web/HTML/Element/legend)
  - [`<label>`](/en-US/docs/Web/HTML/Element/label)
  - [`<button>`](/en-US/docs/Web/HTML/Element/button)
  - [`<select>`](/en-US/docs/Web/HTML/Element/select)
  - [`<datalist>`](/en-US/docs/Web/HTML/Element/datalist)
  - [`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup)
  - [`<option>`](/en-US/docs/Web/HTML/Element/option)
  - [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea)
  - [`<keygen>`](/en-US/docs/Web/HTML/Element/keygen)
  - [`<input>`](/en-US/docs/Web/HTML/Element/input)
  - [`<output>`](/en-US/docs/Web/HTML/Element/output)
  - [`<progress>`](/en-US/docs/Web/HTML/Element/progress)
  - [`<meter>`](/en-US/docs/Web/HTML/Element/meter)
