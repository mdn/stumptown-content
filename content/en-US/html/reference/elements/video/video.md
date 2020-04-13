---
title: '<video>: The Video Embed element'
short_title: <video>
mdn_url: /en-US/docs/Web/HTML/Element/video
specifications: https://html.spec.whatwg.org/multipage/media.html#the-video-element
tags:
    group: Image and multimedia
api: HTMLVideoElement
permitted_aria_roles: application
tag_omission: none
interactive_example:
    url: https://interactive-examples.mdn.mozilla.net/pages/tabbed/video.html
    height: html-standard
browser_compatibility: html.elements.video
examples:
    - examples/simple-example.md
    - examples/multiple-sources-example.md
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML Video element** (**`<video>`**) embeds a media player which
supports video playback into the document.

## Description

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

- If you don't specify the `controls` attribute, the video won't
  include the browser's default controls; you can create your own
  custom controls using JavaScript and the
  [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) API. See [Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player) for more details.
- To allow precise control over your video (and audio) content,
  `HTMLMediaElement`s fire many different
  [events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).
- You can use the [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property to adjust
  the positioning of the video within the element's frame, and the
  [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property to control how the video's size
  is adjusted to fit within the frame.
- To show subtitles/captions along with your video, you can use some
  JavaScript along with the [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track) element and the
  [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) format. See [Adding
  captions and subtitles to HTML5
  video](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)
  for more information.

A good general source of information on using HTML `<video>` is the
[Video and audio
content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
beginner's tutorial.

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

## Accessibility concerns

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

- [MDN Subtitles and closed caption —
  Plugins](https://developer.mozilla.org/en-US/docs/Plugins/Flash_to_HTML5/Video/Subtitles_captions)
- [Web Video Text Tracks Format
  (WebVTT)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
- [WebAIM: Captions, Transcripts, and Audio
  Descriptions](https://webaim.org/techniques/captions/)
- [MDN Understanding WCAG, Guideline 1.2
  explanations](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.2_—_Providing_text_alternatives_for_time-based_media)
- [Understanding Success Criterion 1.2.1 | W3C Understanding WCAG
  2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html)
- [Understanding Success Criterion 1.2.2 | W3C Understanding WCAG
  2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html)

## See also

- [Media formats supported by the audio and video
  elements](https://developer.mozilla.org/en-US/docs/Media_formats_supported_by_the_audio_and_video_elements)
- Positioning and sizing the picture within its frame:
  `object-position` and `object-fit`
- `<audio>`
- [Using HTML5 audio and
  video](https://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video)
- [Manipulating video using
  canvas](https://developer.mozilla.org/en-US/docs/Manipulating_video_using_canvas)
- [Configuring servers for Ogg
  media](https://developer.mozilla.org/en-US/docs/Configuring_servers_for_Ogg_media)
