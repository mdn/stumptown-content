---
title: Multiple video example
width: 640
height: 370
---

This example builds on the last one, offering three different sources for the media; this allows the video to be watched regardless of which video codecs are supported by the browser.

First WebM is tried. If that can't be played, then MP4 is tried. Finally, OGG is tried. A fallback message is displayed if the video tag isn't supported, but not if all sources fail.

```html
<!-- Using multiple sources as fallbacks for a video tag -->
<!-- 'Elephants Dream' by Orange Open Movie Project Studio, licensed under CC-3.0, hosted by archive.org -->
<!-- Poster hosted by Wikimedia -->
<video width="620" controls
  poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg" >
  <source
    src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    type="video/mp4">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
    type="video/ogg">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.avi"
    type="video/avi">
  Your browser doesn't support HTML5 video tag.
</video>
```
