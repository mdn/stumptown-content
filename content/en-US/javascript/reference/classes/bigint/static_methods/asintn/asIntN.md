---
recipe: javascript-method
title: 'BigInt.asIntN()'
short_title: asIntN()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/bigint-asintn.html
    height: js-tall
examples:
    - examples/64-bit-ranges.md
specifications: https://tc39.es/ecma262/#sec-bigint.asintn
browser_compatibility: javascript.builtins.BigInt.asIntN
---

## Short description

The **`BigInt.asIntN`** static method is used to wrap a `BigInt` value to a signed integer between -`2width-1` and `2width-1-1`.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <https://github.com/mdn/interactive-examples> and send us a pull request.

## Syntax

```
BigInt.asIntN(width, bigint);
```

### Parameters

-   `width`

    The amount of bits available for the integer size.

-   `bigint`

    The integer to clamp to fit into the supplied bits.

### Returns

The value of `bigint` modulo 2`width` as a signed integer.

## See also

-   [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
-   [`BigInt.asUintN()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN)
