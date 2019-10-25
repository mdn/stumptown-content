---
title: border
mdn-url: https://developer.mozilla.org/docs/Web/CSS/border
recipe: css-property
interactive-example: https://interactive-examples.mdn.mozilla.net/pages/css/border.html
formal-syntax: '<line-width> || <line-style> || <color>'
shorthand-for:
    - border-width
    - border-style
    - border-color
animatable:
initial-value:
browser-compatibility: css.properties.border
examples:
    - examples/simple-example
---

## Short description

The **`border`** [CSS](/en-US/docs/CSS) property sets an element's
border.

## Overview

It's a [shorthand](/en-US/docs/Web/CSS/Shorthand_properties)
for [`border-width`](/en-US/docs/Web/CSS/border-width),
[`border-style`](/en-US/docs/Web/CSS/border-style),
and [`border-color`](/en-US/docs/Web/CSS/border-color).

As with all shorthand properties, any omitted sub-values will be set to
their [initial value](/en-US/docs/Web/CSS/initial_value). Importantly,
`border` cannot be used to specify a custom value for
[`border-image`](/en-US/docs/Web/CSS/border-image),
but instead sets it to its initial value, i.e., `none`.

The `border` shorthand is especially useful when you want all four
borders to be the same. To make them different from each other, however,
you can use the longhand
[`border-width`](/en-US/docs/Web/CSS/border-width),
[`border-style`](/en-US/docs/Web/CSS/border-style),
and
[`border-color`](/en-US/docs/Web/CSS/border-color)
properties, which accept different values for each side. Alternatively,
you can target one border at a time with the physical (e.g.,
[`border-top`](/en-US/docs/Web/CSS/border-top)
) and logical (e.g.,
[`border-block-start`](/en-US/docs/Web/CSS/border-block-start))
border properties.

### Borders vs. outlines

Borders and [outlines](/en-US/docs/Web/CSS/outline) are very similar.
However, outlines differ from borders in the following ways:

- Outlines never take up space, as they are drawn outside of an
  element's content.
- According to the spec, outlines don't have to be rectangular,
  although they usually are.

## Example syntax
```.css
/* style */
border: solid;

/* width | style */
border: 2px dotted;

/* style | color */
border: outset #f33;

/* width | style | color */
border: medium dashed green;

/* Global values */
border: inherit;
border: initial;
border: unset;
```

## Syntax overview
The `border` property may be specified using one, two, or three of the
values listed below. The order of the values does not matter.

The border will be invisible if its style is not defined. This
is because the style defaults to `none`.
