---
browser-compatibility: html.elements.video.preload
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-preload
---

# `preload`

Cet attribut à valeur contrainte fournit une indication au navigateur quant à la façon de charger la vidéo afin que l'utilisateur puisse en profiter au mieux.

S'il n'est pas présent, ce sera la valeur par défaut du navigateur qui sera utilisée. La spécification conseille d'utiliser `metadata` par défaut.

L'attribut `autoplay` a la priorité sur `preload`. Si `autoplay` est fourni, le navigateur devra commencer à télécharger la vidéo pour la lecture.

Cet attribut est une simple indication et la spécification ne contraint pas le navigateur à respecter cette valeur.

## Valeurs

### `none`

Indique que la vidéo ne devrait pas être préchargée.

### `metadata`

Indique que seules les métadonnées de la vidéo (sa durée par exemple) sont récupérées.

### `auto`

Indique que le fichier complet peut être téléchargé, même s'il est possible que l'utilisateur ne l'utilise pas.

### Chaîne vide

Synonyme de la valeur `auto`.

## Type

Chaîne de caractères.
