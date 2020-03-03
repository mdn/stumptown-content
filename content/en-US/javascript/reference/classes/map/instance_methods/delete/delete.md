---
recipe: javascript-method
title: 'Map.prototype.delete()'
short_title: delete()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/map-prototype-delete.html
    height: js-standard
examples:
  - examples/simple-example.md
specifications: https://tc39.es/ecma402/#sup-bigint.prototype.tolocalestring
browser_compatibility: javascript.builtins.Map.delete
---
The **`delete()`** method removes the specified element from a `Map` object by key.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <https://github.com/mdn/interactive-examples> and send us a pull request.

## Syntax

```
myMap.delete(key);
```

### Parameters

-   `key`

    The key of the element to remove from the `Map` object.

### Return value

`true` if an element in the `Map` object existed and has been removed, or `false` if the element does not exist.

## See also

-   [`Map`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
