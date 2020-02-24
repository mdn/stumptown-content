---
recipe: javascript-method
title: 'Map.prototype.forEach()'
short_title: forEach()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/map-prototype-foreach.html
    height: js-standard
examples:
  - examples/simple-example.md
specifications: https://tc39.es/ecma402/#sup-bigint.prototype.tolocalestring
browser_compatibility: javascript.builtins.Map.forEach
---
The `forEach()` method executes a provided function once per each key/value pair in the `Map` object, in insertion order.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <https://github.com/mdn/interactive-examples> and send us a pull request.

## Syntax

```
myMap.forEach(callback[, thisArg])
```

### Parameters

-   `callback`

    Function to execute for each element.

-   `thisArg`

    Value to use as `this` when executing `callback`.

### Return value

[`undefined`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

## Description

The `forEach` method executes the provided `callback` once for each key of the map which actually exist. It is not invoked for keys which have been deleted. However, it is executed for values which are present but have the value `undefined`.

`callback` is invoked with **three arguments**:

-   the element's `value`
-   the element `key`
-   the **`Map` object** being traversed

If a `thisArg` parameter is provided to `forEach`, it will be passed to `callback` when invoked, for use as its `this` value. Otherwise, the value `undefined` will be passed for use as its `this` value. The `this` value ultimately observable by `callback` is determined according to [the usual rules for determining the `this` seen by a function](/en-US/docs/Web/JavaScript/Reference/Operators/this).

Each value is visited once, except in the case when it was deleted and re-added before `forEach` has finished. `callback` is not invoked for values deleted before being visited. New values added before `forEach` has finished will be visited.

`forEach` executes the `callback` function once for each element in the `Map` object. It does not return a value.

## See also

-   [`Array.prototype.forEach()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
-   [`Set.prototype.forEach()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)
