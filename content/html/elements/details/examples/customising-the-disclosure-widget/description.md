---
title: Customizing the disclosure widget
width: 672
height: 192
---
The disclosure triangle itself can be customized, although this is not
as broadly supported. There are variations in how browsers support this
customization due to experimental implementations as the element was
standardized, so we'll have to use multiple approaches for a while.

The
[`<summary>`](/en-US/docs/Web/HTML/Element/summary)
element supports the
[`list-style`](/en-US/docs/Web/CSS/list-style")
shorthand property and its longhand properties, such as
[`list-style-type`](/en-US/docs/Web/CSS/list-style-type),
to change the disclosure triangle to whatever you choose (usually with
[`list-style-image`](/en-US/docs/Web/CSS/list-style-image)).
For example, we can remove the disclosure widget icon by setting
`list-style: none`.

Chrome doesn't support this yet, however, so we also need to use its
non-standard `::-webkit-details-marker`
[pseudo-element](/en-US/docs/Web/CSS/Pseudo-elements) to customize the
appearance in that browser.
