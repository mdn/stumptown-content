---
recipe: javascript-class
title: 'BigInt'
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
class_constructor: /content/en-US/javascript/reference/classes/bigint/bigint
static_methods: /content/en-US/javascript/reference/classes/bigint/static_methods
instance_methods: /content/en-US/javascript/reference/classes/bigint/instance_methods
examples:
    - examples/calculating_primes.md
specifications: https://tc39.es/ecma262/#sec-bigint-objects
browser_compatibility: javascript.builtins.BigInt
---

## Short description

**`BigInt`** is a built-in object that provides a way to represent whole numbers larger than 253 - 1, which is the largest number JavaScript can reliably represent with the [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) primitive. **`BigInt`** can be used for arbitrarily large integers.

## Description

A `BigInt` is created by appending `n` to the end of an integer literal — `10n` — or by calling the function `BigInt()`.

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991");
// ↪ 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// ↪ 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
// ↪ 9007199254740991n
```

`BigInt` is similar to [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) in some ways, but also differs in a few key matters — it cannot be used with methods in the built-in [`Math`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object and cannot be mixed with instances of `Number` in operations; they must be coerced to the same type. Be careful coercing values back and forth, however, as the precision of a `BigInt` may be lost when it is coerced to a `Number`.

### Type information

When tested against `typeof`, a `BigInt` will give `"bigint"`:

```js
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true
```

When wrapped in an `Object`, a `BigInt` will be considered as a normal "object" type:

```js
typeof Object(1n) === 'object'; // true
```

### Operators

The following operators may be used with `BigInt`s (or object-wrapped `BigInt`s): `+`, `*`, `-`, `**`, `%`. [Bitwise operators](/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) are supported as well, except `>>>` (zero-fill right shift) as all `BigInt` objects are signed. Also unsupported is the unary operator (`+`), [in order to not break asm.js](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs).

```js
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
// ↪ 9007199254740991

const maxPlusOne = previousMaxSafe + 1n;
// ↪ 9007199254740992n
 
const theFuture = previousMaxSafe + 2n;
// ↪ 9007199254740993n, this works now!

const multi = previousMaxSafe * 2n;
// ↪ 18014398509481982n

const subtr = multi – 10n;
// ↪ 18014398509481972n

const mod = multi % 10n;
// ↪ 2n

const bigN = 2n ** 54n;
// ↪ 18014398509481984n

bigN * -1n
// ↪ –18014398509481984n
```

The `/` operator also works as expected with whole numbers. However, since these are `BigInt`s and not `BigDecimal`s, this operation will round towards 0, which is to say, it will not return any fractional digits.

An operation with a fractional result will be truncated when used with a `BigInt.`

```js
const expected = 4n / 2n;
// ↪ 2n

const rounded = 5n / 2n;
// ↪ 2n, not 2.5n
```

### Comparisons

A `BigInt` is not strictly equal to a [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), but it is loosely so:

```js
0n === 0
// ↪ false

0n == 0
// ↪ true
```

A [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) and a `BigInt` may be compared as usual:

```js
1n < 2
// ↪ true

2n > 1
// ↪ true

2 > 2
// ↪ false

2n > 2
// ↪ false

2n >= 2
// ↪ true
```

They may be mixed in arrays and sorted:

```js
const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
// ↪  [4n, 6, -12n, 10, 4, 0, 0n]

mixed.sort();
// ↪ [-12n, 0, 0n, 4n, 4, 6, 10]
```

Note that comparisons with `Object`-wrapped `BigInt`s act as with other objects, only indicating equality when the same object instance is compared:

```js
0n === Object(0n); // false
Object(0n) === Object(0n); // false

const o = Object(0n);
o === o // true
```

### Conditionals

A `BigInt` behaves like a [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) in cases where it is converted to a [`Boolean`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean): via the [`Boolean`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) function; when used with [logical operators](/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) `||`, `&&`, and `!`; or within a conditional test like an [`if`](/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement.

```js
if (0n) {
  console.log('Hello from the if!');
} else {
  console.log('Hello from the else!');
}

// ↪ "Hello from the else!"

0n || 12n
// ↪ 12n

0n && 12n
// ↪ 0n

Boolean(0n)
// ↪ false

Boolean(12n)
// ↪ true

!12n
// ↪ false

!0n
// ↪ true
```

## Usage recommendations

### Coercion

Because coercing between [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) and `BigInt` can lead to loss of precision, it is recommended to only use `BigInt` when values greater than 253 are reasonably expected and not to coerce between the two types.

### Cryptography

The operations supported on `BigInt`s are not constant time. `BigInt` is therefore [unsuitable for use in cryptography](https://www.chosenplaintext.ca/articles/beginners-guide-constant-time-cryptography.html).

### Use within JSON

Using [`JSON.stringify()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) with any `BigInt` value will raise a `TypeError` as `BigInt` values aren't serialized in JSON by default. However, you can implement your own `toJSON` method if needed:

```js
BigInt.prototype.toJSON = function() { return this.toString(); }
```

Instead of throwing, `JSON.stringify` now produces a string like this:

```js
JSON.stringify(BigInt(1));
// '"1"'
```

## See also

-   [`Number`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
