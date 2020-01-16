---
title: Block-level
height: 150
---
In this example we'll change that `<span>` into a block-level element, such as [`<p>`](/en-US/docs/Web/HTML/Element/p).

The `<p>` element totally changes the layout of the text, splitting it into three segments: the text before the `<p>`, then the `<p>`'s text, and finally the text following the `<p>`.

```html
<div>The following paragraph is a <p class="highlight">block-level element;</p>
its background has been colored to display both the beginning and end of
the block-level element's influence.</div>
```

```css
body {
  margin: 0;
  padding: 4px;
  border: 1px solid #333;
}

.highlight {
  background-color:#ee3;
}
```
