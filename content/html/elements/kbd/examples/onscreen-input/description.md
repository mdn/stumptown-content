---
title: Onscreen input
width: 672
height: 162
---
Nesting a `<samp>` element inside a `<kbd>` element represents input
which is based on text presented by the system, such as the names of
menus and menu items, or the names of buttons displayed on the screen.

For example, you can explain how to choose the "New Document" option
in the "File" menu using the HTML below.

This does some interesting nesting. For the menu option description, the
entire input is enclosed in a `<kbd>` element. Then, inside that, both
the menu and menu item names are contained within both `<kbd>` and
`<samp>`, indicating an input which is selected from a screen widget.

Similarly, the representation of the keyboard shortcut is done by
enclosing the entire keyboard shortcut text inside `<kbd>`, but by also
wrapping each key in its own `<kbd>` element.

You don't need to do all this wrapping; you can choose to simplify it
by leaving out the external `<kbd>` element. In other words, simplifying
this to just `<kbd>Ctrl</kbd>+<kbd>N</kbd>` would be perfectly valid.

Depending on your style sheet , though, you may find it useful to do
this kind of nesting.
