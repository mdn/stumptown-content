---
title: Using options
---
The results provided by `toLocaleString` can be customized using the `options` argument.

```js
var bigint = 123456789123456789n;

// request a currency format
console.log(bigint.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
// → 123.456.789.123.456.789,00 €

// the Japanese yen doesn't use a minor unit
console.log(bigint.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }))
// → ￥123,456,789,123,456,789

// limit to three significant digits
console.log(bigint.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
// → 1,23,00,00,00,00,00,00,000
```
