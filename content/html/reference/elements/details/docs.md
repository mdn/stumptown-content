---
title: '<details>: The Details disclosure element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/details
tags:
    group: Interactive elements
api: HTMLDetailsElement
permitted_aria_roles: none
tag_omission: none
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/details.html
    height: html-shorter
browser_compatibility: html.elements.details
examples:
    - examples/simple-example
    - examples/providing-a-summary
    - examples/open-disclosure-box
    - examples/customising-the-appearance
    - examples/customising-the-disclosure-widget
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description
The **HTML Details Element (`<details>`)** creates a disclosure widget
in which information is visible only when the widget is toggled into an
"open" state. A summary or label can be provided using
the [`<summary>`](/en-US/docs/Web/HTML/Element/summary) element.

## Overview
A disclosure widget is typically presented onscreen using a small
triangle which rotates (or twists) to indicate open/closed status, with
a label next to the triangle. If the first child of the `<details>`
element is a `<summary>`, the contents of the `<summary>` element are
used as the label for the disclosure widget.

A `<details>` widget can be in one of two states. The default *closed*
state displays only the triangle and the label inside `<summary>` (or a
[user agent](/en-US/docs/Glossary/user_agent)-defined
default string if no `<summary>`).

When the user clicks on the
widget, or focuses it then presses the space bar, it "twists" open,
revealing its contents.

From there, you can use CSS to style the disclosure widget, and you can
programmatically open and close the widget by setting/removing its
`open` attribute.

By default when closed, the widget is only tall enough to display the
disclosure triangle and summary. When open, it expands to display the
details contained within.

Unfortunately, at this time there's no built-in way to
animate the transition between open and closed.

Fully standards-compliant implementations automatically apply the CSS
`display`: list-item to the
[`<summary>`](/en-US/docs/Web/HTML/Element/summary)
element.

The common use of a triangle which rotates or twists around to
represent opening or closing the widget is why these are sometimes
called "twisties".

## Events

In addition to the usual events supported by HTML elements, the
`<details>` element supports the `toggle` event, which is dispatched to
the `<details>` element whenever its state changes between open and
closed. It is sent *after* the state is changed, although if the state
changes multiple times before the browser can dispatch the event, the
events are coalesced so that only one is sent.

You can listen for the `toggle` event to detect when the widget changes
state:

```js
details.addEventListener("toggle", event => {
  if (details.open) {
    /* the element was toggled open */
  } else {
    /* the element was toggled closed */
  }
});
```

## See also

- [`<summary>`](/en-US/docs/Web/HTML/Element/summary)
