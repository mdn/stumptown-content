<!-- <prose.short-description> -->
The **HTML Video element** (**`<video>`**) embeds a media player which
supports video playback into the document.
<!-- </prose.short-description> --> 

<!-- <prose.overview> -->
You can use `<video>` for audio content as well, but the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
element may provide a more appropriate user experience.

In a similar manner to the [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) element, we include a path to the media we want to display inside the `src` attribute; we can
include other attributes to specify information such as video width and
height, whether we want it to autoplay and loop, whether we want to show
the browser's default video controls, etc.

The content inside the opening and closing `<video></video>` tags is
shown as a fallback in browsers that don't support the element.

Browsers don't all support the same [video
formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats); you can provide
multiple sources inside nested [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) elements, and
the browser will then use the first one it understands:

```html
<video controls>
  <source src="myVideo.mp4" type="video/mp4">
  <source src="myVideo.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is
     a <a href="myVideo.mp4">link to the video</a> instead.</p>
</video>
```

Other usage notes:

-   If you don't specify the `controls` attribute, the video won't
    include the browser's default controls; you can create your own
    custom controls using JavaScript and the
    [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) API. See [Creating a cross-browser
    video
    player](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player)
    for more details.
-   To allow precise control over your video (and audio) content,
    `HTMLMediaElement`s fire many different
    [events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).
