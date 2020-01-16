---
title: "<abbr> : L'élément pour les abréviation"
short_title: <abbr>
mdn_url: /fr/docs/Web/HTML/Element/abbr
specifications: https://html.spec.whatwg.org/multipage/semantics.html#the-abbr-element
tags:
    group: Inline text semantics 
api: HTMLElement
permitted_aria_roles:
    - any
tag_omission: none
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/abbr.html
    height: html-short
browser_compatibility: html.elements.abbr
examples:
    - examples/baliser-une-abréviation.md
    - examples/mettre-en-forme-une-abréviation.md
    - examples/fournir-une-forme-étendue.md
    - examples/définir-une-abréviation.md
attributes:
    global: /content/fr/html/global_attributes
recipe: html-element
---

## Description rapide

L'élément **HTML `<abbr>`** permet de représenter une abréviation ou un acronyme.

## Aperçu

L'article *[Comment baliser les abréviations afin de les rendre compréhensibles](/fr/Learn/HTML/Howto/Mark_abbreviations_and_make_them_understandable)*
est un guide pour apprendre à utiliser `<abbr>` et les éléments associés.

### Cas d'usage

Il n'est pas nécessaire que toutes les abréviations soient balisées avec
`<abbr>`. En revanche, dans certains cas, mieux vaut utiliser cet élément :

- Lorsqu'une abréviation est utilisée et qu'on veut fournir la forme étendue, sans
  perturber le flux du texte, on utilisera `<abbr>`
  avec l'attribut `title`.
- Pour définir une abréviation qui pourrait être étrangère à l'utilisateur, on utilisera
  `<abbr>` avec un attribut `title` ou on fournira la définition dans le texte.
- Lorsqu'on doit noter la présence d'une abréviation pour des raisons sémantiques, on
  utilisera l'élément `<abbr>`. Cela permettra en outre de mettre en forme ou d'utiliser
  JavaScript sur ces éléments.
- On peut utiliser `<abbr>` de concert avec 
  [`<dfn>`](/fr/docs/Web/HTML/Element/dfn)
  afin d'établir les définitions des abréviations ou des acronymes présents. Voir l'exemple [Définir une abréviation](#Définir_une_abréviation) ci-après.

### Considérations grammaticales

Pour les langues avec un nombre grammatical, on utilisera le même nombre pour l'attribut `title` et l'élément `<abbr>`. Cela est utile pour les langues qui possèdent plus de deux formes pour le pluriel (tel que l'arabe).

### L'attribut title

L'attribut `title` permet de fournir une forme étendue ou une description d'une abréviation. Lorsqu'il est présent, cet attribut doit contenir la description complète et rien d'autre.

## Accessibilité

Il est utile d'expliciter un acronyme ou une abréviation lorsqu'elle est utilisée pour la première fois das un document. Cela permet aux lecteurs de comprendre le texte, notamment si le terme est technique ou s'il fait partie d'un jargon.

### Exemple

``` {.brush: .html}
<p>JavaScript Object Notation (<abbr>JSON</abbr>) est un format léger pour l'échange de données.</p>
```

Cet élément est notamment utile pour les personnes pour lesquelles l'abréviation ou l'acronyme leur est étranger.

## Texte des attributs

L'attribut `title` possède ici une sémantique spécifique. Avec `<abbr>`, cet attribut *doit* contenir une description complète, lisible par un humain de l'abréviation. Ce texte est généralement représenté par les navigateurs avec une bulle d'information qui s'affiche lorsque le curseur survole le texte.

Chaque élément `<abbr>` est indépendant des autres. Fournir un attribut `title` à l'un ne reliera pas l'explication aux autres abréviations qui ont le même texte.

## Mise en forme par défaut

Tous les navigateurs affichent cet élément en incise (*inline*) 
([`display`](/fr/docs/Web/CSS/display)`: inline`)
par défaut, bien que la mise en forme par défaut varie légèrement d'un navigateur à l'autre:

- Pour certains navigateurs, comme Internet Explorer, la mise en forme n'est pas différente d'un élément
  [`<span>`](/fr/docs/Web/HTML/Element/span).
- Opera, Firefox et d'autres soulignent le contenu de l'élément avec des pointillés.
- Quelques navigateurs ajoutent des pointillés pour souligner et mettent le texte en petites majuscules. Pour éviter cette mise en forme, on pourra utiliser 
  [`font-variant`](/fr/docs/Web/CSS/font-variant)`: none`.

## Voir aussi

- [Utiliser l'élément `<abbr>`](/fr/Learn/HTML/Element/abbr)
- D'autres éléments portant [une sémantique textuelle](/fr/docs/Web/HTML/Text_level_semantics_conveying_elements):
  [`<a>`](/fr/docs/Web/HTML/Element/a),
  [`<em>`](/fr/docs/Web/HTML/Element/em),
  [`<strong>`](/fr/docs/Web/HTML/Element/strong),
  [`<small>`](/fr/docs/Web/HTML/Element/small),
  [`<cite>`](/fr/docs/Web/HTML/Element/cite),
  [`<q>`](/fr/docs/Web/HTML/Element/q),
  [`<dfn>`](/fr/docs/Web/HTML/Element/dfn),
  [`<time>`](/fr/docs/Web/HTML/Element/time),
  [`<code>`](/fr/docs/Web/HTML/Element/code),
  [`<var>`](/fr/docs/Web/HTML/Element/var),
  [`<samp>`](/fr/docs/Web/HTML/Element/samp),
  [`<kbd>`](/fr/docs/Web/HTML/Element/kbd),
  [`<sub>`](/fr/docs/Web/HTML/Element/sub),
  [`<sup>`](/fr/docs/Web/HTML/Element/sup),
  [`<b>`](/fr/docs/Web/HTML/Element/b),
  [`<i>`](/fr/docs/Web/HTML/Element/i),
  [`<mark>`](/fr/docs/Web/HTML/Element/mark),
  [`<ruby>`](/fr/docs/Web/HTML/Element/ruby),
  [`<rp>`](/fr/docs/Web/HTML/Element/rp),
  [`<rt>`](/fr/docs/Web/HTML/Element/rt),
  [`<bdo>`](/fr/docs/Web/HTML/Element/bdo),
  [`<span>`](/fr/docs/Web/HTML/Element/span),
  [`<br>`](/fr/docs/Web/HTML/Element/br),
  [`<wbr>`](/fr/docs/Web/HTML/Element/wbr).
- L'élément obsolète [`<acronym>`](/fr/docs/Web/HTML/Element/acronym)
  dont le rôle a été fusionné avec `<abbr>`
