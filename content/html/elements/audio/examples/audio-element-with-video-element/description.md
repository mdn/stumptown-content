This example specifies which audio track to embed using the `src`
attribute on a nested `<source>` element rather than directly on the
`<audio>` element. It is always useful to include the file's MIME type
inside the `type` attribute, as the browser is able to instantly tell if
it can play that file, and not waste time on it if not.
