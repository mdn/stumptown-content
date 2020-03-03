---
recipe: javascript-method
title: 'BigInt.asUintN()'
short_title: asUintN()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/bigint-asuintn.html
    height: js-tall
examples:
    - examples/64-bit-ranges.md
specifications: https://tc39.es/ecma262/#sec-bigint.asuintn
browser_compatibility: javascript.builtins.BigInt.asUintN
---

## Short description

The **`BigInt.asUintN`** static method is used to wrap a `BigInt` value to an unsigned integer between between 0 and `2width-1`.

## Syntax

```
BigInt.asUintN(width, bigint);
```

### Parameters

-   `width`

    The amount of bits available for the integer size.

-   `bigint`

    The integer to clamp to fit into the supplied bits.

### Returns

The value of `bigint` modulo 2`width` as an unsigned integer.

## See also

-   [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
-   [`BigInt.asIntN()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN)
