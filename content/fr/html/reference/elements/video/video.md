---
recipe: html-element
title: '<video>'
short_title: <video>
mdn_url: /fr/docs/Web/HTML/Element/video
specifications: https://html.spec.whatwg.org/multipage/media.html#the-video-element
tags:
    group: Image and multimedia
api: HTMLVideoElement
permitted_aria_roles: application
tag_omission: none
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/video.html
    height: html-standard
browser_compatibility: html.elements.video
examples:
    - examples/exemple-simple.md
    - examples/exemple-avec-plusieurs-sources.md
attributes:
    element_specific: ./attributes
    global: /content/fr/html/global_attributes
---

## Description rapide

L'élément **HTML `<video>`** permet d'intégrer des vidéos dans un document et fournit un lecteur média.

## Aperçu

Il est également possible d'utiliser `<video>` pour du contenu audio mais l'élément [`<audio>`](/fr/docs/Web/HTML/Element/audio) sera alors plus pertinent et pourra éventuellement permettre de mieux utiliser ce contenu.

Pour utiliser cet élément, on procède de façon similaire à ce qui est fait pour l'élément [`<img>`](/fr/docs/Web/HTML/Element/img) : on indique un chemin vers le média qu'on souhaite afficher grâce à l'attribut `src` et on inclut d'autres attributs afin d'indiquer d'autres informations telles que la largeur et la hauteur de la vidéo, si on souhaite que la vidéo soit lancée automatiquement, si on souhaite que la lecture recommence automatiquement, si on veut fournir des contrôles différents de ceux du navigateur…

Le contenu à l'intérieur des balises `<video></video>` est affiché par les navigateurs qui ne prennent pas en charge cet élément.

Tous les navigateurs ne prennent pas en charge les mêmes [formats vidéos](/fr/docs/Web/HTML/Supported_media_formats) et il est possible de fournir différentes sources en imbriquant des éléments [`<source>`](/fr/docs/Web/HTML/Element/source) à l'intérieur de l'élément. Le navigateur utilisera alors la première ressource qu'il sait utiliser :

```html
<video controls>
  <source src="myVideo.mp4" type="video/mp4">
  <source src="myVideo.webm" type="video/webm">
  <p>Votre navigateur ne prend pas en charge les vidéos HTML. Voici
     un <a href="myVideo.mp4">lien afin de télécharger la vidéo à la place</a>.</p>
</video>
```

Notes d'utilisation :

- Lorsqu'on indique l'attribut `controls`, les contrôles par défaut du navigateur ne seront pas affichés. Vous pouvez créer vos contrôles spécifiques avec JavaScript et l'API
  [`HTMLMediaElement`](/fr/docs/Web/API/HTMLMediaElement). Voir [Créer un lecteur vidéo pour les différents navigateurs](/fr/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player) pour plus de détails.
- L'API 
  `HTMLMediaElement` déclenche de nombreux 
  [évènements](/fr/docs/Web/Guide/Events/Media_events) qui permettent de manipuler précisément la lecture.
- La propriété [`object-position`](/fr/docs/Web/CSS/object-position) peut être utilisée afin d'ajuster la position de la vidéo au sein du cadre dans lequel elle est affichée. La propriété 
  [`object-fit`](/fr/docs/Web/CSS/object-fit) permet elle de contrôler la façon dont la taille de la vidéo est ajustée pour que celle-ci soit contenue dans le cadre.
- Pour ajouter des sous-titres à une vidéo, on peut utiliser du code 
  JavaScript avec l'élément [`<track>`](/fr/docs/Web/HTML/Element/track) et l'API
  [WebVTT](/fr/docs/Web/API/WebVTT_API). Voir la page [Ajouter des sous-titres à une vidéo](/fr/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)
  pour plus d'informations.

Pour mieux apprendre à utiliser l'élément `<video>`, vous pouvez consulter le tutoriel
[Contenu audio et vidéo](/fr/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content).

### Mise en forme avec CSS

L'élément `<video>` est un élément remplacé. La valeur par défaut de la propriété `display`
pour cet élément est `inline` mais la largeur et la hauteur de la vidéo sont définis à partir de la vidéo intégrée.

