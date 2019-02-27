<!-- <short-description> -->
The **HTML `<br>` element** produces a line break in text
(carriage-return). It is useful for writing a poem or an address, where
the division of lines is significant.
<!-- </short-description> -->

<!-- <overview> -->
A `<br>` element is included at each point where we want the text to break. The text after the `<br>`
begins again at the start of the next line of the text block.

Do not use `<br>` to create margins between paragraphs; wrap
them in
[`<p>`](/en-US/docs/Web/HTML/Element/p)
elements and use the [CSS](/en-US/docs/CSS)
[`margin`](/en-US/docs/Web/CSS/margin)
property to control their size.
<!-- </overview> -->

<!-- <usage-notes> -->
Usage notes
-----------

If multiple `<base>` elements are specified, only the first **href** and
first **target** value are used; all others are ignored.
<!-- </usage-notes> -->

<!-- <accessibility-concerns> -->
Creating separate paragraphs of text using `<br>` is not only bad
practice, it is problematic for people who navigate with the aid of
screen reading technology. Screen readers may announce the presence of
the element, but not any content contained within `<br>`s. This can be a
confusing and frustrating experience for the person using the screen
reader.

Use `<p>` elements, and use CSS properties like
[`margin`](/en-US/docs/Web/CSS/margin)
to control their spacing.
<!-- </accessibility-concerns> -->

<!-- <styling-with-css> -->
Styling with CSS
----------------

The `<br>` element has a single, well-defined purpose - to create a
line break in a block of text. As such, it has no dimensions or visual
output of its own, and there is very little you can do to style it.

You can set a
[`margin`](/en-US/docs/Web/CSS/margin)
on `<br>` elements themselves to increase the spacing between the lines
of text in the block, but this is a bad practice - you should use the
[`line-height`](/en-US/docs/Web/CSS/line-height)
property that was designed for that purpose.
<!-- </styling-with-css> -->

<!-- <see-also> -->


See also
--------

-   [`<address>`](/en-US/docs/Web/HTML/Element/address)
    element
-   [`<p>`](/en-US/docs/Web/HTML/Element/p)
    element
<!-- </see-also> -->
