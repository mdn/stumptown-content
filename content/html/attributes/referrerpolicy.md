---
browser-compatibility: html.elements.iframe.referrerpolicy
---

# referrerpolicy

Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame\'s resource:

## Values

### `no-referrer`

The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header will not be sent.

### `no-referrer-when-downgrade`
The  [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header will not be sent to origins
without [`TLS`](https://developer.mozilla.org/en-US/docs/Glossary/TLS) ([`HTTPS`](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS)). This is the default.

### `origin`
The sent referrer will be limited to the [origin](/en-US/docs/Glossary/Origin) of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/Host), and [port](https://developer.mozilla.org/en-US/docs/Glossary/Port).

### `origin-when-cross-origin`
The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.

### `unsafe-url`
The referrer will include the origin *and* the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)).

**This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.

## Type

String
