---
---
This code snippet adds a canvas element to your HTML document. A
fallback text is provided if a browser is unable to render the canvas,
or if can't read a canvas. Providing a useful fallback text or sub DOM
helps to [make the the canvas more
accessible](/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility).

Then in the JavaScript code, call
[`HTMLCanvasElement.getContext()`](/en-US/docs/Web/API/HTMLCanvasElement/getContext)
to get a drawing context and start drawing onto the canvas.
