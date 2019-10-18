---
browser-compatibility: html.elements.table.rules
spec_url: https://html.spec.whatwg.org/multipage/obsolete.html#attr-table-rules
---

# `rules`

This enumerated attribute defines where rules, i.e. lines, should appear in a table.

**Do not use this attribute**. The [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS).

## Values

### `none`

No rules will be displayed. This is the default value.

### `groups`

This will cause the rules to be displayed between row groups (defined by the [`<thead>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead), [`<tbody>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody)
and [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot) elements) and between column groups (defined by the [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col) and [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup) elements) only.

### `rows`

This will cause the rules to be displayed between rows.

### `columns`

This will cause the rules to be displayed between columns.

### `all`

This will cause the rules to be displayed between rows and columns.

## Type

String
