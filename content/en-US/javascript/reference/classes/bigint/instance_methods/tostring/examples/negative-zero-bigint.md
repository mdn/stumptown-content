---
title: Negative-zero `BigInt`
---
There is no negative-zero `BigInt` as there are no negative zeros in integers. `-0.0` is an IEEE floating-point concept that only appears in the JavaScript [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) type.

```js
(-0n).toString();      // '0' 
BigInt(-0).toString(); // '0'
```
