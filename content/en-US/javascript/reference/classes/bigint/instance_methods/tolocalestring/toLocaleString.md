---
recipe: javascript-method
title: 'BigInt.prototype.toLocaleString()'
short_title: toLocaleString()
mdn_url: /en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toLocaleString
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/js/bigint-tolocalestring.html
    height: js-standard
examples:
    - examples/using-tolocalestring.md
    - examples/using-locales.md
    - examples/using-options.md
specifications: https://tc39.es/ecma402/#sup-bigint.prototype.tolocalestring
browser_compatibility: javascript.builtins.BigInt.toLocaleString
---

## Short description

The **`toLocaleString()`** method returns a string with a language-sensitive representation of this `BigInt`.

## Syntax

```
bigIntObj.toLocaleString([locales [, options]])
```

### Parameters

The `locales` and `options` arguments customize the behavior of the function and let applications specify the language whose formatting conventions should be used. In implementations that ignore the `locales` and `options` arguments, the locale used and the form of the string returned are entirely implementation-dependent.

-   `locales` Optional

    A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the [`Intl` page](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation). The following Unicode extension key is allowed:

    -   `nu`

        The numbering system to be used. Possible values include: `"arab"`, `"arabext"`, `"bali"`, `"beng"`, `"deva"`, `"fullwide"`, `"gujr"`, `"guru"`, `"hanidec"`, `"khmr"`, `"knda"`, `"laoo"`, `"latn"`, `"limb"`, `"mlym"`, `"mong"`, `"mymr"`, `"orya"`, `"tamldec"`, `"telu"`, `"thai"`, `"tibt"`.

-   `options` Optional

    An object with some or all of the following properties:

    -   `localeMatcher`

        The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see the [`Intl` page](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).

    -   `style`

        The formatting style to use. Possible values are `"decimal"` for plain number formatting, `"currency"` for currency formatting, and `"percent"` for percent formatting; the default is `"decimal"`.

    -   `currency`

        The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `"USD"` for the US dollar, `"EUR"` for the euro, or `"CNY"` for the Chinese RMB — see the [Current currency & funds code list](http://www.currency-iso.org/en/home/tables/table-a1.html). There is no default value; if the `style` is `"currency"`, the `currency` property must be provided.

    -   `currencyDisplay`

        How to display the currency in currency formatting. Possible values are `"symbol"` to use a localized currency symbol such as €, `"code"` to use the ISO currency code, `"name"` to use a localized currency name such as `"dollar"`; the default is `"symbol"`.

    -   `useGrouping`

        Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are `true` and `false`; the default is `true`.

    The following properties fall into two groups: `minimumIntegerDigits`, `minimumFractionDigits`, and `maximumFractionDigits` in one group, `minimumSignificantDigits` and `maximumSignificantDigits` in the other. If at least one property from the second group is defined, then the first group is ignored.

    -   `minimumIntegerDigits`

        The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.

    -   `minimumFractionDigits`

        The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the [ISO 4217 currency code list](http://www.currency-iso.org/en/home/tables/table-a1.html) (2 if the list doesn't provide that information).

    -   `maximumFractionDigits`

        The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of `minimumFractionDigits` and 3; the default for currency formatting is the larger of `minimumFractionDigits` and the number of minor unit digits provided by the [ISO 4217 currency code list](http://www.currency-iso.org/en/home/tables/table-a1.html) (2 if the list doesn't provide that information); the default for percent formatting is the larger of `minimumFractionDigits` and 0.

    -   `minimumSignificantDigits`

        The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.

    -   `maximumSignificantDigits`

        The maximum number of significant digits to use. Possible values are from 1 to 21; the default is 21.

### Return value

A string with a language-sensitive representation of the given `BigInt`.

## Performance

When formatting large numbers of numbers, it is better to create a [`NumberFormat`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) object and use the function provided by its [`NumberFormat.format`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/format) property.

## See also

-   [`BigInt.toString()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString)
