# JavaScript reference docs structure specification

This document describes the structure we want to require for JavaScript reference documentation.

## Recipes and ingredients overview

A set of documentation - the JavaScript reference documentation, for example - consists of several different page types, where each type describes the same sort of thing. For example, one page type describes classes, a different type describes methods, and another describes properties.

Different page types will need to contain different elements. For example, pages for JavaScript classes will want to contain lists of links to its members, while pages for a JavaScript method will want to contain a section describing the method syntax.

To reflect this, a "recipe" is a short YAML file that describes at a high level the elements that a particular type of page must have. A recipe provides a list of elements that must appear in the page in the order given. Each distinct type of page must map to a single recipe.

Each element in a recipe is called an "ingredient". Ingredients are often shared across recipes. So for example we have an ingredient called `data.browser_compatibility`, which most recipes will contain. Each ingredient may have particular requirements about how it is represented in the page: for example, to satisfy the `data.browser_compatibility` ingredient a page must include the `{{Compat}}` KumaScript macro.

So at a high level, compliance to a recipe means:

_the items in the page must correspond to the ingredients listed in the recipe, in the correct order, and each item must satisfy the particular requirements for its ingredient_.

### Optional ingredients

A recipe can mark an ingredient as optional by placing a question mark after it, like `prose.description?`. This means that the page does not have to contain a representation of the ingredient, but if it does, the representation must be properly formed according to the ingredient's specification, and the representation must appear in the place specified by the recipe.

Technically, whether an ingredient is optional or not is a separate attribute of the ingredient. This means that a single ingredient may be marked as optional in one recipe and mandatory in a different recipe. In practice, in the JavaScript documentation, this does not occur: there are currently no ingredients that are optional in some recipes and mandatory in others.

### Page sections

Many, but not all, ingredients correspond to sections of a page. A section of a page is defined as a part of the page beginning with an `<h2>` heading and ending with either another `<h2>` or the end of the page.

Sections are identified by an `id` attribute on the `<h2>`. For example, the `prose.description` section starts with an element whose opening tag is like `<h2 id="Description">`. In this document we'll refer to page sections using a notation like `h2#identifier`: for example, `h2#Description`.

## JavaScript recipes

We've defined the following recipes for the JS docs:

