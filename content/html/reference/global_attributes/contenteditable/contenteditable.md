---
title: 'contenteditable attribute'
mdn_url: /en-US/docs/Web/HTML/Global_attributes/contenteditable
interactive_example:
  url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/attribute-contenteditable.html
  height: html-short
browser_compatibility: html.global_attributes.contenteditable
specifications: 
 - https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable
 - https://w3c.github.io/contentEditable/#contenteditable
examples: 
  - examples/using-contenteditable
recipe: html-global-attribute
---

## Short description

The `contenteditable` global attribute is an enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing.

## Values

The attribute must take one of the following values:

- `true` or the *empty string*, which indicates that the element must be editable;
- `false`, which indicates that the element must not be editable.

If this attribute is not set, its default value is inherited from its parent element.

## Usage notes

This attribute is an enumerated one and not a Boolean one. This means that the explicit usage of one of the values `true`, `false` or the *empty string* is mandatory and that a shorthand like `<label contenteditable>Example Label</label>` is not allowed. The correct usage is `<label contenteditable="true">Example Label</label>`.

You can set the color used to draw the text insertion [caret](https://developer.mozilla.org/docs/Glossary/caret) with the CSS [`caret-color`](https://developer.mozilla.org/docs/Web/CSS/caret-color) property.

## See also

- [Making content editable](https://developer.mozilla.org/docs/Web/Guide/HTML/Editable_content)
- [`HTMLElement.contentEditable`](https://developer.mozilla.org/docs/Web/API/HTMLElement/contentEditable) and [`HTMLElement.isContentEditable`](https://developer.mozilla.org/docs/Web/API/HTMLElement/isContentEditable)
- The CSS [`caret-color`](https://developer.mozilla.org/docs/Web/CSS/caret-color) property
- `HTMLElement` [`input` event](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event) which also fires for `contenteditable` elements
