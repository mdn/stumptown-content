---
title: Disabling a button
height: 200
---
To disable a button, specify the `disabled` global attribute on it, like so:

    <input type="button" value="Disable me" disabled>

You can enable and disable buttons at run time by simply setting `disabled` to `true` or `false`. In this example our button starts off enabled, but if you press it, it is disabled using `button.disabled = true`. A [`setTimeout()`](/en-US/docs/Web/API/WindowTimers/setTimeout) function is then used to reset the button back to its enabled state after two seconds.

If the `disabled` attribute isn't specified, the button inherits its `disabled` state from its parent element. This makes it possible to enable and disable groups of elements all at once by enclosing them in a container such as a [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset) element, and then setting `disabled` on the container.

The example below shows this in action. The `disabled` attribute is set on the `<fieldset>` when the first button is pressed — this causes all three buttons to be disabled until the two second timeout has passed.

**Note**: Firefox will, unlike other browsers, by default, [persist the dynamic disabled state](http://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](/en-US/docs/Web/HTML/Element/button) across page loads. Use the `autocomplete` attribute to control this feature.

```html
<fieldset>
  <legend>Button group</legend>
  <input type="button" value="Button 1">
  <input type="button" value="Button 2">
  <input type="button" value="Button 3">
</fieldset>
```

```js
const button = document.querySelector('input');
const fieldset = document.querySelector('fieldset');

button.addEventListener('click', disableButton);

function disableButton() {
  fieldset.disabled = true;
  window.setTimeout(function() {
    fieldset.disabled = false;
  }, 2000);
}
```
