---
title: '<h1>–<h6>: The HTML Section Heading elements'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements
tags:
    group: Content sectioning
api: HTMLHeadingElement
permitted_aria_roles:
    - tab
    - presentation
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/h1-h6.html
browser_compatibility: html.elements.h1
examples:
    - examples/all-headings
    - examples/example-page
attributes:
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<h1>`--`<h6>` elements** represent six levels of section
headings. `<h1>` is the highest section level and `<h6>` is the
lowest.

## Overview

- Heading information may be used by user agents, for example, to
  construct a table of contents for a document automatically.
- Do not use lower levels to decrease heading font size: use the
  [CSS](/en-US/docs/Web/CSS) [`font-size`](/en-US/docs/Web/CSS/font-size)
  property instead.
- Avoid skipping heading levels: always start from `<h1>`, next use
  `<h2>` and so on.
- You should consider avoiding using `<h1>` more than once on a page.
  See [Defining sections](/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Defining_sections)
  in [Using HTML sections and outlines](/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines)
  for more information.

## Accessibility concerns
### Navigation

A common navigation technique for users of screen reading software is
jumping from heading to heading to quickly determine the content of the
page. Because of this, it is important to not skip one or more heading
levels. Doing so may create confusion, as the person navigating this way
may be left wondering where the missing heading is.

#### Don't

```html
<h1>Heading level 1</h1>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
```

#### Do

```html
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
```

#### Nesting

Headings may be nested as subsections to reflect the organization of the
content of the page. Most screen readers can also generate an ordered
list of all the headings on a page, which can help a person quickly
determine the hierarchy of the content:

1. `h1` Beetles
   1. `h2` Etymology
   2. `h2` Distribution and Diversity
   3. `h2` Evolution
      1. `h3` Late Paleozoic
      2. `h3` Jurassic
      3. `h3` Cretaceous
      4. `h3` Cenozoic
   4. `h2` External Morphology
      1. `h3` Head
         1. `h4` Mouthparts
      2. `h3` Thorax
         1. `h4` Prothorax
         2. `h4` Pterothorax
      3. `h3` Legs
      4. `h3` Wings
      5. `h3` Abdomen

When headings are nested, heading levels may be "skipped" when closing
a subsection.

- [Headings • Page Structure • WAI Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [MDN Understanding WCAG, Guideline 1.3 explanations](/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.3_—_Create_content_that_can_be_presented_in_different_ways)
- [Understanding Success Criterion 1.3.1 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html)
- [MDN Understanding WCAG, Guideline 2.4 explanations](/en-US/docs/Web/Accessibility/Understanding_WCAG/Operable#Guideline_2.4_—_Navigable_Provide_ways_to_help_users_navigate_find_content_and_determine_where_they_are)
- [Understanding Success Criterion 2.4.1 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html)
- [Understanding Success Criterion 2.4.6 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)
- [Understanding Success Criterion 2.4.10 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-headings.html)

### Labeling section content

Another common navigation technique for users of screen reading software
is to generate a list of [sectioning
content](/en-US/docs/Web/HTML/Element#Content_sectioning) and use it to
determine the page's layout.

Sectioning content can be labeled using a combination of the
`aria-labelledby` and `id` attributes, with the label concisely
describing the purpose of the section. This technique is useful for
situations where there is more than one sectioning element on the same
page.

#### Example

```.html
<header>
  <nav aria-labelledby="primary-navigation">
    <h2 id="primary-navigation">Primary navigation</h2>
    <!-- navigation items -->
  </nav>
</header>

<!-- page content -->

<footer>
  <nav aria-labelledby="footer-navigation">
    <h2 id="footer-navigation">Footer navigation</h2>
    <!-- navigation items -->
  </nav>
</footer>
```

In this example, screen reading technology would announce that there are
two
[`<nav>`](/en-US/docs/Web/HTML/Element/nav)
sections, one called "Primary navigation" and one called "Footer
navigation". If labels were not provided, the person using screen
reading software may have to investigate each `nav` element's contents
to determine their purpose.

- [Using the `aria-labelledby` attribute](/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [Labeling Regions • Page Structure • W3C WAI Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/page-structure/labels/#using-aria-labelledby)

## See also

- [`<p>`](/en-US/docs/Web/HTML/Element/p)
- [`<div>`](/en-US/docs/Web/HTML/Element/div)
- [`<section>`](/en-US/docs/Web/HTML/Element/section)
