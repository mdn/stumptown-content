---
title: Advanced text formatting
mdn_url: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
---
[__ Previous](/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)[__ Overview: Introduction to HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML)[Next __](/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)



There are many other elements in HTML for formatting text, which we didn't get to in the [HTML text fundamentals](/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) article. The elements described in this article are less known, but still useful to know about (and this is still not a complete list by any means). Here you'll learn about marking up quotations, description lists, computer code and other related text, subscript and superscript, contact information, and more.

| Prerequisites: | Basic HTML familiarity, as covered in [Getting started with HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started). HTML text formatting, as covered in [HTML text fundamentals](/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals). |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objective:     | To learn how to use lesser-known HTML elements to mark up advanced semantic features.                                                                                                                                                                             |

## Description lists

In HTML text fundamentals, we walked through how to [mark up basic lists](/en-US/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#Lists) in HTML, but we didn't mention the third type of list you'll occasionally come across — **description lists**. The purpose of these lists is to mark up a set of items and their associated descriptions, such as terms and definitions, or questions and answers. Let's look at an example of a set of terms and definitions:

    soliloquy
    In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)
    monologue
    In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.
    aside
    In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information

Description lists use a different wrapper than the other list types — [`<dl>`](/en-US/docs/Web/HTML/Element/dl "The HTML &lt;dl> element represents a description list. The element encloses a list of groups of terms (specified using the &lt;dt> element) and descriptions (provided by &lt;dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)."); in addition each term is wrapped in a [`<dt>`](/en-US/docs/Web/HTML/Element/dt "The HTML &lt;dt> element specifies a term in a description or definition list, and as such must be used inside a &lt;dl> element.") (description term) element, and each description is wrapped in a [`<dd>`](/en-US/docs/Web/HTML/Element/dd "The HTML &lt;dd> element provides the details about or the definition of the preceding term (&lt;dt>) in a description list (&lt;dl>).") (description definition) element. Let's finish marking up our example:

    <dl>
      <dt>soliloquy</dt>
      <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
      <dt>monologue</dt>
      <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
      <dt>aside</dt>
      <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought, or piece of additional background information.</dd>
    </dl>

The browser default styles will display description lists with the descriptions indented somewhat from the terms. MDN's styles follow this convention fairly closely, but also embolden the terms for extra definition.

-   soliloquy

    In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)

-   monologue

    In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.

-   aside

    In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.

Note that it is permitted to have a single term with multiple descriptions, for example:

-   aside

    -   In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.
    -   In writing, a section of content that is related to the current topic, but doesn't fit directly into the main flow of content so is presented nearby (often in a box off to the side.)

### Active learning: Marking up a set of definitions

It's time to try your hand at description lists; add elements to the raw text in the _Input_ field so that it appears as a description list in the _Output_ field. You could try using your own terms and descriptions if you like.

If you make a mistake, you can always reset it using the _Reset_ button. If you get really stuck, press the _Show solution_ button to see the answer.

