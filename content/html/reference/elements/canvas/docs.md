---
title: '<canvas>: The Graphics Canvas element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/canvas
tags:
    group: Scripting
api: HTMLCanvasElement
permitted_aria_roles: any
tag_omission: none
browser_compatibility: html.elements.canvas
examples:
    - examples/simple-example
    - examples/opaque-canvas
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

Use the **HTML `<canvas>` element** with either the [canvas scripting
API](/en-US/docs/Web/API/Canvas_API) or the [WebGL
API](/en-US/docs/Web/API/WebGL_API) to draw graphics and animations.

## Overview

### Alternative content

You may (and should) provide alternate content inside the `<canvas>`
block. That content will be rendered both on older browsers that don't
support canvas and in browsers with JavaScript disabled.

### Required `</canvas>` tag

Unlike the
[`<img>`](/en-US/docs/Web/HTML/Element/img)
element, the
[`<canvas>`](/en-US/docs/Web/HTML/Element/canvas)
element **requires** the closing tag (`</canvas>`).

### Sizing the canvas using CSS versus HTML

The displayed size of the canvas can be changed using CSS, but if you do
this the image is scaled during rendering to fit the styled size, which
can make the final graphics rendering end up being distorted.

It is better to specify your canvas dimensions by setting the `width`
and `height` attributes directly on the `<canvas>` attributes, either
directly in the HTML or by using JavaScript.

### Maximum canvas size

The maximum size of a `<canvas>` element is very large, but the exact
size depends on the browser. The following is some data we've collected
from various tests and other sources (e.g. [Stack
Overflow](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element)):

* Chrome
  * Maximum height: 32,767 pixels
  * Maximum width: 32,767 pixels
  * Maximum area: 268,435,456 pixels (i.e., 16,384 x 16,384)
* Firefox
  * Maximum height: 32,767 pixels
  * Maximum width: 32,767 pixels
  * Maximum area: 472,907,776 pixels (i.e., 22,528 x 20,992)
* Safari
  * Maximum height: 32,767 pixels
  * Maximum width: 32,767 pixels
  * Maximum area: 268,435,456 pixels (i.e., 16,384 x 16,384)
* IE
  * Maximum height: 8,192 pixels
  * Maximum width: 8,192 pixels
  * Maximum area: ?

**Note**: Exceeding the maximum dimensions or area renders the canvas
unusable --- drawing commands will not work.

## Accessibility concerns
### Alternative content

The
[`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
element on its own is just a bitmap and does not provide information
about any drawn objects. Canvas content is not exposed to accessibility
tools like semantic HTML is. In general, you should avoid using canvas
in an accessible website or app. The following guides can help to make
it more accessible.

- [MDN Hit regions and accessibility](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility)
- [Canvas accessibility use cases](https://www.w3.org/WAI/PF/HTML/wiki/Canvas_Accessibility_Use_Cases)
- [Canvas element accessibility issues](https://www.w3.org/html/wg/wiki/AddedElementCanvas)
- [HTML5 Canvas Accessibility in Firefox 13 -- by Steve Faulkner](http://www.paciellogroup.com/blog/2012/06/html5-canvas-accessibility-in-firefox-13/)
- [Best practices for interactive canvas elements](https://html.spec.whatwg.org/multipage/scripting.html#best-practices)

## See also

- [MDN canvas portal](/en-US/docs/Web/API/Canvas_API)
- [Canvas tutorial](/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Canvas cheat sheet](https://simon.html5.org/dump/html5-canvas-cheat-sheet.html)
- [Canvas introduction by Apple](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/Introduction/Introduction.html)
