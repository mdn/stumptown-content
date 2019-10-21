---
browser-compatibility: html.elements.form.autocomplete
specifications: https://html.spec.whatwg.org/multipage/forms.html#attr-form-autocomplete
---

# `autocomplete`

Indicates whether input elements can by default have their values
automatically completed by the browser. This setting can be
overridden by an `autocomplete` attribute on an element belonging to
the form.

For most modern browsers (including Firefox 38+, Google Chrome 34+,
IE 11+) setting the `autocomplete` attribute will not prevent a
browser's password manager from asking the user if they want to
store login fields (username and password), if the user permits the
storage the browser will autofill the login the next time the user
visits the page. See [The `autocomplete` attribute and login fields](/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).

**Note:** If you set `autocomplete` to `off` in a form because the
document provides its own auto-completion, then you should also set
`autocomplete` to `off` for each of the form's `input` elements
that the document can auto-complete.

## Values

### `off`

The user must explicitly enter a value into each field
for every use, or the document provides its own auto-completion
method; the browser does not automatically complete entries.

### `on`

The browser can automatically complete values based on
values that the user has previously entered in the form.

## Type

String
