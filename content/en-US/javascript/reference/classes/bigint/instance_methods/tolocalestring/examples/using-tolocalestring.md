---
title: Using toLocaleString
---
In basic use without specifying a locale, a formatted string in the default locale and with default options is returned.

```js
var bigint = 3500n;

bigint.toLocaleString();
// Displays "3,500" if in U.S. English locale
```
