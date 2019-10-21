---
browser-compatibility: html.elements.video.autoplay
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay
---

# `autoplay`

A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.

**Note**: Sites that automatically play audio (or video with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.

To disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `<video>` tag at all. To remove autoplay the attribute needs to be removed altogether.

## Type

Boolean
