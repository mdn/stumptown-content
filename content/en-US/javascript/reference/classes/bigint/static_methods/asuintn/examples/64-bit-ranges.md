---
title: Staying in 64-bit ranges
---
The `BigInt.asUintN()` method can be useful to stay in the range of 64-bit arithmetic.

```js
const max = 2n ** 64n - 1n;

BigInt.asUintN(64, max);
// ↪ 18446744073709551615n

BigInt.asUintN(64, max + 1n);
// ↪ 0n
// zero because of overflow
```
