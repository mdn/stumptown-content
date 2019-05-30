---
browser-compatibility: html.elements.button.autocomplete
---

# `autocomplete`

The use of this attribute on a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
is nonstandard and Firefox-specific. By default, unlike other
browsers, [Firefox persists the dynamic disabled
state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing)
of a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
across page loads. Setting the value of this attribute to `off`
(i.e. `autocomplete="off"`) disables this feature. See [bug
654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 "if disabled state is changed with javascript, the normal state doesn't return after refreshing the page").

## Values

### `off`

Firefox will not persist the dynamic disabled state of a button across page loads.

## Type

String
