---
browser-compatibility: html.elements.base.target
---

# target

A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a browsing context (for example: tab, window, or inline frame). The following keywords have special meanings:

* `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.

* `_blank`: Load the result into a new unnamed browsing context.

* `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.

* `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.

If this attribute is specified, this element must come before any other elements with attributes whose values are URLs.

## Type

String
