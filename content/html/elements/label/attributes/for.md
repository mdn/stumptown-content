---
browser-compatibility: html.elements.label.for
---

# for

The `id` of a
[labelable](/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable)
form-related element in the same document as the `<label>` element.
The first element in the document with an `id` matching the value of
the `for` attribute is the *labeled control* for this label element,
if it is a labelable element. If it is not labelable then the `for`
attribute has no effect. If there are other elements which also
match the `id` value, later in the document, they are not
considered.

**Note**: A `<label>` element can have both a `for` attribute and a
contained control element, as long as the `for` attribute points to
the contained control element.

## Type

String
