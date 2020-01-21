---
title: Simple video example
width: 640
height: 370
---

Cet exemple joue une vidéo lorsqu'il est activé et fournit les contrôles par défaut du navigateur à l'utilisateur afin que ce dernier puisse contrôler la lecture.

Tant que la lecture n'a pas démarré, c'est l'image fournie par l'attribut `poster` qui est affichée à la place de la vidéo. Si le navigateur ne permet pas de lire la vidéo, c'est le texte alternatif qui est affiché.

```html
<!-- Un exemple simple d'utilisation d'une vidéo -->
<!-- 'Big Buck Bunny' est sous license CC 3.0 pour la Fondation Blender. Le contenu est hébergé sur archive.org -->
<!-- Vignette récupérée depuis peach.blender.org -->
<video controls
    src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
    width="620">

Désolé, votre navigateur ne prend pas en charge les vidéos HTML. 
Pas de souci, vous pouvez <a href="https://archive.org/details/BigBuckBunny_124">la télécharger</a> 
et la lire avec votre lecteur favori !

</video>
```
