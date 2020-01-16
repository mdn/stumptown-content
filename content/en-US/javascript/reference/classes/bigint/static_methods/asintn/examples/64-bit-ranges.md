---
title: Staying in 64-bit ranges
---
The `BigInt.asIntN()` method can be useful to stay in the range of 64-bit arithmetic.

```js
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max);
// ↪ 9223372036854775807n

BigInt.asIntN(64, max + 1n);
// ↪ -9223372036854775807n
// negative because of overflow
```
