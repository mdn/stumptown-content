---
title: '<button>: The Button element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/button
tags:
    group: Forms
api: HTMLButtonElement
permitted_aria_roles:
    - checkbox
    - link
    - menuitem
    - menuitemcheckbox
    - menuitemradio
    - radio
    - switch
    - tab
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/button.html
browser_compatibility: html.elements.button
examples:
    - examples/simple-example
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<button>` element** represents a clickable button, which
can be used in [forms](/en-US/docs/Learn/HTML/Forms) or anywhere in a
document that needs simple, standard button functionality.

## Overview

By default, HTML buttons are typically presented in a style similar to
that of the host platform the [user agent](/en-US/docs/Glossary/user_agent)
is running on, but you can change the appearance of the button using
[CSS](/en-US/docs/Web/CSS).

`<button>` elements are much easier to style than
[`<input>`](/en-US/docs/Web/HTML/Element/input)
elements. You can add inner HTML content (think `<em>`, `<strong>` or
even `<img>`), and make use of
[`::after`](/en-US/docs/Web/CSS/::after)
and
[`::before`](/en-US/docs/Web/CSS/::before)
pseudo-element to achieve complex rendering while
[`<input>`](/en-US/docs/Web/HTML/Element/input)
only accepts a text value attribute.

If your buttons are not to submit form data to a server, be sure to set
their `type` attribute to `button`. Otherwise they will try to submit
form data and to load the (nonexistent) response, possibly destroying
the current state of the document.

Firefox will, unlike other browsers, by default, [persist the dynamic
disabled
state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing)
of a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
across page loads. Setting the value of the `autocomplete` attribute to
`off` disables this feature. See [bug
654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072).

Firefox <35 for Android sets a default
[`background-image`](/en-US/docs/Web/CSS/background-image)
gradient on all buttons (see [bug
763671](https://bugzilla.mozilla.org/show_bug.cgi?id=763671)).
This can be disabled using `background-image: none`.

## Accessibility concerns
### Icon buttons

Buttons that only use an icon to represent functionality do not have an
accessible name. Accessible names provide a programmatic hook for
assistive technology such as screen readers to access when they parse
the document and generate [an accessibility
tree](/en-US/docs/Learn/Accessibility/What_is_accessibility#Accessibility_APIs).
Assistive technology then uses the accessibility tree to navigate and
manipulate page content.

To give an icon button an accessible name, supply a string of text for
the `<button>` element that concisely describes the button's
functionality.

#### Example

```html
    <button name="favorite" type="button">
      <svg aria-hidden="true" viewBox="0 0 10 10"><path d="M7 9L5 8 3 9V6L1 4h3l1-3 1 3h3L7 6z"/></svg>
      Add to favorites
    </button>
```

If you want to visually hide the button's text, an accessible way to do
so is to use [a combination of
properties](https://gomakethings.com/hidden-content-for-better-a11y/#hiding-the-link)
to remove it visually from the screen but keep it parseable by assistive
technology.

However, it is worth noting that leaving the button text visually
apparent can aid people who may not be familiar with the icon's meaning
or understand the button's purpose. This is especially relevant for
people who are not as technologically sophisticated, or who may have
different cultural interpretations for the imagery the icon button uses.

- [What is an accessible name? | The Paciello Group](https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)
- [MDN Understanding WCAG, Guideline 4.1 explanations](/en-US/docs/Web/Accessibility/Understanding_WCAG/Robust#Guideline_4.1_—_Compatible_Maximize_compatibility_with_current_and_future_user_agents_including_assistive_technologies)
- [Understanding Success Criterion 4.1.2 | W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html)

### Proximity

Large amounts of interactive content - including buttons - placed in
close visual proximity to each other should have space inserted to
separate them. This spacing is beneficial for people who are
experiencing motor control issues, who may accidentally activate the
wrong interactive content.

Spacing may be created using CSS properties such as
[`margin`](/en-US/docs/Web/CSS/margin "The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.").

- [Hand tremors and the giant-button-problem - Axess Lab](https://axesslab.com/hand-tremors/)

### Firefox

Firefox will add a small dotted border on a focused button. This border
is declared through CSS, in the browser stylesheet, but you can override
it if necessary to add your own focused style using
`button::-moz-focus-inner` { }.

If overridden, it is important to ensure that the state change when
focus is moved to the button is high enough that people experiencing low
vision conditions will be able to perceive it.

Color contrast ratio is determined by comparing the luminosity of the
button text and background color values compared to the background the
button is placed on. In order to meet current [Web Content Accessibility
Guidelines (WCAG)](https://www.w3.org/WAI/intro/wcag), a ratio of 4.5:1
is required for text content and 3:1 for larger text such as headings.
Large text is defined as `18.66px` and
[`bold`](/en-US/docs/Web/CSS/font-weight "The documentation about this has not yet been written; please consider contributing!")
or larger, or `24px` or larger.

- [WebAIM: Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Understanding WCAG, Guideline 1.4 explanations](/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.4_Make_it_easier_for_users_to_see_and_hear_content_including_separating_foreground_from_background)
- [Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)

### Clicking and focus

Whether clicking on a
[`<button>`](/en-US/docs/Web/HTML/Element/button)
causes it to (by default) become focused varies by browser and OS. The
results for
[`<input>`](/en-US/docs/Web/HTML/Element/input)
of `type="button"` and `type="submit"` were the same.

**Does clicking on a
  [`<button>`](/en-US/docs/Web/HTML/Element/button)
  give it the focus?**

* On Windows, clicking a button gives it the focus on Firefox, Chrome, and Internet Explorer.

* On macOS, clicking a button gives it the focus on Chrome, but not on Firefox or Safari.

**Does tapping on [`<button>`](/en-US/docs/Web/HTML/Element/button) give it the focus?**

* On iOS, tapping a button does not give it focus on Chrome or Safari.

* On Android, tapping a button does give it focus on Chrome.

## See also

Other elements that are used for creating forms:
[`<form>`](/en-US/docs/Web/HTML/Element/form),
[`<datalist>`](/en-US/docs/Web/HTML/Element/datalist),
[`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset),
[`<input>`](/en-US/docs/Web/HTML/Element/input),[`<keygen>`](/en-US/docs/Web/HTML/Element/keygen),
[`<label>`](/en-US/docs/Web/HTML/Element/label),
[`<legend>`](/en-US/docs/Web/HTML/Element/legend),
[`<meter>`](/en-US/docs/Web/HTML/Element/meter),
[`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup),
[`<option>`](/en-US/docs/Web/HTML/Element/option),
[`<output>`](/en-US/docs/Web/HTML/Element/output),
[`<progress>`](/en-US/docs/Web/HTML/Element/progress),
[`<select>`](/en-US/docs/Web/HTML/Element/select),
[`<textarea>`](/en-US/docs/Web/HTML/Element/textarea).
