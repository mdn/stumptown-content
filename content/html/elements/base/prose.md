## Short description

The **HTML `<base>` element** specifies the base URL to use for all
relative URLs contained within a document. There can be only one
`<base>` element in a document.

## Overview

The base URL of a document can be queried from a script using
[`document.baseURI`](/en-US/docs/Web/API/Document/baseURI).

## Usage notes

If multiple `<base>` elements are specified, only the first `href` and
first `target` value are used; all others are ignored.
