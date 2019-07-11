---
browser-compatibility: html.elements.iframe.sandbox
---

# `sandbox`

Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions.

When the embedded document has the same origin as the embedding page, you are **strongly discouraged** from using both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute --- making it no more secure than not using the `sandbox` attribute at all.

Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` --- such as if the viewer opens the frame in a new tab. Such content should be also served from a *separate origin* to limit potential damage.

## Values

### `allow-forms`

Allows the resource to submit forms. If this keyword is not used, form submission is blocked.

### `allow-modals`

Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).

### `allow-orientation-lock`

Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).

### `allow-pointer-lock`

Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).

### `allow-popups`

Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.

### `allow-popups-to-escape-sandbox`

Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.

### `allow-presentation`

Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).

### `allow-same-origin`

If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin
 policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

### `allow-scripts`

Lets the resource run scripts (but not create popup windows).

### `allow-storage-access-by-user-activation`

Lets the resource request access to the parent's storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).

### `allow-top-navigation`

Lets the resource navigate the top-level browsing context (the one named `_top`).

### `allow-top-navigation-by-user-activation`

Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.

## Type

String
