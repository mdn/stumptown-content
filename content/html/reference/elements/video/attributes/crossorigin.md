---
browser-compatibility: html.elements.video.crossorigin
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin
---

# `crossorigin`

This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) can be reused in the `<canvas>` element without being _tainted_.

When not present, the resource is fetched without a CORS request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted used in `<canvas>` elements. If invalid, it is handled as if the enumerated keyword `anonymous` was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.

## Values

### `anonymous`

Sends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.

### `use-credentials`

Sends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.

## Type

String
