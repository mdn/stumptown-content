---
title: Styling input elements
height: 122
---
You can style `<input>` elements using various color-related attributes in particular. One unusual one that is specific to text entry-related elements is the CSS [`caret-color`](/en-US/docs/Web/CSS/caret-color) property, which lets you set the color used to draw the text input caret.

For more information about adding color to elements in HTML, see [Applying color to HTML elements using CSS](/en-US/docs/Web/HTML/Applying_color).

```html
<label for="textInput">Note the red caret:</label>
<input id="textInput" class="custom" size="32">
```

```css
input.custom {
  caret-color: red;
  font: 16px "Helvetica", "Arial", "sans-serif"
}
```
