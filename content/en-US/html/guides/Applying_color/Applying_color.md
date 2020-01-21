---
title: Applying color to HTML elements using CSS
mdn_url: /en-US/docs/Web/HTML/Applying_color
related_content: /related_content/html.yaml
recipe: guide
---
The use of color is a fundamental form of human expression. Children experiment with color before they even have the manual dexterity to draw. Maybe that's why color is one of the first things people often want to experiment with when learning to develop websites. With [CSS](/en-US/docs/Web/CSS), there are lots of ways to add color to your [HTML](/en-US/docs/Web/HTML) [elements](/en-US/docs/Web/HTML/Element) to create just the look you want. This article is a primer introducing each of the ways CSS color can be used in HTML.

Fortunately, adding color to your HTML is actually really easy to do, and you can add color to nearly anything.

We're going to touch on most of what you'll need to know when using color, including a [list of what you can color and what CSS properties are involved](#Things_that_can_have_color), [how you describe colors](#How_to_describe_a_color), and how to actually [use colors both in stylesheets and in scripts](#Using_color). We'll also take a look at how to [let the user pick a color](#Letting_the_user_picka_color).

Then we'll wrap things up with a brief discussion of how to [use color wisely](#Using_color_wisely): how to select appropriate colors, keeping in mind the needs of people with differing visual capabilities.

## Things that can have color

At the element level, everything in HTML can have color applied to it. Instead, let's look at things in terms of the kinds of things that are drawn in the elements, such as text and borders and so forth. For each, we'll see a list of the CSS properties that apply color to them.

At a fundamental level, the [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property defines the foreground color of an HTML element's content and the [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property defines the element's background color. These can be used on just about any element.

### Text

Whenever an element is rendered, these properties are used to determine the color of the text, its background, and any decorations on the text.

- [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.")

    The color to use when drawing the text and any [text decorations](/en-US/docs/Learn/CSS/Styling_text/Fundamentals#Font_style_font_weight_text_transform_and_text_decoration) (such as the addition of under- or overlines, strike-through lines, and so forth.

- [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.")

    The text's background color.

- [`text-shadow`](/en-US/docs/Web/CSS/text-shadow "The text-shadow CSS property adds shadows to text. It accepts a comma-separated list of shadows to be applied to the text and any of its decorations.")

    Configures a shadow effect to apply to text. Among the options for the shadow is the shadow's base color (which is then blurred and blended with the background based on the other parameters). See [Text drop shadows](/en-US/docs/Learn/CSS/Styling_text/Fundamentals#Text_drop_shadows "We hoped you enjoyed playing with text in this article! The next article will give you all you need to know about styling HTML lists.") in [Fundamental text and font styling](/en-US/docs/Learn/CSS/Styling_text/Fundamentals "We hoped you enjoyed playing with text in this article! The next article will give you all you need to know about styling HTML lists.") to learn more.

- [`text-decoration-color`](/en-US/docs/Web/CSS/text-decoration-color "The text-decoration-color CSS property sets the color of decorations added to text by text-decoration-line.")

    By default, text decorations (such as underlines, strikethroughs, etc) use the `color` property as their colors. However, you can override that behavior and use a different color for them with the `text-decoration-color` property.

- [`text-emphasis-color`](/en-US/docs/Web/CSS/text-emphasis-color "The text-emphasis-color CSS property sets the color of emphasis marks. This value can also be set using the text-emphasis shorthand.")

    The color to use when drawing emphasis symbols adjacent to each character in the text. This is used primarily when drawing text for East Asian languages.

- [`caret-color`](/en-US/docs/Web/CSS/caret-color "The caret-color CSS property sets the color of the insertion caret, the visible marker where the next character typed will be inserted.")

    The color to use when drawing the [caret](/en-US/docs/Glossary/caret) (sometimes referred to as the text input cursor) within the element. This is only useful in elements that are editable, such as [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML &lt;input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") and [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea "The HTML &lt;textarea> element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.") or elements whose HTML `contenteditable` attribute is set.

### Boxes

Every element is a box with some sort of content, and has a background and a border in addition to whatever contents the box may have.

- [Borders](#Borders)

    See the section [Borders](#Borders) for a list of the CSS properties you can use to set the colors of a box's borders.

- [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.")

    The background color to use in areas of the element that have no foreground content.

- [`column-rule-color`](/en-US/docs/Web/CSS/column-rule-color "The column-rule-color CSS property sets the color of the rule (line) drawn between columns in a multi-column layout.")

    The color to use when drawing the line separating columns of text.

- [`outline-color`](/en-US/docs/Web/CSS/outline-color "The outline-color CSS property sets the color of an element's outline.")

    The color to use when drawing an outline around the outside of the element. This outline is different from the border in that it doesn't get space set aside for it in the document (so it may overlap other content). It's generally used as a focus indicator, to show which element will receive input events.

### Borders

Any element can have a [border](/en-US/docs/Learn/CSS/Styling_boxes/Borders) drawn around it. A basic element border is a line drawn around the edges of the element's content. See [Box properties](/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model#Box_properties "The CSS box model is the foundation of layout on the Web — each element is represented as a rectangular box, with the box's content, padding, border, and margin built up around one another like the layers of an onion. As a browser renders a web page layout, it works out what styles are applied to the content of each box, how big the surrounding onion layers are, and where the boxes sit in relation to one another. Before understanding how to create CSS layouts, you need to understand the box model — this is what we'll look at in this article.") in [The box model](/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model "The CSS box model is the foundation of layout on the Web — each element is represented as a rectangular box, with the box's content, padding, border, and margin built up around one another like the layers of an onion. As a browser renders a web page layout, it works out what styles are applied to the content of each box, how big the surrounding onion layers are, and where the boxes sit in relation to one another. Before understanding how to create CSS layouts, you need to understand the box model — this is what we'll look at in this article.") to learn about the relationship between elements and their borders, and the article [Styling borders using CSS](/en-US/docs/Learn/CSS/Styling_boxes/Borders) to learn more about applying styles to borders.

You can use the [`border`](/en-US/docs/Web/CSS/border "The border shorthand CSS property sets an element's border.") shorthand property, which lets you configure everything about the border in one shot (including non-color features of borders, such as its [width](/en-US/docs/Web/CSS/border-width), [style](/en-US/docs/Web/CSS/border-style) (solid, dashed, etc.), and so forth.

- [`border-color`](/en-US/docs/Web/CSS/border-color "The border-color shorthand CSS property sets the color of an element's border.")

    Specifies a single color to use for every side of the element's border.

- [`border-left-color`](/en-US/docs/Web/CSS/border-left-color "The border-left-color CSS property sets the color of an element's left border."), [`border-right-color`](/en-US/docs/Web/CSS/border-right-color "The border-right-color CSS property sets the color of an element's right border. It can also be set with the shorthand CSS properties border-color or border-right."), [`border-top-color`](/en-US/docs/Web/CSS/border-top-color "The border-top-color CSS property sets the color of an element's top border."), and [`border-bottom-color`](/en-US/docs/Web/CSS/border-bottom-color "The border-bottom-color CSS property sets the color of an element's bottom border.")

    Lets you set the color of the corresponding side of the element's border.

- [`border-block-start-color`](/en-US/docs/Web/CSS/border-block-start-color "The border-block-start-color CSS property defines the color of the logical block-start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color, border-right-color, border-bottom-color, or border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.") and [`border-block-end-color`](/en-US/docs/Web/CSS/border-block-end-color "The border-block-end-color CSS property defines the color of the logical block-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color, border-right-color, border-bottom-color, or border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.")

    With these, you can set the color used to draw the borders which are closest to the start and end of the block the border surrounds. In a left-to-right writing mode (such as the way English is written), the block start border is the top edge and the block end is the bottom. This differs from the inline start and end, which are the left and right edges (corresponding to where each line of text in the box begins and ends).

- [`border-inline-start-color`](/en-US/docs/Web/CSS/border-inline-start-color "The border-inline-start-color CSS property defines the color of the logical inline start border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color, border-right-color, border-bottom-color, or border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.") and [`border-inline-end-color`](/en-US/docs/Web/CSS/border-inline-end-color "The border-inline-end-color CSS property defines the color of the logical inline-end border of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color, border-right-color, border-bottom-color, or border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.")

    These let you color the edges of the border closest to to the beginning and the end of the start of lines of text within the box. Which side this is will vary depending on the [`writing-mode`](/en-US/docs/Web/CSS/writing-mode "The writing-mode CSS property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress."), [`direction`](/en-US/docs/Web/CSS/direction "The direction CSS property sets the direction of text, table columns, and horizontal overflow."), and [`text-orientation`](/en-US/docs/Web/CSS/text-orientation "The text-orientation CSS property sets the orientation of the text characters in a line. It only affects text in vertical mode (when writing-mode is not horizontal-tb).") properties, which are typically (but not always) used to adjust text directionality based on the language being displayed. For example, if the box's text is being rendered right-to-left, then the `border-inline-start-color` is applied to the right side of the border.

### Other ways to use color

CSS isn't the only web technology that supports color. There are graphics technologies that are available on the web which also support color.

- The HTML [Canvas API](/en-US/docs/Web/API/Canvas_API)

    Lets you draw 2D bitmapped graphics in a [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas "Use the HTML &lt;canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element. See our [Canvas tutorial](/en-US/docs/Web/API/Canvas_API/Tutorial) to learn more.

- [SVG](/en-US/docs/Web/SVG) (Scalable Vector Graphics)

    Lets you draw images using commands that draw specific shapes, patterns, and lines to produce an image. SVG commands are formatted as XML, and can be embedded directly into a web page or can be placed in he page using the [`<img>`](/en-US/docs/Web/HTML/Element/img "The HTML &lt;img> element embeds an image into the document. It is a replaced element.") element, just like any other type of image.

- [WebGL](/en-US/docs/Web/API/WebGL_API)

    The Web Graphics Library is an OpenGL ES-based API for drawing high-performance 2D and 3D graphics on the Web. See our [WebGL tutorial](/en-US/docs/Web/API/WebGL_API/Tutorial) to find out more.

## How to describe a color

In order to represent a color in CSS, you have to find a way to translate the analog concept of "color" into a digital form that a computer can use. This is typically done by breaking down the color into components, such as how much of each of a set of primary colors to mix together, or how bright to make the color. As such, there are several ways you can describe color in CSS.

For more detailed discussion of each of the color value types, see the reference for the CSS [`<color>`](/en-US/docs/Web/CSS/color_value "The &lt;color> CSS data type represents a color in the sRGB color space. A &lt;color> may also include an alpha-channel transparency value, indicating how the color should composite with its background.") unit.

### Keywords

A set of standard color names have been defined, letting you use these keywords instead of numeric representations of colors if you choose to do so and there's a keyword representing the exact color you want to use. Color keywords include the standard primary and secondary colors (such as `red`, `blue`, or `orange`), shades of gray (from `black` to `white`, including colors like `darkgray` and `lightgray`), and a variety of other blended colors including `lightseagreen`, `cornflowerblue`, and `rebeccapurple`.

See [Color keywords](/en-US/docs/Web/CSS/color_value#Color_keywords "The &lt;color> CSS data type represents a color in the sRGB color space. A &lt;color> may also include an alpha-channel transparency value, indicating how the color should composite with its background.") in [`<color>`](/en-US/docs/Web/CSS/color_value "The &lt;color> CSS data type represents a color in the sRGB color space. A &lt;color> may also include an alpha-channel transparency value, indicating how the color should composite with its background.") for a list of all available color keywords.

### RGB values

There are three ways to represent an RGB color in CSS.

#### Hexadecimal string notation

Hexadecimal string notation represents a color using hexadecimal digits to represent each of the color components (red, green, and blue). It may also include a fourth component: the alpha channel (or opacity). Each color component can be represented as a number between 0 and 255 (`0x00` and `0xFF`) or, optionally, as a number between 0 and 15 (`0x0` and `0xF`). All components _must_ be specified using the same number of digits. If you use the single-digit notation, the final color is computed by using each component's digit twice; that is, `"#D"` becomes `"#DD"` when drawing.

A color in hexadecimal string notation always begins with the character `"#"`. After that come the hexadecimal digits of the color code. The string is case-insensitive.

- `"#rrggbb"`

    Specifies a fully-opaque color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`.

- `"#rrggbbaa"`

    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`. The alpha channel is specified by `0xaa`; the lower this value is, the more translucent the color becomes.

- `"#rgb"`

    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`.

- `"#rgba"`

    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`. The alpha channel is specified by `0xaa`; the lower this value is, the more translucent the color becomes.

As an example, you can represent the opaque color bright blue as `"#0000ff"` or `"#00f"`. To make it 25% opaque, you can use `"#0000ff44"` or `"#00f4"`.

#### RGB functional notation

RGB (Red/Green/Blue) functional notation, like hexadecimal string notation, represents colors using their red, green, and blue components (as well as, optionally, an alpha channel component for opacity). However, instead of using a string, the color is defined using the CSS function [`rgb()`](/en-US/docs/Web/CSS/color_value#rgb()). This function accepts as its input parameters the values of the red, green, and blue components and an optional fourth parameter, the value for the alpha channel.

Legal values for each of these parameters are:

- `red`, `green`, and `blue`

    Each must be an [`<integer>`](/en-US/docs/Web/CSS/integer "The &lt;integer> CSS data type is a special type of &lt;number> that represents a whole number, whether positive or negative. Integers can be used in numerous CSS properties, such as column-count, counter-increment, grid-column, grid-row, and z-index.") value between 0 and 255 (inclusive), or a [`<percentage>`](/en-US/docs/Web/CSS/percentage "The &lt;percentage> CSS data type represents a percentage value. It is often used to define a size as relative to an element's parent object. Numerous properties can use percentages, such as width, height, margin, padding, and font-size.") from 0% to 100%.

- `alpha`

    The alpha channel is a number between 0.0 (fully transparent) and 1.0 (fully opaque). You can also specify a percentage where 0% is the same as 0.0 and 100% is the same as 1.0.

For example, a bright red that's 50% opaque can be represented as `rgb(255, 0, 0, 0.5)` or `rgb(100%, 0, 0, 50%)`.

### HSL functional notation

Designers and artists often prefer to work using the [HSL](<https://en.wikipedia.org/wiki/HSL and HSV> "HSL") (Hue/Saturation/Luminosity) color method. On the web, HSL colors are represented using HSL functional notation. The `hsl()` CSS function is very similar to the `rgb()` function in usage otherwise.

![HSL color cylinder](https://mdn.mozillademos.org/files/15445/1200px-HSL_color_solid_cylinder_alpha_lowgamma.png)

_**Figure 1. An HSL color cylinder.** Hue defines the actual color based on the position along a circular color wheel representing the colors of the visible spectrum. Saturation is a percentage of how much of the way between being a shade of gray and having the maximum possible amount of the given hue. As the value of luminance (or lightness) increases, the color transitions from the darkest possible to the brightest possible (from black to white). Image courtesy of user [SharkD](http://commons.wikimedia.org/wiki/User:SharkD) on [Wikipedia](https://www.wikipedia.org/), distributed under the [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0) license._

The value of the hue (H) component of an HSL color is an angle from red around through yellow, green, cyan, blue, and magenta (ending up back at red again at 360°) that identifies what the base color is. The value can be specified in any [`<angle>`](/en-US/docs/Web/CSS/angle "The &lt;angle> CSS data type represents an angle value expressed in degrees, gradians, radians, or turns. It is used, for example, in &lt;gradient>s and in some transform functions.") unit supported by CSS, including degrees (`deg`), radians (`rad`), gradians (`grad`), or turns (`turn`). But this doesn't control how vivid or dull, or how bright or dark the color is.

The saturation (S) component of the color specifies what percentage of the final color is comprised of the specified hue. The rest is defined by the gray level provided by the luminance (L) component.

Think of it like creating the perfect paint color:

1. You start with base paint that's the maximum intensity possible for a given color, such as the most intense blue that can be represented by the user's screen. This is the **hue** (H) component: a value representing the angle around the color wheel for the vivid hue we want to use as our base.
2. Then select a grayscale paint that corresponds how bright you want the color to be; this is the luminance. Do you want it to be very bright and nearly white, or very dark and closer to black, or somewhere in between? This is specified using a percentage, where 0% is perfectly black and 100% is perfectly white. (regardless of the saturation or hue). In between values are a literal gray area.
3. Now that you have a gray paint and a perfectly vivid color, you need to mix them together. The saturation (S) component of the color indicates what percentage of the final color should be comprised of that perfectly vivid color. The rest of the final color is made up of the gray paint that represents the saturation.

You can also optionally include an alpha channel, to make the color less than 100% opaque.

Note that when you omit the hue's unit, it's assumed to be in degrees (`deg`).

## Using color

Now that you know what CSS properties exist that let you apply color to elements and the formats you can use to describe colors, you can put this together to begin to make use of color. As you may have seen from the list under [Things that can have color](#Things_that_can_have_color), there are plenty of things you can color with CSS. Let's look at this from two sides: using color within a [stylesheet](/en-US/docs/Glossary/stylesheet "The definition of that term (stylesheet) has not been written yet; please consider contributing it!"), and adding and changing color using [JavaScript](/en-US/docs/Glossary/JavaScript "JavaScript: JavaScript (JS) is a programming language mostly used to dynamically script webpages on the client side, but it is also often utilized on the server-side, using packages such as Node.js.") code to alter the styles of elements.

{{{{{embed-example:examples/specifying-colors-in-stylesheets.md}}}}}

## Letting the user pick a color

There are many situations in which your website may need to let the user select a color. Perhaps you have a customizable user interface, or you're implementing a drawing app. Maybe you have editable text and need to let the user choose the text color. Or perhaps your app lets the user assign colors to folders or items. Although historically it's been necessary to implement your own [color picker](<https://en.wikipedia.org/wiki/color picker> "color picker"), HTML now provides support for browsers to provide one for your use through the [`<input>`](/en-US/docs/Web/HTML/Element/input) element, by using `"color"` as the value of its `type` attribute.

The `<input>` element represents a color only in the [hexadecimal string notation](#Hexadecimal_string_notation) covered above.

{{{{{embed-example:examples/picking-a-color.md}}}}}

## Using color wisely

Making the right choices when selecting colors when designing a website can be a tricky process, especially if you aren't well-grounded in art, design, or at least basic color theory. The wrong color choice can render your site unattractive, or even worse, leave the content unreadable due to problems with contrast or conflicting colors. Worse still, if using the wrong colors can result in your content being outright unusable by people with certain vision problems, particularly color blindness.

### Finding the right colors

Coming up with just the right colors can be tricky, especially without training in art or design. Fortunately, there are tools available that can help you. While they can't replace having a good designer helping you make these decisions, they can definitely get you started.

#### Base color

The first step is to choose your **base color**. This is the color that in some way defines your website or the subject matter of the site. Just as we associate green with the beverage [Mountain Dew](<https://en.wikipedia.org/wiki/Mountain Dew> "Mountain Dew") and one might think of the color blue in relationship with the sky or the ocean, choosing an appropriate base color to represent your site is a good place to start. There are plenty of ways to select a base color; a few ideas include:

- A color that is naturally associated with the topic of your content, such as the existing color identified with a product or idea or a color representative of the emotion you wish to convey.
- A color that comes from imagery associated with what your content is about. If you're creating a website about a given item or product, choose a color that's physically present on that item.
- Browse websites that let you look at lots of existing color palettes and images to find inspiration.

When trying to decide upon a base color, you may find that browser extensions that let you select colors from web content can be particularly handy. Some of these are even specifically designed to help with this sort of work. For example, the website [ColorZilla](http://www.colorzilla.com/) offers an extension ([Chrome](http://www.colorzilla.com/chrome) / [Firefox](http://www.colorzilla.com/firefox)) that offers an eyedropper tool for picking colors from the web. It can also take averages of the colors of pixels in various sized areas or even a selected area of the page.

The advantage to averaging colors can be that often what looks like a solid color is actually a surprisingly varied number of related colors all used in concert, blending to create a desired effect. Picking just one of these pixels can result in getting a color that on its own looks very out of place.

#### Fleshing out the palette

Once you have decided on your base color, there are plenty of online tools that can help you build out a palette of appropriate colors to use along with your base color by applying color theory to your base color to determine appropriate added colors. Many of these tools also support viewing the colors filtered so you can see what they would look like to people with various forms of color blindness. See [Color and accessibility](#Color_and_accessibility) for a brief explanation of why this matters.

A few examples (all free to use as of the time this list was last revised):

- [MDN's color picker tool](/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool)
- [Paletton](http://paletton.com)
- [Adobe Color CC online color wheel](https://color.adobe.com/create/color-wheel)

When designing your palette, be sure to keep in mind that in addition to the colors these tools typically generate, you'll probably also need to add some core neutral colors such as white (or nearly white), black (or nearly black), and some number of shades of gray.

Usually, you are far better off using the smallest number of colors possible. By using color to accentuate rather than adding color to everything on the page, you keep your content easy to read and the colors you do use have far more impact.

### Color theory resources

A full review of color theory is beyond the scope of this article, but there are plenty of articles about color theory available, as well as courses you can find at nearby schools and universities. A couple of useful resources about color theory:

- [Color Science](https://www.khanacademy.org/partner-content/pixar/color) ([Khan Academy](https://www.khanacademy.org/) in association with [Pixar](https://www.pixar.com/))

    An online course which introduces concepts such as what color is, how it's perceived, and how to use colors to express ideas. Presented by Pixar artists and designers.

- [Color theory](<https://en.wikipedia.org/wiki/Color theory> "Color theory") on Wikipedia

    Wikipedia's entry on color theory, which has a lot of great information from a technical perspective. It's not really a resource for helping you with the color selection process, but is still full of useful information.

### Color and accessibility

There are several ways color can be an [accessibility](/en-US/docs/Glossary/accessibility "accessibility: Web Accessibility (A11Y) refers to best practices for keeping a website usable despite physical and technical restrictions. Web accessibility is formally defined and discussed at the W3C through the Web Accessibility Initiative (WAI).") problem. Improper or careless use of color can result in a website or app that a percentage of your target audience may not be able to use adequately, resulting in lost traffic, lost business, and possibly even a public relations problem. So it's important to consider your use of color carefully.

You should do at least basic research into [color blindness](<https://en.wikipedia.org/wiki/color blindness> "color blindness"). There are several kinds; the most common is red-green color blindness, which causes people to be unable to differentiate between the colors red and green. There are others, too, ranging from inabilities to tell the difference between certain colors to total inability to see color at all.

The most important rule: never use color as the only way to know something. If, for example, you indicate success or failure of an operation by changing the color of a shape from white to green for success and red for failure, users with red-green color-blindness won't be able to use your site properly. Instead, perhaps use both text and color together, so that everyone can understand what's happening.

For more information about color blindness, see the following articles:

- [Medline Plus: Color Blindness](https://medlineplus.gov/colorblindness.html) (United States National Institute of Health)
- [American Academy of Ophthalmology: What Is Color Blindness?](https://www.aao.org/eye-health/diseases/what-is-color-blindness)
- [Color Blindness & Web Design](https://www.usability.gov/get-involved/blog/2010/02/color-blindness.html) (Usability.gov: United States Department of Health and Human Services)

### Palette design example

Let's consider a quick example of selecting an appropriate color palette for a site. Imagine that you're building a website for a new game that takes place on the planet Mars. So let's do a [Google search for photos of Mars](https://www.google.com/search?q=Mars&tbm=isch). Lots of good examples of Martian coloration there. We carefully avoid the mockups and the photos from movies. And we decide to use a photo taken by one of the Mars landers humanity has parked on the surface over the last few decades, since the game takes place on the planet's surface. We use a color picker tool to select a sample of the color we choose.

Using an eyedropper tool, we identify a color we like and determine that the color in question is `#D79C7A`, which is an appropriate rusty orange-red color that's so stereotypical of the Martian surface.

Having selected our base color, we need to build out our palette. We decide to use [Paletton](http://www.paletton.com/) to come up with the other colors we need. Upon opening Paletton, we see:

![Right after loading Paletton.](https://mdn.mozillademos.org/files/15451/paletton1.png)

Next, we enter our color's hex code (`D79C7A`) into the "Base RGB" box at the bottom-left corner of the tool:

![After entering base color](https://mdn.mozillademos.org/files/15453/paletton2.png)

We now see a monochromatic palette based on the color we picked from the Mars photo. If you need a lot of related colors for some reason, those are likely to be good ones. But what we really want is an accent color. Something that will pop along side the base color. To find that, we click the "add complementary" toggle underneath the menu that lets you select the palette type (currently "Monochromatic"). Paletton computes an appropriate accent color; clicking on the accent color down in the bottom-right corner tells us that this color is `#508D7C`.

![Now with complementary colors included.](https://mdn.mozillademos.org/files/15455/paletton3.png)

If you're unhappy with the color that's proposed to you, you can change the color scheme, to see if you find something you like better. For example, if we don't like the proposed greenish-blue color, we can click the Triad color scheme icon, which presents us with the following:

![Triad color scheme selected](https://mdn.mozillademos.org/files/15457/paletton4.png)

That grayish blue in the top-right looks pretty good. Clicking on it, we find that it's `#556E8D`. That would be used as the accent color, to be used sparingly to make things stand out, such as in headlines or in the highlighting of tabs or other indicators on the site:

![Triad color scheme selected](https://mdn.mozillademos.org/files/15459/paletton-color-detail.png)

Now we have our base color and our accent. On top of that, we have a few complementary shades of each, just in case we need them for gradients and the like. The colors can then be exported in a number of formats so you can make use of them.

Once you have these colors, you will probably still need to select appropriate neutral colors. Common design practice is to try to find the sweet spot where there's just enough contrast that the text is crisp and readable but not enough contrast to become harsh for the eyes. It's easy to go too far in one way or another so be sure to get feedback on your colors once you've selected them and have examples of them in use available. If the contrast is too low, your text will tend to be washed out by the background, leaving it unreadable, but if your contrast is too high, the user may find your site garish and unpleasant to look at.

### Color, backgrounds, contrast, and printing

What looks good on screen may look very different on paper. In addition, ink can be expensive, and if a user is printing your page, they don't necessarily need all the backgrounds and such using up their precious ink when all that matters is the text itself. Most browsers, by default, remove background images when printing documents.

If your background colors and images have been selected carefully and/or are crucial to the usefulness of the content, you can use the CSS [`color-adjust`](/en-US/docs/Web/CSS/color-adjust "The color-adjust CSS property sets what, if anything, the user agent may do to optimize the appearance of the element on the output device.") property to tell the browser that it should not make adjustments to the appearance of content.

The default value of `color-adjust`, `economy`, indicates that the browser is allowed to make appearance changes as it deems necessary in order to try to optimize the legibility and/or print economy of the content, given the type of output device the document is being drawn onto.

You can set `color-adjust` to `exact` to tell the browser that the element or elements on which you use it have been designed specifically to best work with the colors and images left as they are. With this set, the browser won't tamper with the appearance of the element, and will draw it as indicated by your CSS.

**Note:** There is no guarantee, though, that `color-adjust: exact` will result in your CSS being used exactly as given. If the browser provides user preferences to change the output (such as a "don't print backgrounds" checkbox in a print dialog box), that overrides the value of `color-adjust`.

## See also

- [Drawing graphics](/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics)
- [Graphics on the web](/en-US/docs/Web/Guide/Graphics)
- [MDN's color picker tool](/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool)
