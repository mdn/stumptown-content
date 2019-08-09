---
title: '<em>: The Emphasis element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/em
tags:
    group: Inline text semantics
api: HTMLElement
permitted_aria_roles: any
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/em.html
browser_compatibility: html.elements.em
examples:
    - examples/simple-example
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<em>` element** marks text that has stress emphasis. The
`<em>` element can be nested, with each level of nesting indicating a
greater degree of emphasis.

## Overview

The `<em>` element is for words that have a stressed emphasis compared
to surrounding text, which is often limited to a word or words of a
sentence and affects the meaning of the sentence itself.

Typically this element is displayed in italic type. However, it should
not be used simply to apply italic styling; use the CSS
[`font-style`](/en-US/docs/Web/CSS/font-style)
property for that purpose. Use the
[`<cite>`](/en-US/docs/Web/HTML/Element/cite)
element to mark the title of a work (book, play, song, etc.). Use the
[`<i>`](/en-US/docs/Web/HTML/Element/i)
element to mark text that is in an alternate tone or mood, which covers
many common situations for italics such as scientific names or words in
other languages. Use the
[`<strong>`](/en-US/docs/Web/HTML/Element/strong)
element to mark text that has greater importance than surrounding text.

### `<i\>` vs. `<em\>`

New developers are often confused at seeing multiple elements that
produce similar results. `<em>` and `<i>` are a common example, since
they both italicize text. What's the difference? Which should you use?

By default, the visual result is the same. However, the semantic meaning
is different. The `<em>` element represents stress emphasis of its
contents, while the `<i>` element represents text that is set off from
the normal prose, such a foreign word, fictional character thoughts, or
when the text refers to the definition of a word instead of representing
its semantic meaning. (The title of a work, such as the name of a book
or movie, should use `<cite>`.)

This means the right one to use depends on the situation. Neither is for
purely decorative purposes, that's what CSS styling is for.

An example for `<em>` could be: "Just *do* it already!", or: "We
*had* to do something about it". A person or software reading the text
would pronounce the words in italics with an emphasis, using verbal
stress.

An example for `<i>` could be: "The *Queen Mary* sailed last night".
Here, there is no added emphasis or importance on the word "Queen
Mary". It is merely indicated that the object in question is not a
queen named Mary, but a ship named *Queen Mary*. Another example for
`<i>` could be: "The word *the* is an article".

## See also

- [`<i>`](/en-US/docs/Web/HTML/Element/i)
