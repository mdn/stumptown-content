---
title: border-block-start-width
mdn-url: https://developer.mozilla.org/docs/Web/CSS/border-block-start-width
recipe: css-property
interactive-example: https://interactive-examples.mdn.mozilla.net/pages/css/border-block-start-width.html
formal-syntax: '<'border-top-width'>'
animatable:
initial-value:
browser-compatibility: css.properties.border-block-start-width
examples:
    - examples/simple-example
---

## Short description

The **`border-block-start-width`** [CSS](/en-US/docs/Web/CSS)
property defines the width of the logical block-start border of an
element, which maps to a physical border width depending on the
element's writing mode, directionality, and text orientation.

## Overview

It corresponds to the
[`border-top-width`](/en-US/docs/Web/CSS/border-top-width),
[`border-right-width`](/en-US/docs/Web/CSS/border-right-width),
[`border-bottom-width`](/en-US/docs/Web/CSS/border-bottom-width),
or
[`border-left-width`](/en-US/docs/Web/CSS/border-left-width)
property depending on the values defined for
[`writing-mode`](/en-US/docs/Web/CSS/writing-mode),
[`direction`](/en-US/docs/Web/CSS/direction),
and
[`text-orientation`](/en-US/docs/Web/CSS/text-orientation).

## Example syntax
```
/* <'border-width'> values */
border-block-start-width: 5px;
border-block-start-width: thick;
```

## Syntax overview
Related properties are
[`border-block-end-width`](/en-US/docs/Web/CSS/border-block-end-width),
[`border-inline-start-width`](/en-US/docs/Web/CSS/border-inline-start-width),
and
[`border-inline-end-width`](/en-US/docs/Web/CSS/border-inline-end-width),
which define the other border widths of the element.


## See also

- This property maps to one of the physical border properties:
  [`border-top-width`](/en-US/docs/Web/CSS/border-top-width),
  [`border-right-width`](/en-US/docs/Web/CSS/border-right-width),
  [`border-bottom-width`](/en-US/docs/Web/CSS/border-bottom-width),
  and
  [`border-left-width`](/en-US/docs/Web/CSS/border-left-width)
- [`writing-mode`](/en-US/docs/Web/CSS/writing-mode),
  [`direction`](/en-US/docs/Web/CSS/direction),
  [`text-orientation`](/en-US/docs/Web/CSS/text-orientation)