###### Playable code



    <h2>Live output</h2>

    <div class="output" style="min-height: 50px;">
    </div>

    <h2>Editable code</h2>
    <p class="a11y-label">Press Esc to move focus away from the code area (Tab inserts a tab character).</p>

    <textarea id="code" class="input" style="min-height: 100px; width: 95%">
    Bacon
    The glue that binds the world together.
    Eggs
    The glue that binds the cake together.
    Coffee
    The drink that gets the world running in the morning.
    A light brown color.</textarea>

    <div class="playable-buttons">
      <input id="reset" type="button" value="Reset">
      <input id="solution" type="button" value="Show solution">
    </div>



    html {
      font-family: sans-serif;
    }

    h2 {
      font-size: 16px;
    }

    .a11y-label {
      margin: 0;
      text-align: right;
      font-size: 0.7rem;
      width: 98%;
    }

    body {
      margin: 10px;
      background: #f5f9fa;
    }



    var textarea = document.getElementById('code');
    var reset = document.getElementById('reset');
    var solution = document.getElementById('solution');
    var output = document.querySelector('.output');
    var code = textarea.value;
    var userEntry = textarea.value;

    function updateCode() {
      output.innerHTML = textarea.value;
    }

    reset.addEventListener('click', function() {
      textarea.value = code;
      userEntry = textarea.value;
      solutionEntry = htmlSolution;
      solution.value = 'Show solution';
      updateCode();
    });

    solution.addEventListener('click', function() {
      if(solution.value === 'Show solution') {
        textarea.value = solutionEntry;
        solution.value = 'Hide solution';
      } else {
        textarea.value = userEntry;
        solution.value = 'Show solution';
      }
      updateCode();
    });

    var htmlSolution = '<dl>\n <dt>Bacon</dt>\n <dd>The glue that binds the world together.</dd>\n <dt>Eggs</dt>\n <dd>The glue that binds the cake together.</dd>\n <dt>Coffee</dt>\n <dd>The drink that gets the world running in the morning.</dd>\n <dd>A light brown color.</dd>\n</dl>';
    var solutionEntry = htmlSolution;

    textarea.addEventListener('input', updateCode);
    window.addEventListener('load', updateCode);

    // stop tab key tabbing out of textarea and
    // make it write a tab at the caret position instead

    textarea.onkeydown = function(e){
      if (e.keyCode === 9) {
        e.preventDefault();
        insertAtCaret('\t');
      }

      if (e.keyCode === 27) {
        textarea.blur();
      }
    };

    function insertAtCaret(text) {
      var scrollPos = textarea.scrollTop;
      var caretPos = textarea.selectionStart;

      var front = (textarea.value).substring(0, caretPos);
      var back = (textarea.value).substring(textarea.selectionEnd, textarea.value.length);
      textarea.value = front + text + back;
      caretPos = caretPos + text.length;
      textarea.selectionStart = caretPos;
      textarea.selectionEnd = caretPos;
      textarea.focus();
      textarea.scrollTop = scrollPos;
    }

    // Update the saved userCode every time the user updates the text area code

    textarea.onkeyup = function(){
      // We only want to save the state when the user code is being shown,
      // not the solution, so that solution is not saved over the user code
      if(solution.value === 'Show solution') {
        userEntry = textarea.value;
      } else {
        solutionEntry = textarea.value;
      }

      updateCode();
    };

## Quotations

HTML also has features available for marking up quotations; which element you use depends on whether you are marking up a block or inline quotation.

### Blockquotes

If a section of block level content (be it a paragraph, multiple paragraphs, a list, etc.) is quoted from somewhere else, you should wrap it inside a [`<blockquote>`](/en-US/docs/Web/HTML/Element/blockquote "The HTML &lt;blockquote> Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the &lt;cite> element.") element to signify this, and include a URL pointing to the source of the quote inside a `cite` attribute. For example, the following markup is taken from the MDN `<blockquote>` element page:

    <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
    Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>

To turn this into a block quote, we would just do this:

    <blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
      <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
      Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
    </blockquote>

Browser default styling will render this as an indented paragraph, as an indicator that it is a quote; MDN does this, but also adds some extra styling:

> The **HTML `<blockquote>` Element** (or _HTML Block Quotation Element_) indicates that the enclosed text is an extended quotation.

### Inline quotations

Inline quotations work in exactly the same way, except that they use the [`<q>`](/en-US/docs/Web/HTML/Element/q "The HTML &lt;q> element  indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. ") element. For example, the below bit of markup contains a quotation from the MDN `<q>` page:

    <p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
    for short quotations that don't require paragraph breaks.</q></p>

Browser default styling will render this as normal text put in quotes to indicate a quotation, like so:

The quote element — `<q>` — is "intended for short quotations that don't require paragraph breaks."

### Citations

The content of the `cite` attribute sounds useful, but unfortunately browsers, screenreaders, etc. don't really do much with it. There is no way to get the browser to display the contents of `cite`, without writing your own solution using JavaScript or CSS. If you want to make the source of the quotation available on the page you need to make it available in the text via a link or some other appropriate way.