Il n'existe pas de contrainte forte pour la mise en forme de `<video>`. Une stratégie fréquemment utilisée consiste à utiliser `display` avec la valeur `block` afin de faciliter le positionnement, le dimensionnement, etc. Ce [guide sur la mise en forme des lecteurs vidéos](/fr/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Video_player_styling_basics)
pourra vous aider à styliser les lecteurs vidéos de vos documents.

### Prise en charge des vidéos côté support

Si le type MIME de la vidéo n'est pas défini correctement sur le serveur, la vidéo pourra ne pas être affichée ou montrer une boîte grise avec une croix (dans le cas où JavaScript est activé.

Si vous utilisez un serveur web Apache afin de servir des vidéos Ogg Theora, vous pouvez résoudre ce problème en ajoutant l'extension du fichier au type MIME "video/ogg". Les types d'extensions les plus fréquemment utilisés sont ".ogm",
".ogv" ou ".ogg". Pour cela, il faudra éditer le fichier "mime.types" situé sous 
"/etc/apache" ou utiliser la directive de configuration `"AddType"` dans le fichier 
`httpd.conf`.

```
AddType video/ogg .ogm
AddType video/ogg .ogv
AddType video/ogg .ogg
```

Si les vidéos sont servies en WebM, vous pouvez ajouter l'extension du fichier au type MIME "video/webm" dans le fichier 
"mime.types" sous "/etc/apache" ou utiliser la directive `"AddType"` dans le fichier `httpd.conf`.

```
AddType video/webm .webm
```

Votre serveur web ou votre hébergeur peuvent fournir une interface graphique permettant la configuration des types MIME.

## Accessibilité

Les vidéos doivent fournir des sous-titres et retranscription qui décrivent précisément le contenu. Les sous-titres doivent permettre au visiteur malentendant de comprendre le contenu audio lorsque la vidéo est lancée. Les retranscriptions sont utilisées par les personnes qui souhaitent relire le contenu audio à un rythme différent.

Si on utilise un service de sous-titrage automatique est utilisé, il est nécessaire de vérifier que le contenu généré correspond bien au contenu audio de la vidéo.

En plus des dialogues, les sous-titres et retranscription doivent également inclure les informations permettant d'identifier la musique et les effets sonores qui communiquent des informations importantes (l'émotion et le ton entre autres) :

```
14
00:03:14 --> 00:03:18
[Musique rock théâtrale]

15 
00:03:19 --> 00:03:21
[Murmure] Qu'est-ce que c'est au loin ?

16
00:03:22 --> 00:03:24
C'est… C'est un…

16 00:03:25 --> 00:03:32
[Bruit de choc]
[La vaisselle se brise]
```

Les sous-titres ne doivent pas masquer le sujet principal de la vidéo. Ils peuvent être positionnés grâce à [l'indication `align`]("/fr/docs/Web/API/WebVTT_API#Cue_settings").

- [Sous-titres et légendes — Plugins](/fr/docs/Plugins/Flash_to_HTML5/Video/Subtitles_captions)
- [Le format Web Video Text Tracks (WebVTT)](/fr/docs/Web/API/WebVTT_API)
- [WebAIM: Sous-titres, transcriptions, descriptions](https://webaim.org/techniques/captions/)
- [Explications de MDN sur les règles 1.2](/fr/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.2_—_Providing_text_alternatives_for_time-based_media)
- [Comprendre les critères de succès 1.2.1 | Explications W3C sur WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html)
- [Comprendre les critères de succès 1.2.2 | Explications W3C sur WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html)

## Voir aussi

- [Formats pris en charge](/fr/docs/Media_formats_supported_by_the_audio_and_video_elements)
- Positionner et dimensionner le cadre pour la vidéo :
  `object-position` et `object-fit`
- `<audio>`
- [Utiliser les éléments audio et vidéo](/fr/docs/Using_HTML5_audio_and_video)
- [Manipuler des vidéos avec le canevas](/fr/docs/Manipulating_video_using_canvas)
- [Configurer les serveurs pour les médias Ogg](/fr/docs/Configuring_servers_for_Ogg_media)
