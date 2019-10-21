---
browser-compatibility: html.elements.table.summary
specifications: https://html.spec.whatwg.org/multipage/obsolete.html#attr-table-summary
---

# `summary`

This attribute defines an alternative text that summarizes the content of the table. Typically, it allows visually impaired people who are browsing the web with a Braille screen, to acquire information about the table. If the information added by this attribute is also useful to people who are not visually impaired, consider using the [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.") instead. The summary attribute is not mandatory and may be omitted when a [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.") element fulfills its role.

**Do not use this attribute**.  Instead, choose one of these methods to add a
description of a table:
- Use prose around the table (this method is less semantic).
- Add a description in the table's
  [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)
  element.
- Add a description in a
  [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
  element, inside the table's
  [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)
  element.
- Include the
  [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
  element in a
  [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
  element and add the description in prose next to it.
- Include the
  [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
  element in a
  [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
  element and add the description in prose inside a
  [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)
  element.
- Adjust the table so that a description is not needed (e.g. use
  [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)
  and
  [`<thead>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead)
  elements).

## Type

String