There is a [`<cite>`](/en-US/docs/Web/HTML/Element/cite "The HTML Citation element (&lt;cite>) is used to describe a reference to a cited creative work, and must include the title of that work.") element, but this is meant to contain the title of the resource being quoted, e.g. the name of the book. There is no reason however why you couldn't link the text inside `<cite>` to the quote source in some way:

    <p>According to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
    <cite>MDN blockquote page</cite></a>:
    </p>

    <blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
      <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
      Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
    </blockquote>

    <p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
    for short quotations that don't require paragraph breaks.</q> -- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">
    <cite>MDN q page</cite></a>.</p>

Citations are styled in italic font by default. You can see this code at work in our [quotations.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/advanced-text-formatting/quotations.html) example.

### Active learning: Who said that?

Time for another active learning example! In this example we'd like you to:

1.  Turn the middle paragraph into a blockquote, which includes a `cite` attribute.
2.  Turn part of the third paragraph into an inline quote, which includes a `cite` attribute.
3.  Include a `<cite>` element for each link to say what the title of the quoted source is.

The citation sources you need are:

-   http&#x3A;//www.brainyquote.com/quotes/authors/c/confucius.html for the Confucius quote
-   http&#x3A;//www.affirmationsforpositivethinking.com/index.htm for "The Need To Eliminate Negative Self Talk".

If you make a mistake, you can always reset it using the _Reset_ button. If you get really stuck, press the _Show solution_ button to see the answer.

###### Playable code 2

    <h2>Live output</h2>

    <div class="output" style="min-height: 50px;">
    </div>

    <h2>Editable code</h2>
    <p class="a11y-label">Press Esc to move focus away from the code area (Tab inserts a tab character).</p>

    <textarea id="code" class="input" style="min-height: 150px; width: 95%">
    <p>Hello and welcome to my motivation page. As Confucius' quotes site says:</p>
    <p>It does not matter how slowly you go as long as you do not stop.</p>
    <p>I also love the concept of positive thinking, and The Need To Eliminate Negative Self Talk (as mentioned in Affirmations for Positive Thinking.)</p>
    </textarea>

    <div class="playable-buttons">
      <input id="reset" type="button" value="Reset">
      <input id="solution" type="button" value="Show solution">
    </div>

    html {
      font-family: sans-serif;
    }

    h2 {
      font-size: 16px;
    }

    .a11y-label {
      margin: 0;
      text-align: right;
      font-size: 0.7rem;
      width: 98%;
    }

    body {
      margin: 10px;
      background: #f5f9fa;
    }

    var textarea = document.getElementById('code');
    var reset = document.getElementById('reset');
    var solution = document.getElementById('solution');
    var output = document.querySelector('.output');
    var code = textarea.value;
    var userEntry = textarea.value;

    function updateCode() {
      output.innerHTML = textarea.value;
    }

    reset.addEventListener('click', function() {
      textarea.value = code;
      userEntry = textarea.value;
      solutionEntry = htmlSolution;
      solution.value = 'Show solution';
      updateCode();
    });

    solution.addEventListener('click', function() {
      if(solution.value === 'Show solution') {
        textarea.value = solutionEntry;
        solution.value = 'Hide solution';
      } else {
        textarea.value = userEntry;
        solution.value = 'Show solution';
      }
      updateCode();
    });

    var htmlSolution = '<p>Hello and welcome to my motivation page. As <a href="http://www.brainyquote.com/quotes/authors/c/confucius.html"><cite>Confucius\' quotes site</cite></a> says:</p>\n\n<blockquote cite="http://www.brainyquote.com/quotes/authors/c/confucius.html">\n <p>It does not matter how slowly you go as long as you do not stop.</p>\n</blockquote>\n\n<p>I also love the concept of positive thinking, and <q cite="http://www.affirmationsforpositivethinking.com/index.htm">The Need To Eliminate Negative Self Talk</q> (as mentioned in <a href="http://www.affirmationsforpositivethinking.com/index.htm"><cite>Affirmations for Positive Thinking</cite></a>.)</p>';
    var solutionEntry = htmlSolution;

    textarea.addEventListener('input', updateCode);
    window.addEventListener('load', updateCode);

    // stop tab key tabbing out of textarea and
    // make it write a tab at the caret position instead

    textarea.onkeydown = function(e){
      if (e.keyCode === 9) {
        e.preventDefault();
        insertAtCaret('\t');
      }

      if (e.keyCode === 27) {
        textarea.blur();
      }
    };

    function insertAtCaret(text) {
      var scrollPos = textarea.scrollTop;
      var caretPos = textarea.selectionStart;

      var front = (textarea.value).substring(0, caretPos);
      var back = (textarea.value).substring(textarea.selectionEnd, textarea.value.length);
      textarea.value = front + text + back;
      caretPos = caretPos + text.length;
      textarea.selectionStart = caretPos;
      textarea.selectionEnd = caretPos;
      textarea.focus();
      textarea.scrollTop = scrollPos;
    }

    // Update the saved userCode every time the user updates the text area code

    textarea.onkeyup = function(){
      // We only want to save the state when the user code is being shown,
      // not the solution, so that solution is not saved over the user code
      if(solution.value === 'Show solution') {
        userEntry = textarea.value;
      } else {
        solutionEntry = textarea.value;
      }

      updateCode();
    };

