---
title: transform
mdn_url: /en-US/docs/Web/CSS/transform
recipe: css-property
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/css/transform.html
formal_syntax: 'none | <transform-list>'
animatable: true
initial_value: none
browser_compatibility: css.properties.transform
examples:
    - examples/simple-example.md
---

## Short description

The **`transform`** [CSS](/en-US/docs/Web/CSS) property lets you rotate,
scale, skew, or translate an element.

## Description

This property modifies the coordinate space
of the CSS [visual formatting
model](/en-US/docs/Web/CSS/Visual_formatting_model).

If it has a value different than `none`, a [stacking
context](/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
will be created. In that case, the object will act as a containing block
for any `position: fixed` elements that it contains.

Only elements positioned by the [box
model](/en-US/docs/Web/CSS/CSS_Box_Model) can be `transform`ed. As a
rule of thumb, an element is positioned by the box model if it has
`display: block`.

## Example syntax

```.css
/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: translate(12px, 50%);
transform: translate3d(12px, 50%, 3em);
transform: translateX(2em);
transform: translateY(3in);
transform: translateZ(2px);
transform: scale(2, 0.5);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.3);
transform: rotate(0.5turn);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: perspective(17px);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);

/* Global values */
transform: inherit;
transform: initial;
transform: unset;
```

## Syntax overview

The `transform` property may be specified as either the keyword value
`none` or as one or more `<transform-function>` values.

## See also
- [Using CSS transforms](/en-US/docs/CSS/Using_CSS_transforms)
- [`<transform-function>`](/en-US/docs/Web/CSS/transform-function) data type
