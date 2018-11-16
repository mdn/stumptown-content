---
name: preload
type: String
values: none, metadata, auto, empty string
---

# preload

This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience with regards to what content is loaded before the video is played.

 If not set, its default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.

## Values

- `none`

    Indicates that the video should not be preloaded.

- `metadata`

    Indicates that only video metadata (e.g. length) is fetched.
  
- `auto`

    Indicates that the whole video file can be downloaded, even if the user is not expected to use it.

- _empty string_ 

    Synonym of the `auto` value.

 ## Notes

 - The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the video for playback.
 - The specification does not force the browser to follow the value of this attribute; it is a mere hint.
 