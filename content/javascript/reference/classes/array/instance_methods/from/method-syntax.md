---
parameters:
    - name: arrayLike
      optional: false
      type: Iterable
    - name: mapFn
      optional: true
      type: Function
    - name: thisArg
      optional: true
      type: Object
return_value:
    - type: Array
---
```
Array.from(arrayLike[, mapFn[, thisArg]])
```

## Parameters

### arrayLike

An array-like or iterable object to convert to an array.

### mapFn

Map function to call on every element of the array.

### thisArg

Value to use as `this` when executing `mapFn`.

## Return value

A new [`Array`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instance.
