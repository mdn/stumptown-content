---
title: 'Block-level elements'
mdn_url: /en-US/docs/Web/HTML/Block-level_elements
related_content: /related_content/html.yaml
recipe: guide
---
HTML (**Hypertext Markup Language**) elements historically were categorized as either "block-level" elements or ["inline" elements](/en-US/docs/HTML/Inline_elements). By default, a block-level element occupies the entire space of its parent element (container), thereby creating a "block." This article helps to explain what this means.

Browsers typically display the block-level element with a newline both before and after the element. You can visualize them as a stack of boxes.

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

{{{{{embed-example:examples/Block-level_example.md}}}}}

## Usage

- Block-level elements may appear only within a [`<body>`](/en-US/docs/Web/HTML/Element/body) element.

## Block-level vs. inline

There are a couple of key differences between block-level elements and inline elements:

- Content model

    Generally, block-level elements may contain inline elements and (sometimes) other block-level elements. Inherent in this structural distinction is the idea that block elements create "larger" structures than inline elements.

- Default formatting

    By default, block-level elements begin on new lines, but inline elements can start anywhere in a line.

The distinction of block-level vs. inline elements was used in HTML specifications up to 4.01. In HTML5, this binary distinction is replaced with a more complex set of [content categories](/en-US/docs/HTML/Content_categories). While the "inline" category roughly corresponds to the category of [phrasing content](/en-US/docs/HTML/Content_categories#Phrasing_content), the "block-level" category doesn't directly correspond to any HTML5 content category, but _"block-level" and "inline" elements combined together_ correspond to the [flow content](/en-US/docs/HTML/Content_categories#Flow_content) in HTML5. There are also additional categories, e.g. [interactive content](/en-US/docs/Web/Guide/HTML/Content_categories#Interactive_content).

## Elements

The following is a complete list of all HTML "block-level" elements (although "block-level" is not technically defined for elements that are new in HTML5).

- [`<address>`](/en-US/docs/Web/HTML/Element/address)

    Contact information.

- [`<article>`](/en-US/docs/Web/HTML/Element/article)

    Article content.

- [`<aside>`](/en-US/docs/Web/HTML/Element/aside)

    Aside content.

- [`<blockquote>`](/en-US/docs/Web/HTML/Element/blockquote)

    Long ("block") quotation.

- [`<details>`](/en-US/docs/Web/HTML/Element/details)

    Disclosure widget.

- [`<dialog>`](/en-US/docs/Web/HTML/Element/dialog)

    Dialog box.

- [`<dd>`](/en-US/docs/Web/HTML/Element/dd)

    Describes a term in a description list.

- [`<div>`](/en-US/docs/Web/HTML/Element/div)

    Document division.

- [`<dl>`](/en-US/docs/Web/HTML/Element/dl)

    Description list.

- [`<dt>`](/en-US/docs/Web/HTML/Element/dt)

    Description list term.

- [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset)

    Field set label.

- [`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption)

    Figure caption.

- [`<figure>`](/en-US/docs/Web/HTML/Element/figure)

    Groups media content with a caption (see [`<figcaption>`](/en-US/docs/Web/HTML/Element/figcaption)).

- [`<footer>`](/en-US/docs/Web/HTML/Element/footer)

    Section or page footer.

- [`<form>`](/en-US/docs/Web/HTML/Element/form)

    Input form.

- [`<h1>`](/en-US/docs/Web/HTML/Element/h1), [`<h2>`](/en-US/docs/Web/HTML/Element/h2), [`<h3>`](/en-US/docs/Web/HTML/Element/h3), [`<h4>`](/en-US/docs/Web/HTML/Element/h4), [`<h5>`](/en-US/docs/Web/HTML/Element/h5), [`<h6>`](/en-US/docs/Web/HTML/Element/h6)

    Heading levels 1-6.

- [`<header>`](/en-US/docs/Web/HTML/Element/header)

    Section or page header.

- [`<hgroup>`](/en-US/docs/Web/HTML/Element/hgroup)

    Groups header information.

- [`<hr>`](/en-US/docs/Web/HTML/Element/hr)

    Horizontal rule (dividing line).

- [`<li>`](/en-US/docs/Web/HTML/Element/li)

    List item.

- [`<main>`](/en-US/docs/Web/HTML/Element/main)

    Contains the central content unique to this document.

- [`<nav>`](/en-US/docs/Web/HTML/Element/nav)

    Contains navigation links.

- [`<ol>`](/en-US/docs/Web/HTML/Element/ol)

    Ordered list.

- [`<p>`](/en-US/docs/Web/HTML/Element/p)

    Paragraph.

- [`<pre>`](/en-US/docs/Web/HTML/Element/pre)

    Preformatted text.

- [`<section>`](/en-US/docs/Web/HTML/Element/section)

    Section of a web page.

- [`<table>`](/en-US/docs/Web/HTML/Element/table)

    Table.

- [`<ul>`](/en-US/docs/Web/HTML/Element/ul)

    Unordered list.

## See also

- [Inline elements](/en-US/docs/Web/HTML/Inline_elements)
- [`display`](/en-US/docs/Web/CSS/display)
- [Block and Inline Layout in Normal Flow](/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow)
