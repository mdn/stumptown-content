---
title: A simple button
height: 142
---
In this example we create a simple button with a `click` event handler that starts our machine.

The script gets a reference to the [`HTMLInputElement`](/en-US/docs/Web/API/HTMLInputElement) object representing the `<input>` in the DOM, saving this reference in the variable `button`. [`addEventListener()`](/en-US/docs/Web/API/EventTarget/addEventListener) is then used to establish a function that will be run when `click` events occur on the button.

```html
<form> 
  <input type="button" value="Start machine">
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
