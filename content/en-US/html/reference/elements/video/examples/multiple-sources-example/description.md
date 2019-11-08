---
title: Multiple video example
width: 640
height: 370
---

This example builds on the last one, offering three different sources for the media; this allows the video to be watched regardless of which video codecs are supported by the browser.

First WebM is tried. If that can't be played, then MP4 is tried. Finally, OGG is tried. A fallback message is displayed if the video tag isn't supported, but not if all sources fail.
