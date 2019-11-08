---
title: 'Allowing cross-origin use of images and canvas'
mdn_url: /en-US/docs/Web/HTML/CORS_enabled_image
related_content: /related_content/html.yaml
recipe: guide
---
HTML provides a `crossorigin` attribute for images that, in combination with an appropriate [CORS](/en-US/docs/Glossary/CORS) header, allows images defined by the [`<img>`](/en-US/docs/Web/HTML/Element/img) element that are loaded from foreign origins to be used in a [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas) as if they had been loaded from the current origin.

See [CORS settings attributes](/en-US/docs/Web/HTML/CORS_settings_attributes) for details on how the `crossorigin` attribute is used.

## Security and tainted canvases

Because the pixels in a canvas's bitmap can come from a variety of sources, including images or videos retrieved from other hosts, it's inevitable that security problems may arise.

As soon as you draw into a canvas any data that was loaded from another origin without CORS approval, the canvas becomes **tainted**. A tainted canvas is one which is no longer considered secure, and any attempts to retrieve image data back from the canvas will cause an exception to be thrown.

If the source of the foreign content is an HTML [`<img>`](/en-US/docs/Web/HTML/Element/img) or SVG [`<svg>`](/en-US/docs/Web/SVG/Element/svg) element, attempting to retrieve the contents of the canvas isn't allowed.

If the foreign content comes from an image obtained from either as [`HTMLCanvasElement`](/en-US/docs/Web/API/HTMLCanvasElement) or [`ImageBitMap`](/en-US/docs/Web/API/ImageBitMap), and the image source doesn't meet the same origin rules, attempts to read the canvas's contents are blocked.

Calling any of the following on a tainted canvas will result in an error:

- Calling [`getImageData()`](/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) on the canvas's context
- Calling [`toBlob()`](/en-US/docs/Web/API/HTMLCanvasElement/toBlob) on the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas) element itself
- Calling [`toDataURL()`](/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) on the canvas

Attempting any of these when the canvas is tainted will cause a `SecurityError` to be thrown. This protects users from having private data exposed by using images to pull information from remote web sites without permission.

## Storing an image from a foreign origin

In this example, we wish to permit images from a foreign origin to be retrieved and saved to local storage. Implementing this requires configuring the server as well as writing code for the web site itself.

### Web server configuration

The first thing we need is a server that's configured to host images with the [`Access-Control-Allow-Origin`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header configured to permit cross-origin access to image files.

Let's assume we're serving our site using [Apache](https://httpd.apache.org/). Consider the HTML5 Boilerplate [Apache server configuration file for CORS images](https://github.com/h5bp/server-configs-apache/blob/master/src/cross-origin/images.conf), shown below:

    <IfModule mod_setenvif.c>
      <IfModule mod_headers.c>
        <FilesMatch "\.(bmp|cur|gif|ico|jpe?g|png|svgz?|webp)$">
          SetEnvIf Origin ":" IS_CORS
          Header set Access-Control-Allow-Origin "*" env=IS_CORS
        </FilesMatch>
      </IfModule>
    </IfModule>

In short, this configures the server to allow graphic files (those with the extensions ".bmp", ".cur", ".gif", ".ico", ".jpg", ".jpeg", ".png", ".svg", ".svgz", and ".webp") to be accessed cross-origin from anywhere on the internet.

### Implementing the save feature

Now that the server has been configured to allow retrieval of the images cross-origin, we can write the code that allows the user to save them to local [local storage](/en-US/docs/Web/API/Web_Storage_API), just as if they were being served from the same domain the code is running on.

The key is to use the `crossorigin` attribute by setting [`crossOrigin`](/en-US/docs/Web/API/HTMLImageElement/crossOrigin) on the [`HTMLImageElement`](/en-US/docs/Web/API/HTMLImageElement) into which the image will be loaded. This tells the browser to request cross-origin access when trying to download the image data.

#### Starting the download

The code that starts the download (say, when the user clicks a "Download" button), looks like this:

    function startDownload() {
      let imageURL = "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";
     
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = imageURL;
    }

We're using a hard-coded URL here (`imageURL`), but that could easily come from anywhere. To begin downloading the image, we create a new [`HTMLImageElement`](/en-US/docs/Web/API/HTMLImageElement) object by using the [`Image()`](/en-US/docs/Web/API/HTMLImageElement/Image) constructor. The image is then configured to allow cross-origin downloading by setting its `crossOrigin` attribute to `"Anonymous"` (that is, allow non-authenticated downloading of the image cross-origin). An event listener is added for the `load` event being fired on the image element, which means the image data has been received.

Finally, the image's [`src`](/en-US/docs/Web/API/HTMLImageElement/src) attribute is set to the URL of the image to download; this triggers the download to begin.

#### Receiving and saving the image

The code that handles the newly-downloaded image is found in the `imageReceived()` method:

    function imageReceived() {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      canvas.width = downloadedImg.width;
      canvas.height = downloadedImg.height;
     
      context.drawImage(downloadedImg, 0, 0);
      imageBox.appendChild(canvas);
     
      try {
        localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
      }
      catch(err) {
        console.log("Error: " + err);
      }  
    }

`imageReceived()` is called to handle the `"load"` event on the `HTMLImageElement` that receives the downloaded image. This event is triggered once the downloaded data is all available. It begins by creating a new [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas) element that we'll use to convert the image into a data URL, and by getting access to the canvas's 2D drawing context ([`CanvasRenderingContext2D`](/en-US/docs/Web/API/CanvasRenderingContext2D)) in the variable `context`.

The canvas's size is adjusted to match the received image, then the image is drawn into the canvas using [`drawImage()`](/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage). The canvas is then inserted into the document so the image is visible.

Now it's time to actually save the image locally. To do this, we use the Web Storage API's local storage mechanism, which is accessed through the [`localStorage`](/en-US/docs/Web/API/Window/localStorage) global. The canvas method [`toDataURL()`](/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) is used to convert the image into a data:// URL representing a PNG image, which is then saved into local storage using [`setItem()`](/en-US/docs/Web/API/Storage/setItem).

You can [try out](https://cors-image-example.glitch.me/) or [remix](https://glitch.com/edit/#!/remix/cors-image-example) this example on Glitch.

## See also

- [Using Cross-domain images in WebGL and Chrome 13](http://blog.chromium.org/2011/07/using-cross-domain-images-in-webgl-and.html)
- [HTML Specification - the `crossorigin` attribute](http://whatwg.org/html#attr-img-crossorigin)
- [Web Storage API](/en-US/docs/Web/API/Web_Storage_API)
