---
title: Picking a color
height: 317
---
Let's look at a simple example, in which the user can choose a color. As the user adjusts the color, the border around the example changes to reflect the new color. After finishing up and picking the final color, the color picker's value is displayed.

On macOS, you indicate that you've finalized selection of the color by closing the color picker window.

The HTML here creates a box that contains a color picker control (with a label created using the [`<label>`](/en-US/docs/Web/HTML/Element/label "The HTML &lt;label> element represents a caption for an item in a user interface.") element) and an empty paragraph element ([`<p>`](/en-US/docs/Web/HTML/Element/p "The HTML &lt;p> element represents a paragraph.")) into which we'll output some text from our JavaScript code.

The CSS simply establishes a size for the box and some basic styling for appearances. The border is also established with a 2-pixel width and a border color that won't last, courtesy of the JavaScript...

The JavaScript here handles the task of updating the starting color of the border to match the color picker's value. Then two event handlers are added to deal with input from the `<input type="color">` element.

The `input` event is sent every time the value of the element changes; that is, every time the user adjusts the color in the color picker. Each time this event arrives, we set the box's border color to match the color picker's current value.

The `change` event is received when the color picker's value is finalized. We respond by setting the contents of the `<p>` element with the ID `"output"` to a string describing the finally selected color.

```html
<div id="box">
  <label for="colorPicker">Border color:</label>
  <input type="color" value="#8888ff" id="colorPicker">
  <p id="output"></p>
</div>
```

```css
#box {
  width: 500px;
  height: 200px;
  border: 2px solid rgb(245, 220, 225);
  padding: 4px 6px;
  font: 16px "Lucida Grande", "Helvetica", "Arial", "sans-serif"
}
```

```js
let colorPicker = document.getElementById("colorPicker");
let box = document.getElementById("box");
let output = document.getElementById("output");

box.style.borderColor = colorPicker.value;

colorPicker.addEventListener("input", function(event) {
  box.style.borderColor = event.target.value;
}, false);

colorPicker.addEventListener("change", function(event) {
  output.innerText = "Color set to " + colorPicker.value + ".";
}, false);
```
