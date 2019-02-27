<!-- <short-description> -->
The **HTML Inline Frame element (`<iframe>`)** represents a nested
[browsing context](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context), embedding
another HTML page into the current one.
<!-- </short-description> -->

<!-- <overview> -->
Each embedded browsing context has its own session
history. The browsing context that
embeds the others is called the *parent browsing context*. The *topmost*
browsing context --- the one with no parent --- is usually the browser
window, represented by the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object.

Because each browsing context is a complete document environment, every
`<iframe>` in a page requires increased memory and other computing
resources. While theoretically you can use as many `<iframe>`s as you
like, check for performance problems.

As a [replaced element](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element), the
position, alignment, and scaling of the embedded document within the
`<iframe>` element's box, can be adjusted with the
[`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) and [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
properties.
<!-- </overview> -->

<!-- <scripting> -->
Scripting
---------

Inline frames are included in
the [`window.frames`](https://developer.mozilla.org/en-US/docs/Web/API/Window/frames) pseudo-array.

With the DOM [`HTMLIFrameElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement) object, scripts can
access the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object of the framed resource via the
[`HTMLIFrameElement.contentWindow`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow). The [`HTMLIFrameElement.contentDocument`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentDocument) property refers to the `document` inside the
`<iframe>`, same as `contentWindow.document`.

From the inside of a frame, a script can get a reference to its parent
window with [`window.parent`](https://developer.mozilla.org/en-US/docs/Web/API/Window/parent).

Script access to a frame\'s content is subject to the [`same-origin
policy`](https://developer.mozilla.org/en-US/docs/Same_origin_policy_for_JavaScript).
Scripts cannot access most properties in other window objects if the
script was loaded from a different origin, including scripts inside a
frame accessing the frame's parent. Cross-origin communication can be
achieved using [`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
<!-- </scripting> -->

<!-- <accessibility-concerns> -->
People navigating with assistive technology such as a screen reader can
use the [`title`
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) on an `iframe`
to label its content. The title\'s value should concisely describe the
embedded content:

```html
<iframe title="Wikipedia page for Avocados" src="https://en.wikipedia.org/wiki/Avocado"></iframe>
```

Without this title, they have to navigate into the `iframe` to determine
what its embedded content is. This context shift can be confusing and
time-consuming, especially for pages with multiple `<iframe>`s and/or if
embeds contain interactive content like video or audio.
<!-- </accessibility-concerns> -->

<!-- <see-also> -->
<!-- </see-also> -->
