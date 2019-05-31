## Short description
The **HTML `<table>` element** represents tabular data --- that is,
information presented in a two-dimensional table comprised of rows and
columns of cells containing data.

## Overview

## Usage notes

## Accessibility concerns
### Captions

By supplying a
[`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.")
element whose value clearly and concisely describes the table\'s
purpose, it helps the people decide if they need to read the rest of the
table content or skip over it.

This helps people navigating with the aid of assistive technology such
as a screen reader, people experiencing low vision conditions, and
people with cognitive concerns.

- [MDN Adding a caption to your table with <caption>](/en-US/docs/Learn/HTML/Tables/Advanced#Adding_a_caption_to_your_table_with_%3Ccaption%3E)
- [Caption & Summary • Tables • W3C WAI Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/tables/caption-summary/)

### Scoping rows and columns

Although the `scope` attribute is obsolete in HTML5, many screen readers
rely on the attribute to programmatically replicate the visual
associations a person not using a screen reader may be able to infer
about a cell\'s position.

#### Example

```html
<table>
  <caption>Color names and values</caption>
  <tbody>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">HEX</th>
      <th scope="col">HSLa</th>
      <th scope="col">RGBa</th>
    </tr>
    <tr>
      <th scope="row">Teal</th>
      <td><code>#51F6F6</code></td>
      <td><code>hsla(180, 90%, 64%, 1)</code></td>
      <td><code>rgba(81, 246, 246, 1)</code></td>
    </tr>
    <tr>
      <th scope="row">Goldenrod</th>
      <td><code>#F6BC57</code></td>
      <td><code>hsla(38, 90%, 65%, 1)</code></td>
      <td><code>rgba(246, 188, 87, 1)</code></td>
    </tr>
  </tbody>
</table>
```

Providing a declaration of `scope="col"` on a
[`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)
element will help describe that the cell is at the top of a column.
Providing a declaration of `scope="row"` on a
[`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td)
element will help describe that the cell is the first in a row.

- [MDN Tables for visually impaired users](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced#Tables_for_visually_impaired_users)
- [Tables with two headers • Tables • W3C WAI Web Accessibility
  Tutorials](https://www.w3.org/WAI/tutorials/tables/two-headers/)
- [Tables with irregular headers • Tables • W3C WAI Web Accessibility
  Tutorials](https://www.w3.org/WAI/tutorials/tables/irregular/)
- [H63: Using the scope attribute to associate header cells and data
  cells in data tables \| W3C Techniques for WCAG
  2.0](https://www.w3.org/TR/WCAG20-TECHS/H63.html)

### Complicated tables

Assistive technology such as screen readers may have difficulty parsing tables that are so complex that header cells can't be associated in a strictly horizontal or vertical way. This is typically indicated by the presence of the `colspan` and `rowspan` attributes.

Ideally, consider alternate ways to present the table\'s content,
including breaking it apart into a collection of smaller, related tables
that don't have to rely on using the `colspan` and `rowspan`
attributes. In addition to helping people who use assistive technology
understand the table's content, this may also benefit people with
cognitive concerns who may have difficulty understanding the
associations the table layout is describing.

If the table cannot be broken apart, use a combination of the `id` and
`headers` attributes to programmatically associate each table cell with
the header(s) the cell is associated with.

- [MDN Tables for visually impaired users](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced#Tables_for_visually_impaired_users)
- [Tables with multi-level headers • Tables • W3C WAI Web
  Accessibility
  Tutorials](https://www.w3.org/WAI/tutorials/tables/multi-level/)
- [H43: Using id and headers attributes to associate data cells with
  header cells in data tables \| Techniques for W3C WCAG
  2.0](https://www.w3.org/TR/WCAG20-TECHS/H43.html)

## See also

- Other table-related HTML Elements:
  [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption),
  [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col),
  [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup),
  [`<tbody>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody),
  [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td),
  [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot),
  [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th),
  [`<thead>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead),
  [`<tr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr);
- CSS properties that may be especially useful to style the `<table>` element:
  - [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
    to control the width of the table;
  - [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border),
    [`border-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style),
    [`border-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color),
    [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width),
    [`border-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse),
    [`border-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing)
    to control the aspect of cell borders, rules and frame;
  - [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
    and
    [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
    to style the individual cell content;
  - [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
    and
    [`vertical-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
    to define the alignment of text and cell content.