## Abbreviations

Another fairly common element you'll meet when looking around the Web is [`<abbr>`](/en-US/docs/Web/HTML/Element/abbr "The HTML Abbreviation element (&lt;abbr>) represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation.") — this is used to wrap around an abbreviation or acronym, and provide a full expansion of the term (included inside a `title` attribute.) Let's look at a couple of examples:

    <p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>

    <p>I think <abbr title="Reverend">Rev.</abbr> Green did it in the kitchen with the chainsaw.</p>

These will come out looking something like this (the expansion will appear in a tooltip when the term is hovered over):

We use HTML to structure our web documents.

I think Rev. Green did it in the kitchen with the chainsaw.

**Note**: There is another element, [`<acronym>`](/en-US/docs/Web/HTML/Element/acronym "The HTML Acronym Element (&lt;acronym>) allows authors to clearly indicate a sequence of characters that compose an acronym or abbreviation for a word. This element has been removed in HTML5. Use &lt;abbr> element."), which basically does the same thing as `<abbr>`, and was intended specifically for acronyms rather than abbreviations. This however has fallen into disuse — it wasn't supported in browsers as well as `<abbr>`, and has such a similar function that it was considered pointless to have both. Just use `<abbr>` instead.

### Active learning: marking up an abbreviation

For this simple active learning assignment, we'd like you to simply mark up an abbreviation. You can use our sample below, or replace it with one of your own.

