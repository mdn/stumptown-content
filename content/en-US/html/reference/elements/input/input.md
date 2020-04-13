---
title: '<input>: The Input (Form Input) element'
short_title: <input>
mdn_url: /en-US/docs/Web/HTML/Element/input
specifications: https://html.spec.whatwg.org/multipage/input.html#the-input-element
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/input-text.html
    height: html-short
browser_compatibility: html.elements.input
attributes:
    element_specific:
        - ../input/attributes/autofocus.md
        - ../input/attributes/checked.md
        - ../input/attributes/disabled.md
        - ../input/attributes/form.md
        - ../input/attributes/name.md
        - ../input/attributes/readonly.md
        - ../input/attributes/required.md
        - ../input/attributes/type.md
        - ../input/attributes/value.md
    global: /content/html/global_attributes
examples:
    - examples/Styling_input_elements.md
    - examples/Custom_error_messages.md
recipe: html-element
---
## Short description

The **HTML `<input>` element** is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and [user agent](/en-US/docs/Glossary/user_agent).

## Description

How an `<input>` works varies considerably depending on the value of its `type` attribute, hence the different types are covered in their own separate reference pages. If this attribute is not specified, the default type adopted is `text`.

The available types are as follows:

- `button`: A push button with no default behavior.

- `checkbox`: A check box allowing single values to be selected/deselected.

- `color`: [HTML5](/en-US/docs/HTML/HTML5) A control for specifying a color. A color picker's UI has no required features other than accepting simple colors as text ([more info](https://www.w3.org/TR/html5/forms.html#color-state-(type=color))).

- `date`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a date (year, month, and day, with no time).

- `datetime-local`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a date and time, with no time zone.

- `email`: [HTML5](/en-US/docs/HTML/HTML5) A field for editing an e-mail address.

- `file`: A control that lets the user select a file. Use the **accept** attribute to define the types of files that the control can select.

- `hidden`: A control that is not displayed but whose value is submitted to the server.

- `image`: A graphical submit button. You must use the **src** attribute to define the source of the image and the **alt** attribute to define alternative text. You can use the **height** and **width** attributes to define the size of the image in pixels.

- `month`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a month and year, with no time zone.

- `number`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a number.

- `password`: A single-line text field whose value is obscured. Use the `maxlength` and `minlength` attributes to specify the maximum length of the value that can be entered. **Note**: Any forms involving sensitive information like passwords (e.g. login forms) should be served over HTTPS; Firefox now implements multiple mechanisms to warn against insecure login forms — see [Insecure passwords](/en-US/docs/Web/Security/Insecure_passwords). Other browsers are also implementing similar mechanisms.

- `radio`: A radio button, allowing a single value to be selected out of multiple choices.

- `range`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a number whose exact value is not important.

- `reset`: A button that resets the contents of the form to default values.

- `search`: [HTML5](/en-US/docs/HTML/HTML5) A single-line text field for entering search strings. Line-breaks are automatically removed from the input value.

- `submit`: A button that submits the form.

- `tel`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a telephone number.

- `text`: A single-line text field. Line-breaks are automatically removed from the input value.

- `time`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a time value with no time zone.

- `url`: [HTML5](/en-US/docs/HTML/HTML5) A field for entering a URL.

- `week`: [HTML5](/en-US/docs/HTML/HTML5) A control for entering a date consisting of a week-year number and a week number with no time zone.

Some input types are now obsolete:

