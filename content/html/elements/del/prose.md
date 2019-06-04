## Short description

The **HTML `<del>` element** represents a range of text that has been
deleted from a document. This can be used when rendering
change tracking or source code diffs, for example. The
[`<ins>`](/en-US/docs/Web/HTML/Element/ins)
element can be used for the opposite purpose: to indicate text that has
been added to the document.

## Accessibility concerns
The presence of the `del` element is not announced by most screen
reading technology in its default configuration. It can be made to be
announced by using the CSS
[`content`](/en-US/docs/Web/CSS/content)
property, along with the
[`::before`](/en-US/docs/Web/CSS/::before)
and
[`::after`](/en-US/docs/Web/CSS/::after)
pseudo-elements.

```css
    del::before,
    del::after {
      clip-path: inset(100%);
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    del::before {
      content: " [deletion start] ";
    }

    del::after {
      content: " [deletion end] ";
    }
```

Some people who use screen readers deliberately disable announcing
content that creates extra verbosity. Because of this, it is important
to not abuse this technique and only apply it in situations where not
knowing content has been deleted would adversely affect understanding.

- [Short note on making your mark (more accessible) \| The Paciello
  Group](https://developer.paciellogroup.com/blog/2017/12/short-note-on-making-your-mark-more-accessible/)
- [Tweaking Text Level Styles \| Adrian
  Roselli](http://adrianroselli.com/2017/12/tweaking-text-level-styles.html)

## See also

- [`<ins>`](/en-US/docs/Web/HTML/Element/ins)
  element for insertions into a text
- [`<s>`](/en-US/docs/Web/HTML/Element/s)
  element for strike-through separate from representing deletion of
  text