-   You can use the [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property to adjust
    the positioning of the video within the element's frame, and the
    [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property to control how the video's size
    is adjusted to fit within the frame.
-   To show subtitles/captions along with your video, you can use some
    JavaScript along with the [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track) element and the
    [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) format. See [Adding
    captions and subtitles to HTML5
    video](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)
    for more information.

A good general source of information on using HTML `<video>` is the
[Video and audio
content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
beginner's tutorial.
<!-- </prose.overview> -->

<!-- <prose.attributes> -->
Attributes
----------

Like all other HTML elements, this element supports the [global
attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

<dl>
 <dt><code>autoplay</code></dt>
 <dd>A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.</dd>
 <dd>
 <p class="note"><strong>Note</strong>: Sites that automatically play audio (or video with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.</p>

 <p class="note">To disable video autoplay, <code>autoplay="false"</code> will not work; the video will autoplay if the attribute is there in the <code>&lt;video&gt;</code> tag at all. To remove autoplay the attribute needs to be removed altogether.</p>
 </dd>
</dl>

<dl>
 <dt><code>buffered</code></dt>
 <dd>An attribute you can read to determine the time ranges of the buffered media. This attribute contains a <code>TimeRanges</code> object.</dd>
 <dt><code>controls</code></dt>
 <dd>If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.</dd>
 <dt><code>crossorigin</code></dt>
 <dd>This enumerated attribute indicates whether to use CORS to fetch the related image. <a href="/en-US/docs/CORS_Enabled_Image">CORS-enabled resources</a> can be reused in the <code>&lt;canvas&gt;</code> element without being <em>tainted</em>. The allowed values are:
 <dl>
  <dt><code>anonymous</code></dt>
  <dd>Sends a cross-origin request without a credential. In other words, it sends the <code>Origin:</code> HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the <code>Access-Control-Allow-Origin:</code> HTTP header), the image will be <em>tainted</em>, and its usage restricted.</dd>
  <dt><code>use-credentials</code></dt>
  <dd>Sends a cross-origin request with a credential. In other words, it sends the <code>Origin:</code> HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through <code>Access-Control-Allow-Credentials:</code> HTTP header), the image will be <em>tainted</em> and its usage restricted.</dd>
 </dl>
 When not present, the resource is fetched without a CORS request (i.e. without sending the <code>Origin:</code> HTTP header), preventing its non-tainted used in <code>&lt;canvas&gt;</code> elements. If invalid, it is handled as if the enumerated keyword <code>anonymous</code> was used. See <a href="/en-US/docs/HTML/CORS_settings_attributes">CORS settings attributes</a> for additional information.</dd>
 <dt><code>height</code></dt>
 <dd>The height of the video's display area, in <a href="https://drafts.csswg.org/css-values/#px">CSS pixels</a> (absolute values only; <a href="https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes">no percentages</a>.)</dd>
 <dt><code>loop</code></dt>
 <dd>A Boolean attribute; if specified, the browser will automatically seek back to the start upon reaching the end of the video.</dd>
 <dt><code>muted</code></dt>
 <dd>A Boolean attribute that indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced. Its default value is <code>false</code>, meaning that the audio will be played when the video is played.</dd>
 <dt><code>preload</code></dt>
 <dd>This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience with regards to what content is loaded before the video is played. It may have one of the following values:
 <ul>
  <li><code>none</code>: Indicates that the video should not be preloaded.</li>
  <li><code>metadata</code>: Indicates that only video metadata (e.g. length) is fetched.</li>
  <li><code>auto</code>: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.</li>
  <li><em>empty string</em>: Synonym of the <code>auto</code> value.</li>
 </ul>

 <p>If not set, its default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to <code>metadata</code>.</p>

 <div class="note"><strong>Notes:</strong>

 <ul>
  <li>The <code>autoplay</code> attribute has precedence over <code>preload</code>. If <code>autoplay</code> is specified, the browser would obviously need to start downloading the video for playback.</li>
  <li>The specification does not force the browser to follow the value of this attribute; it is a mere hint.</li>
 </ul>
 </div>
 </dd>
 <dt>&nbsp;</dt>
 <dt><code>intrinsicsize</code></dt>
 <dd>This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and <code>naturalWidth</code>/<code>naturalHeight</code> on images would return the values specified in this attribute. <a href="https://github.com/ojanvafai/intrinsicsize-attribute">Explainer</a>, <a href="https://googlechrome.github.io/samples/intrinsic-size/index.html">examples</a></dd>
 <dt><code>poster</code></dt>
 <dd>A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame.</dd>
 <dt><code>src</code></dt>
 <dd>The URL of the video to embed. This is optional; you may instead use the <code>&lt;source&gt;</code> element within the video block to specify the video to embed.</dd>
 <dt><code>width</code></dt>
 <dd>The width of the video's display area, in <a href="https://drafts.csswg.org/css-values/#px">CSS pixels</a> (absolute values only; <a href="https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes">no percentages</a>).</dd>
 <dt><code>playsinline</code></dt>
 <dd>A Boolean attribute indicating that the video is to be played "inline", that is within the element's playback area. Note that the absence of this attribute <em>does not</em> imply that the video will always be played in fullscreen.</dd>
</dl>

<!-- </prose.attributes> -->

<!-- <prose.usage-notes> -->
Usage notes
-----------

### Styling with CSS

The `<video>` element is a replaced element — its `display`
value is `inline` by default, but its default width and height in the
viewport is defined by the video being embedded.

There are no special considerations for styling `<video>`; a common
strategy is to give it a `display` value of `block` to make it easier to
position, size, etc., and then provide styling and layout information as
required. [Video player styling
basics](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Video_player_styling_basics)
provides some useful styling techniques.

### Server support for video

If the MIME type for the video is not set correctly on the server, the
video may not show or show a gray box containing an X (if JavaScript is
enabled).

If you use Apache Web Server to serve Ogg Theora videos, you can fix
this problem by adding the video file type extensions to "video/ogg"
MIME type. The most common video file type extensions are ".ogm",
".ogv", or ".ogg". To do this, edit the "mime.types" file in
"/etc/apache" or use the `"AddType"` configuration directive in
`httpd.conf`.

```
AddType video/ogg .ogm
AddType video/ogg .ogv
AddType video/ogg .ogg
```

If you serve your videos as WebM, you can fix this problem for the
Apache Web Server by adding the extension used by your video files
(".webm" is the most common one) to the MIME type "video/webm" via the
"mime.types" file in "/etc/apache" or via the "AddType" configuration
directive in `httpd.conf`.

```
AddType video/webm .webm
```

Your web host may provide an easy interface to MIME type configuration
changes for new technologies until a global update naturally occurs.

<!-- <prose.accessibility-concerns> -->
Accessibility concerns
----------------------

Videos should provide both captions and transcripts that accurately
describe its content (see [Adding captions and subtitles to HTML5
video](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)
for more information on how to implement these). Captions allow people
who are experiencing hearing loss to understand a video's audio content
as the video is being played, while transcripts allow people who need
additional time to be able to review audio content at a pace and format
that is comfortable for them.

If automatic captioning services are used, it is important to review the
generated content to ensure it accurately represents the source video.

In addition to spoken dialog, subtitles and transcripts should also
identify music and sound effects that communicate important information.
This includes emotion and tone:

```
14
00:03:14 --> 00:03:18
[Dramatic rock music]

15 
00:03:19 --> 00:03:21
[whispering] What's that off in the distance?

16
00:03:22 --> 00:03:24
It's… it's a…

16 00:03:25 --> 00:03:32
[Loud thumping]
[Dishes clattering]
```

Captions should not obstruct the main subject of the video. They can be
positioned using [the `align` VTT cue
setting](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API#Cue_settings).

-   [MDN Subtitles and closed caption —
    Plugins](https://developer.mozilla.org/en-US/docs/Plugins/Flash_to_HTML5/Video/Subtitles_captions)
-   [Web Video Text Tracks Format
    (WebVTT)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
-   [WebAIM: Captions, Transcripts, and Audio
    Descriptions](https://webaim.org/techniques/captions/)
-   [MDN Understanding WCAG, Guideline 1.2
    explanations](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.2_—_Providing_text_alternatives_for_time-based_media)
-   [Understanding Success Criterion 1.2.1 | W3C Understanding WCAG
    2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html)
-   [Understanding Success Criterion 1.2.2 | W3C Understanding WCAG
    2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html)
<!-- </prose.accessibility-concerns> -->

<!-- <prose.see-also> -->
See also
--------

-   [Media formats supported by the audio and video
    elements](https://developer.mozilla.org/en-US/docs/Media_formats_supported_by_the_audio_and_video_elements)
-   Positioning and sizing the picture within its frame:
    `object-position` and `object-fit`
-   `<audio>`
-   [Using HTML5 audio and
    video](https://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video)
-   [Manipulating video using
    canvas](https://developer.mozilla.org/en-US/docs/Manipulating_video_using_canvas)
-   [Configuring servers for Ogg
    medi](https://developer.mozilla.org/en-US/docs/Configuring_servers_for_Ogg_media)
<!-- <prose.see-also> -->