- `datetime`: [HTML5](/en-US/docs/HTML/HTML5) __ __ A control for entering a date and time (hour, minute, second, and fraction of a second) based on UTC time zone. **This feature has been [removed from WHATWG HTML.](https://github.com/whatwg/html/issues/336)**

## Accessibility concerns

### Labels

When including inputs, it is recommended to add labels along side. This is so those who use assistive technologies can tell what the input is for. For more information about labels in general see [Labels and placeholders](#Labels_and_placeholders) .

The following is an example of how to associate the `<label>` with an `<input>` element in the above style. You need to give the `<input>` an `id` attribute. The `<label>` then needs a `for` attribute whose value is the same as the input's `id`.

    <label for="peas">Do you like peas?</label>
    <input type="checkbox" name="peas" id="peas">

### Size

Interactive elements such as form input should provide an area large enough that it is easy to activate them. This helps a variety of people, including people with motor control issues and people using non-precise forms of input such as a stylus or fingers. A minimum interactive size of 44 by 44 [CSS pixels](https://www.w3.org/TR/WCAG21/#dfn-css-pixels) is recommended.

- [Understanding Success Criterion 2.5.5: Target Size | W3C Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Target Size and 2.5.5 | Adrian Roselli](http://adrianroselli.com/2019/06/target-size-and-2-5-5.html)
- [Quick test: Large touch targets - The A11Y Project](https://a11yproject.com/posts/large-touch-targets/)

## Labels and placeholders

**TL;DR:** To save you time, here's the key point: don't use the `placeholder` attribute if you can avoid it. If you need to label an `<input>` element, use the [`<label>`](/en-US/docs/Web/HTML/Element/label) element.

There are three seemingly similar ways to associate assistive text with an `<input>`. However, they are actually quite different, and only one of them is always a good choice. Here we will look at each of them and learn best practices for providing the user with guidance when entering data into a form.

### The &lt;label> element

The [`<label>`](/en-US/docs/Web/HTML/Element/label) element is the only way to provide explanatory information about a form field that is _always_ appropriate (aside from any layout concerns you have). It's never a bad idea to use a `<label>` to explain what should be entered into an `<input>` or [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea).

### The placeholder attribute

The `placeholder` attribute lets you specify a text that appears within the `<input>` element's content area itself when empty. It's intended to be used to show an example input, rather than an explanation or prompt, but tends to be badly misused.

Here are two inputs that take a password, each with a placeholder:

![Example of correct and incorrect placeholder usage](https://mdn.mozillademos.org/files/16094/placeholder-badgood.png)

The first one uses a placeholder string `MyGr8P@sswrd`, demonstrating what a password might look like. And no, that's not _really_ a great password.

The second one uses a prompt string, `Enter your password` as a placeholder. The first, and most obvious, problem with doing this is that as soon as the user types their first character, they no longer have a prompt explaining what that field is for.

That's why, instead, you should use the [`<label>`](/en-US/docs/Web/HTML/Element/label) element. The placeholder should never be required in order to understand your forms. While some people are able to remember what a given empty box is meant for after its only identifying text vanishes, others cannot.

If the user can't understand your form if the placeholders are missing (say, in a browser that doesn't support `placeholder`, or in the case above where the user starts typing then gets confused), you're not using placeholders properly.

In addition, browsers with automatic page translation features may skip over attributes when translating. That means the `placeholder` may not get translated, resulting in important information not being translated.

If you feel like you need to use a placeholder, it's possible to use both a placeholder and a label:

![](https://mdn.mozillademos.org/files/16110/label-and-placeholder.png)

### Unadorned text adjacent to the &lt;input> element

You can also just have plain text adjacent to the `<input>` element, like this:

    <p>Enter your name: <input id="name" type="text" size="30"></p>

Please don't do this. This doesn't create a relationship between the prompt and the `<input>` element, which is important for reasons we'll get into in the next section.

### Why you should use labels

In addition to the information provided above, there are a number of other reasons why `<label>` is the best way to explain `<input>`s:

- The semantic pairing of `<input>` and `<label>` elements is useful for assistive technologies such as screen readers. By pairing them using the `<label>`'s `for` attribute, you bond the label to the input in a way that lets screen readers describe inputs to users more precisely.
- By pairing a `<label>` with an `<input>`, clicking on either one will focus the `<input>`. If you use plain text to "label" your input, this won't happen. Having the prompt part of the activation area for the input is helpful for people with motor control conditions.
- As web developers, it's important that we never assume that people will know all the things that we know. The diversity of people using the web—and by extension your web site—practically guarantees that some of your site's visitors will have some variation in thought processes and/or circumstances that leads them to interpret your forms very differently from you without clear and properly-presented labels.

## Localization

The allowed inputs for certain &lt;input> types depend on the locale. In some locales, 1,000.00 is a valid number, while in other locales the valid way to enter this number is 1.000,00.

Firefox uses the following heuristics to determine the locale to validate the user's input (at least for `type="number"`):

- Try the language specified by a `lang`/`xml:lang` attribute on the element or any of its parents.
- Try the language specified by any Content-Language HTTP header or
- If none specified, use the browser's locale.

## Using `mozactionhint` on Firefox mobile

You can use the `mozactionhint` attribute to specify the text for the label of the enter key on the virtual keyboard when your form is rendered on Firefox mobile. For example, to have a "Next" label, you can do this:

    <input type="text" mozactionhint="next">

The result is:

![](https://mdn.mozillademos.org/files/3251/mozactionhint.png)

Note the "Next" key in the lower-right corner of the keyboard.

## See also

- Other form-related elements: [`<form>`](/en-US/docs/Web/HTML/Element/form), [`<button>`](/en-US/docs/Web/HTML/Element/button), [`<datalist>`](/en-US/docs/Web/HTML/Element/datalist), [`<legend>`](/en-US/docs/Web/HTML/Element/legend), [`<label>`](/en-US/docs/Web/HTML/Element/label), [`<select>`](/en-US/docs/Web/HTML/Element/select), [`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup), [`<option>`](/en-US/docs/Web/HTML/Element/option), [`<textarea>`](/en-US/docs/Web/HTML/Element/textarea), [`<keygen>`](/en-US/docs/Web/HTML/Element/keygen), [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset), [`<output>`](/en-US/docs/Web/HTML/Element/output), [`<progress>`](/en-US/docs/Web/HTML/Element/progress) and [`<meter>`](/en-US/docs/Web/HTML/Element/meter).
- [Form constraint validation](/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
- [Cross-browser HTML5 placeholder text](http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text)
- The CSS [`caret-color`](/en-US/docs/Web/CSS/caret-color) property
- In certain cases (typically involving non-textual inputs and specialized interfaces), the `<input>` element is a [replaced element](/en-US/docs/Web/CSS/Replaced_element). When it is, the position and size of the element's size and positioning within its frame can be adjusted using the CSS [`object-position`](/en-US/docs/Web/CSS/object-position) and [`object-fit`](/en-US/docs/Web/CSS/object-fit) properties
