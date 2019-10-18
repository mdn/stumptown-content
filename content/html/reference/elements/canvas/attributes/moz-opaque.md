---
browser-compatibility: html.elements.canvas.moz-opaque
spec_url: non-standard
---

# `moz-opaque`

Lets the canvas know whether or not translucency will be a factor.
If the canvas knows there's no translucency, painting performance
can be optimized. This is only supported by Mozilla-based browsers;
use the standardized
[`canvas.getContext('2d', { alpha: false })`](/en-US/docs/Web/API/HTMLCanvasElement/getContext)
instead.

## Type

Boolean