- [javascript-class](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-class.yaml)
- [javascript-namespace](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-namespace.yaml)
- [javascript-constructor](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-constructor.yaml)
- [javascript-method](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-method.yaml)
- [javascript-property](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-property.yaml)
- [javascript-error](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-error.yaml)
- [javascript-language-feature](https://github.com/mdn/stumptown-content/blob/master/recipes/javascript-language-feature.yaml)

## JavaScript recipe ingredients

In total these recipes use the following ingredients:

prose ingredients:

- prose.short_description
- prose.description?
- prose.see_also
- prose.syntax
- prose.message
- prose.error_type
- prose.what_went_wrong
- prose.\*

data ingredients:

- data.interactive_example?
- data.constructor
- data.constructor_properties?
- data.static_properties?
- data.static_methods?
- data.instance_properties?
- data.instance_methods?
- data.examples
- data.specifications
- data.browser_compatibility

All ingredients except two are demarcated in the page using an `<h2>` heading. The exceptions are `prose.short_description` and `data.interactive_example`.

### Prose ingredients

With three exceptions, all prose ingredients impose the same requirement on the page: it must have an `<h2>` section whose ID attribute maps to the named section. The mapping is simply that `prose.` is removed, and the first letter is capitalized:

```
prose.syntax      ->    h2#Syntax
prose.see_also    ->    h2#See_also
```

The exceptions are `prose.short_description`, `prose.description?`, and `prose.*`.

#### prose.short_description

This ingredient isn't demarcated by an `<h2>` at all. To satisfy the ingredient, a page must:

- contain a `<p>` element
- that is not a note or a warning
- before the interactive example or the first `<h2>`, whichever comes first

#### prose.description?

This is an optional prose ingredient. To satisfy the ingredient, if the page contains an `h2#Description` section, then it must appear in the place specified by the recipe.

#### prose.\*

This ingredient enables writers to include extra sections that are not explicitly listed in the recipe, while ensuring that the extra sections always appear in the same place in the page. To satisfy this ingredient: if the page contains any `<h2>` headings that are not expected by the recipe, then they must appear at the point in the page that the `prose.*` ingredient is listed in the recipe.

### Data ingredients

Data ingredients typically impose more detailed requirements on pages than prose ingredients.

#### data.interactive_example?

This is an optional data ingredient. To satisfy the ingredient, either:

- the page must not contain a `{{EmbedInteractiveExample}}` macro call, or
- the page must have a `<div>` containing an `{{EmbedInteractiveExample}}` macro call. The `<div>` must be immediately preceded by paragraph that is neither a note nor a warning. The `<div>` must precede any `<h2>`.

#### data.constructor

To satisfy this ingredient, a page must meet the following requirements:

- A section demarcated by `H2#Constructor` that contains only a `<dl>` element.
- The `<dl>` must contain a single `<dt>` followed by a single `<dd>`.
- The `<dt>` must contain either:
  - only a single `<code>` element, that contains only a single `<a>` element
  - only a call to the `{{jsxref}}` macro.
- The `<dd>` must contain `Creates a new <code>NameOfTheObject</code> object.` where `NameOfTheObject` is replaced with the actual name.

#### data.constructor_properties?

This is an optional ingredient. If a page contains a section demarcated by `H2#Constructor_properties`, then it must meet the following requirements:

- Must contain only a `<dl>` element.
- The `<dl>` must contain one or more `<dt><dd>` pairs.
- The `<dt>` must contain either:
  - only a single `<code>` element, that contains only a single `<a>` element
  - only a call to the `{{jsxref}}` macro.
- `<dt><dd>` pairs must be ordered by the alphabetical order of the `<dt><code><a>` text content, or by the display name given in the `{{jsxref}}` macro call.

#### data.static_properties?

This is an optional ingredient. It's just the same as `data.constructor_properties?`, except the section is demarcated by `H2#Static_properties`.

#### data.static_methods?

This is an optional ingredient. It's just the same as `data.constructor_properties?`, except the section is demarcated by `H2#Static_methods`.

#### data.instance_properties?

This is an optional ingredient. It's just the same as `data.constructor_properties?`, except the section is demarcated by `H2#Instance_properties`.

#### data.instance_methods?

This is an optional ingredient. It's just the same as `data.constructor_properties?`, except the section is demarcated by `H2#Instance_methods`.

#### data.examples

To satisfy this ingredient a page must have a section demarcated by `H2#Examples`. It must contain one or more sections demarcated by an H3. Each of these H3 sections represents a single example.

Each example may be a simple example or a live sample. If the example contains a call to the `{{EmbedLiveSample}}` macro, it is a live sample. Otherwise it is a simple example.

Live samples must satisfy certain additional constraints:

- The call to `{{EmbedLiveSample}}` must be the last element in the example (the only exception is that text nodes consisting only of newlines may follow the `{{EmbedLiveSample}}` call). This implies that there may only be one live sample in a given H3 section, and that the iframe showing the output must appear last in the rendered page, after any code or explanatory prose.
- The ID parameter passed to `{{EmbedLiveSample}}` must match the ID of the example's H3 heading. This implies that the example is not allowed to contain any code blocks that are not included in the live sample.

#### data.specifications

To satisfy this ingredient a page must have a section demarcated by `H2#Specifications`. It must contain either a call to the `{{SpecName}}` macro, or a text node containing the text "Not part of any standard.".

#### data.browser_compatibility

To satisfy this ingredient a page must have a section demarcated by `H2#Browser_compatibility`. It must contain a call to the `{{Compat}}` macro.
