---
title: Specifying colors in stylesheets
height: 192
---
The easiest way to apply color to elements—and the way you'll usually do it—is to simply specify colors in the CSS that's used when rendering elements. While we won't use every single property mentioned previously, we'll look at a couple of examples. The concept is the same anywhere you use color.

In the HTML we use a [`<div>`](/en-US/docs/Web/HTML/Element/div) as a wrapper around the contents, which consists of two more `<div>`s, each styled differently with a single paragraph ([`<p>`](/en-US/docs/Web/HTML/Element/p)) in each box.

In the CSS, the `.wrapper` class is used to assign styles to the [`<div>`](/en-US/docs/Web/HTML/Element/div) that encloses all of our other content. This establishes the size of the container using [`width`](/en-US/docs/Web/CSS/width) and [`height`](/en-US/docs/Web/CSS/height) as well as its [`margin`](/en-US/docs/Web/CSS/margin) and [`padding`](/en-US/docs/Web/CSS/padding).

Of more interest to our discussion here is the use of the [`border`](/en-US/docs/Web/CSS/border) property to establish a border around the outside edge of the element. This border is a solid line, 6 pixels wide, in the color `mediumturquoise`.

The `.box` class establishes the size of each box, as well as the configuration of the font used within. We also take advantage of [CSS Flexbox](/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) to easily center the contents of each box. We enable `flex` mode using [`display: flex`](/en-US/docs/Web/CSS/display), and set both [`justify-content`](/en-US/docs/Web/CSS/justify-content) and [`align-items`](/en-US/docs/Web/CSS/align-items) to `center`. Then we can create a class for each of the two boxes that defines the properties that differ between the two.

The `.boxLeft` class—which, cleverly, is used to style the box on the left—floats the box to the left, then sets up the colors:

- The box's background color is set by changing the value of the CSS [`background-color`](/en-US/docs/Web/CSS/background-color) property to `rgb(245, 130, 130)`.
- An outline is defined for the box. Unlike the more commonly used `border`, [`outline`](/en-US/docs/Web/CSS/outline) doesn't affect layout at all; it draws over the top of whatever may happen to be outside the element's box instead of making room as `border` does. This outline is a solid, dark red line that's two pixels thick. Note the use of the `darkred` keyword when specifying the color.
- Notice that we're not explicitly setting the text color. That means the value of [`color`](/en-US/docs/Web/CSS/color) will be inherited from the nearest containing element that defines it. By default, that's black.

Finally, the `.boxRight` class describes the unique properties of the box that's drawn on the right. It's configured to float the box to the right so that it appears next to the previous box. Then the following colors are established:

- The `background-color` is set using the HSL value specified using `hsl(270deg, 50%, 75%)`. This is a medium purple color.
- The box's `outline` is used to specify that the box should be enclosed in a four pixel thick dashed line whose color is a somewhat deeper purple (`rgb(110, 20, 120)`).
- The foreground (text) color is specified by setting the [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property to `hsl(0deg, 100%, 100%)`. This is one of many ways to specify the color white.
- We add a green wavy line under the text with [`text-decoration`](/en-US/docs/Web/CSS/text-decoration "The text-decoration shorthand CSS property sets the appearance of decorative lines on text.").
- Finally, a bit of a shadow is added to the text using [`text-shadow`](/en-US/docs/Web/CSS/text-shadow "The text-shadow CSS property adds shadows to text. It accepts a comma-separated list of shadows to be applied to the text and any of its decorations."). Its `color` parameter is set to `black`.

```html
<div class="wrapper">
  <div class="box boxLeft">
    <p>
      This is the first box.
    </p>
  </div>
  <div class="box boxRight">
    <p>
      This is the second box.
    </p>
  </div>
</div>
```

```css
.wrapper {
  width: 620px;
  height: 110px;
  margin: 0;
  padding: 10px;
  border: 6px solid mediumturquoise;
}

.box {
  width: 290px;
  height: 100px;
  margin: 0;
  padding: 4px 6px;
  font: 28px "Marker Felt", "Zapfino", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boxLeft {
  float: left;
  background-color: rgb(245, 130, 130);
  outline: 2px solid darkred;
}

.boxRight {
  float: right;
  background-color: hsl(270deg, 50%, 75%);
  outline: 4px dashed rgb(110, 20, 120);
  color: hsl(0deg, 100%, 100%);
  text-decoration: underline wavy #88ff88;
  text-shadow: 2px 2px 3px black;
}
```
