---
title: Array from an Array-like object (arguments)
---
```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [ 1, 2, 3 ]
```