###### Playable code



    <h2>Live output</h2>

    <div class="output" style="min-height: 50px;">
    </div>

    <h2>Editable code</h2>
    <p class="a11y-label">Press Esc to move focus away from the code area (Tab inserts a tab character).</p>

    <textarea id="code" class="input" style="min-height: 50px; width: 95%">
    <p>NASA sure does some exciting work.</p>
    </textarea>

    <div class="playable-buttons">
      <input id="reset" type="button" value="Reset">
      <input id="solution" type="button" value="Show solution">
    </div>



    html {
      font-family: sans-serif;
    }

    h2 {
      font-size: 16px;
    }

    .a11y-label {
      margin: 0;
      text-align: right;
      font-size: 0.7rem;
      width: 98%;
    }

    body {
      margin: 10px;
      background: #f5f9fa;
    }



    var textarea = document.getElementById('code');
    var reset = document.getElementById('reset');
    var solution = document.getElementById('solution');
    var output = document.querySelector('.output');
    var code = textarea.value;
    var userEntry = textarea.value;

    function updateCode() {
      output.innerHTML = textarea.value;
    }

    reset.addEventListener('click', function() {
      textarea.value = code;
      userEntry = textarea.value;
      solutionEntry = htmlSolution;
      solution.value = 'Show solution';
      updateCode();
    });

    solution.addEventListener('click', function() {
      if(solution.value === 'Show solution') {
        textarea.value = solutionEntry;
        solution.value = 'Hide solution';
      } else {
        textarea.value = userEntry;
        solution.value = 'Show solution';
      }
      updateCode();
    });

    var htmlSolution = '<p><abbr title="National Aeronautics and Space Administration">NASA</abbr> sure does some exciting work.</p>';
    var solutionEntry = htmlSolution;

    textarea.addEventListener('input', updateCode);
    window.addEventListener('load', updateCode);

    // stop tab key tabbing out of textarea and
    // make it write a tab at the caret position instead

    textarea.onkeydown = function(e){
      if (e.keyCode === 9) {
        e.preventDefault();
        insertAtCaret('\t');
      }

      if (e.keyCode === 27) {
        textarea.blur();
      }
    };

    function insertAtCaret(text) {
      var scrollPos = textarea.scrollTop;
      var caretPos = textarea.selectionStart;

      var front = (textarea.value).substring(0, caretPos);
      var back = (textarea.value).substring(textarea.selectionEnd, textarea.value.length);
      textarea.value = front + text + back;
      caretPos = caretPos + text.length;
      textarea.selectionStart = caretPos;
      textarea.selectionEnd = caretPos;
      textarea.focus();
      textarea.scrollTop = scrollPos;
    }

    // Update the saved userCode every time the user updates the text area code

    textarea.onkeyup = function(){
      // We only want to save the state when the user code is being shown,
      // not the solution, so that solution is not saved over the user code
      if(solution.value === 'Show solution') {
        userEntry = textarea.value;
      } else {
        solutionEntry = textarea.value;
      }

      updateCode();
    };





## Marking up contact details

HTML has an element for marking up contact details — [`<address>`](/en-US/docs/Web/HTML/Element/address "The HTML &lt;address> element indicates that the enclosed HTML provides contact information for a person or people, or for an organization."). This simply wraps around your contact details, for example:

    <address>
      <p>Chris Mills, Manchester, The Grim North, UK</p>
    </address>

One thing to remember however is that the [`<address>`](/en-US/docs/Web/HTML/Element/address "The HTML &lt;address> element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.") element is meant for marking up the contact details of the person who wrote the HTML document, not _any_ address. So the above would only be ok if Chris had written the document the markup appears on. Note that something like this would also be ok:

    <address>
      <p>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</p>
    </address>

## Superscript and subscript

You will occasionally need to use superscript and subscript when marking up items like dates, chemical formulae, and mathematical equations so they have the correct meaning. The [`<sup>`](/en-US/docs/Web/HTML/Element/sup "The HTML Superscript element (&lt;sup>) specifies inline text which is to be displayed as superscript for solely typographical reasons.") and [`<sub>`](/en-US/docs/Web/HTML/Element/sub "The HTML Subscript element (&lt;sub>) specifies inline text which should be displayed as subscript for solely typographical reasons.") elements handle this job. For example:

    <p>My birthday is on the 25<sup>th</sup> of May 2001.</p>
    <p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
    <p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>

The output of this code looks like so:

My birthday is on the 25th of May 2001.

Caffeine's chemical formula is C8H10N4O2.

If x2 is 9, x must equal 3 or -3.

## Representing computer code

There are a number of elements available for marking up computer code using HTML:

