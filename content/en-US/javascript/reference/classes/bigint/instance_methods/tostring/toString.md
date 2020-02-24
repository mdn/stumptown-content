---
recipe: javascript-method
title: 'BigInt.prototype.toString()'
short_title: toString()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/bigint-tostring.html
    height: js-standard
examples:
    - examples/using-tostring.md
    - examples/negative-zero-bigint.md
specifications: https://tc39.es/ecma262/#sec-bigint.prototype.tostring
browser_compatibility: javascript.builtins.BigInt.toString
---

## Short description

The **`toString()`** method returns a string representing the specified [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object. The trailing "n" is not part of the string.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <https://github.com/mdn/interactive-examples> and send us a pull request.

## Syntax

```
bigIntObj.toString([radix])
```

### Parameters

-   `radix`Optional

    Optional. An integer in the range 2 through 36 specifying the base to use for representing numeric values.

### Return value

A string representing the specified [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object.

### Exceptions

-   [`RangeError`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)

    If `toString()` is given a radix less than 2 or greater than 36, a [`RangeError`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) is thrown.

## Description

The [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object overrides the `toString()` method of the [`Object`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) object; it does not inherit [`Object.prototype.toString()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString). For [`BigInt`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) objects, the `toString()` method returns a string representation of the object in the specified radix.

The `toString()` method parses its first argument, and attempts to return a string representation in the specified radix (base). For radixes above 10, the letters of the alphabet indicate numerals greater than 9. For example, for hexadecimal numbers (base 16) `a` through `f` are used.

If the `radix` is not specified, the preferred radix is assumed to be 10.

If the `bigIntObj` is negative, the sign is preserved. This is the case even if the radix is 2; the string returned is the positive binary representation of the `bigIntObj` preceded by a `-` sign, **not** the two's complement of the `bigIntObj`.

## See also

-   [`BigInt.prototype.toLocaleString()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toLocaleString)
-   [`BigInt.prototype.valueOf()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/valueOf)
-   [`Number.prototype.toString()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
