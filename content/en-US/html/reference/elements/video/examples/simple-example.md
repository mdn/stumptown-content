---
title: Simple video example
width: 640
height: 370
---

This example plays a video when activated, providing the user with the browser's default video controls to control playback.

Until the video starts playing, the image provided in the `poster` attribute is displayed in its place. If the browser doesn't support video playback, the fallback text is displayed.

```html
<!-- Simple video example -->
<!-- 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org -->
<!-- Poster from peach.blender.org -->
<video controls
    src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
    width="620">

Sorry, your browser doesn't support embedded videos, 
but don't worry, you can <a href="https://archive.org/details/BigBuckBunny_124">download it</a> 
and watch it with your favorite video player!

</video>
```