-   [`<code>`](/en-US/docs/Web/HTML/Element/code "The HTML &lt;code> element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code."): For marking up generic pieces of computer code.
-   [`<pre>`](/en-US/docs/Web/HTML/Element/pre "The HTML &lt;pre> element represents preformatted text which is to be presented exactly as written in the HTML file."): For retaining whitespace (generally code blocks) — if you use indentation or excess whitespace inside your text, browsers will ignore it and you will not see it on your rendered page. If you wrap the text in `<pre></pre>` tags however, your whitespace will be rendered identically to how you see it in your text editor.
-   [`<var>`](/en-US/docs/Web/HTML/Element/var "The HTML Variable element (&lt;var>) represents the name of a variable in a mathematical expression or a programming context."): For specifically marking up variable names.
-   [`<kbd>`](/en-US/docs/Web/HTML/Element/kbd "The HTML Keyboard Input element (&lt;kbd>) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device."): For marking up keyboard (and other types of) input entered into the computer.
-   [`<samp>`](/en-US/docs/Web/HTML/Element/samp "The HTML Sample Element (&lt;samp>) is used to enclose inline text which represents sample (or quoted) output from a computer program."): For marking up the output of a computer program.

Let's look at a few examples. You should try having a play with these (try grabbing a copy of our [other-semantics.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/advanced-text-formatting/other-semantics.html) sample file):

    <pre><code>var para = document.querySelector('p');

    para.onclick = function() {
      alert('Owww, stop poking me!');
    }</code></pre>

    <p>You shouldn't use presentational elements like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</p>

    <p>In the above JavaScript example, <var>para</var> represents a paragraph element.</p>


    <p>Select all the text with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>.</p>

    <pre>$ <kbd>ping mozilla.org</kbd>
    <samp>PING mozilla.org (63.245.215.20): 56 data bytes
    64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>

The above code will look like so:

## Marking up times and dates

HTML also provides the [`<time>`](/en-US/docs/Web/HTML/Element/time "The HTML &lt;time> element represents a specific period in time.") element for marking up times and dates in a machine-readable format. For example:

    <time datetime="2016-01-20">20 January 2016</time>

Why is this useful? Well, there are many different ways that humans write down dates. The above date could be written as:

-   20 January 2016
-   20th January 2016
-   Jan 20 2016
-   20/01/16
-   01/20/16
-   The 20th of next month
-   20e Janvier 2016
-   2016年1月20日
-   And so on

But these different forms cannot be easily recognised by computers — what if you wanted to automatically grab the dates of all events in a page and insert them into a calendar? The [`<time>`](/en-US/docs/Web/HTML/Element/time "The HTML &lt;time> element represents a specific period in time.") element allows you to attach an unambiguous, machine-readable time/date for this purpose.

The basic example above just provides a simple machine readable date, but there are many other options that are possible, for example:

    <!-- Standard simple date -->
    <time datetime="2016-01-20">20 January 2016</time>
    <!-- Just year and month -->
    <time datetime="2016-01">January 2016</time>
    <!-- Just month and day -->
    <time datetime="01-20">20 January</time>
    <!-- Just time, hours and minutes -->
    <time datetime="19:30">19:30</time>
    <!-- You can do seconds and milliseconds too! -->
    <time datetime="19:30:01.856">19:30:01.856</time>
    <!-- Date and time -->
    <time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
    <!-- Date and time with timezone offset-->
    <time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
    <!-- Calling out a specific week number-->
    <time datetime="2016-W04">The fourth week of 2016</time>

## Summary

That marks the end of our study of HTML text semantics. Bear in mind that what you have seen during this course is not an exhaustive list of HTML text elements — we wanted to try to cover the essentials, and some of the more common ones you will see in the wild, or at least might find interesting. To find way more HTML elements, you can take a look at our [HTML element reference](/en-US/docs/Web/HTML/Element) (the [Inline text semantics](/en-US/docs/Web/HTML/Element#Inline_text_semantics) section would be a great place to start.) In the next article we will look at the HTML elements you'd use to structure the different parts of an HTML document.



[__ Previous](/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)[__ Overview: Introduction to HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML)[Next __](/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)







## In this module

-   [Getting started with HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
-   [What’s in the head? Metadata in HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
-   [HTML text fundamentals](/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)
-   [Creating hyperlinks](/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
-   [Advanced text formatting](/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting)
-   [Document and website structure](/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
-   [Debugging HTML](/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML)
-   [Marking up a letter](/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter)
-   [Structuring a page of content](/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content)


