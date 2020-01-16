---
title: Exemple avec plusieurs videos
width: 640
height: 370
---

Test

```html
<!-- Ici on utilise plusieurs sources alternatives pour une vidéo -->
<!-- 'Elephants Dream', de Orange Open Movie Project Studio est sous license CC-3.0 et est hébergé par by archive.org -->
<!-- La vignette est hébergée par Wikimedia -->
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
  Votre navigateur ne prend pas en charge les vidéos HTML.
</video>
```
