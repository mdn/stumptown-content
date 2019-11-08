---
title: 'The crossorigin attribute: Requesting CORS access to content'
mdn_url: /en-US/docs/Web/HTML/CORS_settings_attributes
related_content: /related_content/html.yaml
recipe: guide
---
In HTML5, some HTML elements which provide support for [CORS](/en-US/docs/Web/HTTP/CORS), such as [`<img>`](/en-US/docs/Web/HTML/Element/img), [`<video>`](/en-US/docs/Web/HTML/Element/video) or [`<script>`](/en-US/docs/Web/HTML/Element/script), have a `crossorigin` attribute (`crossOrigin` property), which lets you configure the CORS requests for the element's fetched data. These attributes are enumerated, and have the following possible values:

| Keyword           | Description                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `anonymous`       | CORS requests for this element will have the credentials flag set to 'same-origin'.                               |
| `use-credentials` | CORS requests for this element will have the credentials flag set to 'include'.                                   |
| `""`              | Setting the attribute name to an empty value, like `crossorigin` or `crossorigin=""`, is the same as `anonymous`. |

By default (that is, when the attribute is not specified), CORS is not used at all. The "anonymous" keyword means that there will be no exchange of **user credentials** via cookies, client-side SSL certificates or HTTP authentication as described in the [Terminology section of the CORS specification](http://www.w3.org/TR/cors/#user-credentials), unless it is in the same origin.

An invalid keyword and an empty string will be handled as the `anonymous` keyword.

### Example: crossorigin with the script element

You can use the following [`<script>`](/en-US/docs/Web/HTML/Element/script) element to tell a browser to execute the `https://example.com/example-framework.js` script without sending user-credentials.

    <script src="https://example.com/example-framework.js" crossorigin="anonymous"></script>

### Example: Web manifest with credentials

The `use-credentials` value must be used when fetching a manifest that requires credentials, even if the file is from the same origin.

    <link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials">

## Browser compatibility

### &lt;script crossorigin&gt;

{{{{{embed-compat:html.elements.script.crossorigin}}}}}

### &lt;video crossorigin&gt;

{{{{{embed-compat:html.elements.video.crossorigin}}}}}

## See also

- [Cross-Origin Resource Sharing (CORS)](/en-US/docs/Web/HTTP/CORS)
