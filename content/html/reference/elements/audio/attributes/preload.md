---
browser-compatibility: html.elements.audio.preload
---

# `preload`

This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience.

The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.

The browser is not forced by the specification to follow the value of this attribute; it is a mere hint.

If not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises that it should be set to `metadata`.

## Values

### `none`

Indicates that the audio should not be preloaded.

### `metadata`

Indicates that only audio metadata (e.g. length) is fetched.

### `auto`

Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.
An empty string is a synonym for the `auto` value.

## Type

String
