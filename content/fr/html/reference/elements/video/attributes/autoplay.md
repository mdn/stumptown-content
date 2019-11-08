---
browser-compatibility: html.elements.video.autoplay
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-autoplay
---

# `autoplay`

Un attribut booléen. Lorsqu'il est présent, la lecture de la vidéo recommence au début dès que suffisamment de données ont été chargées pour ne pas interrompre la lecture ultérieurement.

**Note** : Les sites qui utilisent des sons ou des vidéos qui sont lancés automatiquement peuvent déranger les utilisateurs et mieux vaut donc éviter cet attribut dès que possible. Si vous devez fournir une telle fonctionnalité de lecture automatique, il est préférable d'attendre une interaction de l'utilisateur qui autorise cette lecteur. Ceci étant écrit, cet attribut peut être pertinent lorsqu'il s'agit d'élément vidéos créés en script et qui arrivent « plus tard » lors de la navigation de l'utilisateur et que celui-ci peut les contrôler.

`autoplay="false"` ne fonctionnera pas pour désactiver la lecture automatique. Dès que l'attribut est présent (une valeur n'est pas nécessaire), la lecture automatique aura lieu. Pour empêcher la lecture automatique, il faudra retirer l'attribut.

## Type

Booléen
