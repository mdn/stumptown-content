---
browser-compatibility: html.elements.video.crossorigin
specifications: https://html.spec.whatwg.org/multipage/media.html#attr-media-crossorigin
---

# `crossorigin`

Cet attribut à valeur contrainte indique si le CORS est utilisé afin de récupérer le média. [Les ressources avec CORS activé](/fr/docs/Web/HTML/CORS_enabled_image) peuvent être réutilisées dans un élément `<canvas>` sans _corrompre_ celui-ci.

Lorsque cet attribut est absent, la ressource est récupérée sans requête CORS (c'est-à-dire sans envoyer l'en-tête HTTP `Origin`) et empêche son utilisation « non-corrompue » dans un élément `<canvas>`. Si la valeur de cet attribut est invalide, c'est la valeur `anonymous` qui est utilisée par défaut. Pour plus d'informations, voir [les attributs de paramétrage du CORS](/fr/docs/Web/HTML/CORS_settings_attributes).

## Valeurs

### `anonymous`

Envoie une requête cross-origin sans information d'authentification. Autrement dit, la requête envoyée contient un en-tête HTTP `Origin:` sans cookie, certificat X.509 ou sans faire d'authentification HTTP Basic. Si le serveur ne fournit pas d'information d'authentification au site d'origine (sans l'en-tête `Access-Control-Allow-Origin:`), le média sera considéré comme _corrompue_ et son usage sera restreint.

### `use-credentials`

Envoie une requête cross-origin avec des informations d'authentification. Autrement dit, l'en-tête HTTP `Origin:` est envoyé avec un cookie, un certificat ou effectue une authentification HTTP.  Si le serveur ne fournit pas d'information d'authentification au site d'origine (sans l'en-tête `Access-Control-Allow-Origin:`), le média sera considéré comme _corrompue_ et son usage sera restreint.

## Type

Chaîne de caractères.
