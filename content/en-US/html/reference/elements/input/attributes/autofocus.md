---
specifications: https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus
---
# `autofocus`

A Boolean attribute which, if present, indicates that the input should automatically have focus when the page has finished loading (or when the [`<dialog>`](/en-US/docs/Web/HTML/Element/dialog) containing the element has been displayed).

**Note:** An element with the `autofocus` attribute may gain focus before the [`DOMContentLoaded`](/en-US/docs/Web/API/DOMContentLoaded) event is fired.

No more than one element in the document may have the `autofocus` attribute, and `autofocus` cannot be used on inputs of type `hidden`, because hidden inputs can't be focused.

**Warning:** Automatically focusing a form control can confuse visually-impaired people using screen-reading technology. When `autofocus` is assigned, screen-readers "teleport" their user to the form control without warning them beforehand.

## Type

Boolean
