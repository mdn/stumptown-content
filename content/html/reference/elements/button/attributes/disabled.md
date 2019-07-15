---
browser-compatibility: html.elements.button.disabled
---

# `disabled`

This Boolean attribute indicates that the user cannot interact with
the button. If this attribute is not specified, the button inherits
its setting from the containing element, for example
[`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset);
if there is no containing element with the **disabled** attribute
set, then the button is enabled.

Firefox will, unlike other browsers, by default, [persist the
dynamic disabled
state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing)
of a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
across page loads. Use the `autocomplete` attribute to control this
feature.

## Type

Boolean
