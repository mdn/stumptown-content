---
recipe: method
title: Array.from()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/array-from.html
    height: js-standard
syntax: method-syntax.md
specifications: https://tc39.es/ecma262/#sec-array.from
browser_compatibility: javascript.builtins.Array.from
examples:
    - examples/array-from-string
    - examples/array-from-set
    - examples/array-from-map
    - examples/array-from-arguments
    - examples/arrow-functions
    - examples/sequence-generator
---

## Short description

The `Array.from()` method creates a new, shallow-copied `Array` instance from an array-like or iterable object.

## Description

`Array.from()` lets you create `Array`s from:

-   array-like objects (objects with a `length` property and indexed elements) or
-   [iterable objects](/en-US/docs/Web/JavaScript/Guide/iterable) (objects where you can get its elements, such as [`Map`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`Set`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)).

`Array.from()` has an optional parameter `mapFn`, which allows you to execute a [`map`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function on each element of the array (or subclass object) that is being created. More clearly,`Array.from(obj, mapFn, thisArg)` has the same result as `Array.from(obj).map(mapFn, thisArg)`, except that it does not create an intermediate array. This is especially important for certain array subclasses, like [typed arrays](/en-US/docs/Web/JavaScript/Typed_arrays), since the intermediate array would necessarily have values truncated to fit into the appropriate type.

The `length` property of the `from()` method is 1.

In ES2015, the class syntax allows for sub-classing of both built-in and user defined classes; as a result, static methods such as `Array.from` are "inherited" by subclasses of `Array` and create new instances of the subclass, not `Array`.

## See also

-   [`Array`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   [`Array.prototype.map()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
-   [`TypedArray.from()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)
