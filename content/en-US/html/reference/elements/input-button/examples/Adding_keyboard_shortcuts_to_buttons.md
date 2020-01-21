---
title: Adding keyboard shortcuts to buttons
height: 100
---
Keyboard shortcuts, also known as access keys and keyboard equivalents, let the user trigger a button using a key or combination of keys on the keyboard. To add a keyboard shortcut to a button — just as you would with any [`<input>`](/en-US/docs/Web/HTML/Element/input) for which it makes sense — you use the `accesskey` global attribute.

In this example, `s` is specified as the access key (you'll need to press `s` plus the particular modifier keys for your browser/OS combination; see [`accesskey`](/en-US/docs/Web/HTML/Global_attributes/accesskey) for a useful list of those).

**Note**: The problem with the above example of course is that the user will not know what the access key is! In a real site, you'd have to provide this information in a way that doesn't interfere with the site design (for example by providing an easily accessible link that points to information on what the site access keys are).

```html
<form>
  <input type="button" value="Start machine" accesskey="s">
</form>
<p>The machine is stopped.</p>
```

```js
const button = document.querySelector('input');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'Start machine') {
    button.value = 'Stop machine';
    paragraph.textContent = 'The machine has started!';
  } else {
    button.value = 'Start machine';
    paragraph.textContent = 'The machine is stopped.';
  }
}
```
