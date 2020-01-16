---
title: Inline
height: 80
---
In this example, the [`<div>`](/en-US/docs/Web/HTML/Element/div) block-level element contains some text. Within that text is a [`<span>`](/en-US/docs/Web/HTML/Element/span) element, which is an inline element. Because the `<span>` element is inline, the paragraph correctly renders as a single, unbroken text flow.

```html
<div>The following span is an <span class="highlight">inline element</span>;
its background has been colored to display both the beginning and end of
the inline element's influence.</div>
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
