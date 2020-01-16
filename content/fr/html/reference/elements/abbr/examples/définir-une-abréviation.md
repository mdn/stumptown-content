---
title: Définir une abréviation
width: 672
height: 192
---
On peut utiliser `<abbr>` avec 
[`<dfn>`](/fr/docs/Web/HTML/Element/dfn) afin de définir, plus formellement, une abréviation.

```html
<p><dfn id="html"><abbr title="HyperText Markup Language">HTML</abbr>
</dfn> est un langage de balises utilisé pour créer la sémantique et la structure d'une page web.</p>

<p>Une <dfn id="spec">spécification</dfn>
(<abbr title="Spécification">spec</abbr>) est un document qui décrit en détails
la façon dont une technologie ou une API doit fonctionner et la façon de 
l'utiliser.</p>
```

```css
abbr {
  font-variant: all-small-caps;
}
```
