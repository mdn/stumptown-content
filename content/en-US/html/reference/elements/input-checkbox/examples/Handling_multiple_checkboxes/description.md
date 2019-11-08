---
title: Handling multiple checkboxes
height: 200
---
In this example we include multiple checkboxes to allow the user to select their interests.

We've given each checkbox the same `name`. If both checkboxes are checked and then the form is submitted, you'll get a string of name/value pairs submitted like this: `interest=coding&interest=music`. When this string reaches the server, you need to parse it other than as an associative array, so all values, not only the last value, of `interest` are captured.
