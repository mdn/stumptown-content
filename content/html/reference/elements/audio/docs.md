---
title: '<audio>: The Embed Audio element'
mdn_url: https://developer.mozilla.org/docs/Web/HTML/Element/audio
tags:
    group: Image and multimedia
api: HTMLAudioElement
permitted_aria_roles: application
tag_omission: none
interactive_example: https://interactive-examples.mdn.mozilla.net/pages/tabbed/audio.html
browser_compatibility: html.elements.audio
examples:
    - examples/simple-example
    - examples/audio-element-with-video-element
    - examples/multiple-source-elements
attributes:
    element_specific: ./attributes
    global: /content/html/global_attributes
recipe: html-element
---

## Short description

The **HTML `<audio>` element** is used to embed sound content in
documents. It may contain one or more audio sources, represented using
the `src` attribute or the
[`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
element: the browser will choose the most suitable one. It can also be
the destination for streamed media, using a
[`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream).

## Overview

In a similar manner to the
[`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
element, we include a path to the media we want to embed inside the
`src` attribute; we can include other attributes to specify information
such as whether we want it to autoplay and loop, whether we want to show
the browser's default audio controls, etc.

The content inside the opening and closing `<audio></audio>` tags is
shown as a fallback in browsers that don't support the element.

Browsers don't all support the same [audio
formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats); you can provide
multiple sources inside nested
[`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
elements, and the browser will then use the first one it understands:

```html
<audio controls>
  <source src="myAudio.mp3" type="audio/mp3">
  <source src="myAudio.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio. Here is
     a <a href="myAudio.mp4">link to the audio</a> instead.</p>
</audio>
```

Other usage notes:

- If you don't specify the `controls` attribute, the audio player
  won't include the browser's default controls; you can create your
  own custom controls using JavaScript and the
  [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
  API.
- To allow precise control over your audio content,
  `HTMLMediaElement`s fire many different
  [events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).
- You can also use the [Web Audio
  API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to directly generate and
  manipulate audio streams from JavaScript code.
- `<audio>` elements can't have subtitles/captions associated with
  them in the same way that `<video>` elements can. See [WebVTT and
  Audio](https://www.iandevlin.com/blog/2015/12/html5/webvtt-and-audio)
  by Ian Devlin for some useful information and workarounds.

A good general source of information on using HTML `<audio>` is the
[Video and audio
content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
beginner's tutorial.

### Styling with CSS

The `<audio>` element has no intrinsic visual output of its own unless
the `controls` attribute is specified, in which case the browser's
default controls are shown.

The default controls have a
[`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
value of `inline` by default, and it is often a good idea set the value
to `block` to improve control over positioning and layout, unless you
want it to sit within a text block or similar.

You can style the default controls with properties that affect the block
as a single unit, so for example you can give it a
[`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
and
[`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius),
[`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding),
[`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin),
etc. You can't however style the individual components inside the audio
player (e.g. change the button size or icons, change the font, etc.),
and the controls are different across the different browsers.

To get a consistent look and feel across browsers, you\'ll need to
create custom controls; these can be marked up and styled in whatever
way you want, and then JavaScript can be used along with the
[`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
API to wire up their functionality.

[Video player styling
basics](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Video_player_styling_basics)
provides some useful styling techniques --- it is written in the context
of `<video>`, but much of it is equally applicable to `<audio>`.

### Detecting addition and removal of tracks

You can detect when tracks are added to and removed from an `<audio>`
element using the `addtrack` and `removetrack` events. However, these
events aren't sent directly to the `<audio>` element itself. Instead,
they\'re sent to the track list object within the `<audio>` element's
[`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
that corresponds to the type of track that was added to the element:

* [`HTMLMediaElement.audioTracks`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/audioTracks): An
  [`AudioTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList)
  containing all of the media element's audio tracks. You can add a
  listener for `addtrack` to this object to be alerted when new audio
  tracks are added to the element.

* [`HTMLMediaElement.videoTracks`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/videoTracks): Add an `addtrack` listener to this
  [`VideoTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList)
  object to be informed when video tracks are added to the element.

* [`HTMLElement.textTracks`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/textTracks): Add an `addtrack` event listener to this
  [`TextTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrackList)
  to be notified when new text tracks are added to the element.

**Note:** Even though it's an `<audio>` element, it still has video and
text track lists, and can in fact be used to present video, although the
use interface implications can be odd.

For example, to detect when audio tracks are added to or removed from an
`<audio>` element, you can use code like this:

```js
var elem = document.querySelector("audio");

elem.audioTrackList.onaddtrack = function(event) {
  trackEditor.addTrack(event.track);
};

elem.audioTrackList.onremovetrack = function(event) {
  trackEditor.removeTrack(event.track);
};
```

This code watches for audio tracks to be added to and removed from the
element, and calls a hypothetical function on a track editor to register
and remove the track from the editor's list of available tracks.

You can also use
[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to listen for the `addtrack` and `removetrack` events.

## Accessibility concerns

Audio with spoken dialog should provide both captions and transcripts
that accurately describe its content. Captions allow people who are
experiencing hearing loss to understand an audio recording's content as
the recording is being played, while transcripts allow people who need
additional time to be able to review the recording's content at a pace
and format that is comfortable for them.

If automatic captioning services are used, it is important to review the
generated content to ensure it accurately represents the source audio.

In addition to spoken dialog, subtitles and transcripts should also
identify music and sound effects that communicate important information.
This includes emotion and tone:

```
    1
    00:00:00 --> 00:00:45
    [Energetic techno music]

    2
    00:00:46 --> 00:00:51
    Welcome to the Time Keeper's podcast! In this episode we're discussing which Swisswatch is a wrist switchwatch?

    16
    00:00:52 --> 00:01:02
    [Laughing] Sorry! I mean, which wristwatch is a Swiss wristwatch?
```

- [MDN Subtitles and closed caption --- Plugins](https://developer.mozilla.org/en-US/docs/Plugins/Flash_to_HTML5/Video/Subtitles_captions)
- [Web Video Text Tracks Format (WebVTT)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
- [WebAIM: Captions, Transcripts, and Audio Descriptions](https://webaim.org/techniques/captions/)
- [MDN Understanding WCAG, Guideline 1.2 explanations](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#Guideline_1.2_—_Providing_text_alternatives_for_time-based_media)
- [Understanding Success Criterion 1.2.1 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html)
- [Understanding Success Criterion 1.2.2 \| W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html)

## See also

- [Media formats supported by the audio and video elements](https://developer.mozilla.org/en-US/docs/Media_formats_supported_by_the_audio_and_video_elements)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web_Audio_API)
- [`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
- [`nsIDOMHTMLMediaElement`](https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement)
- [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
- [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [Using audio and video](https://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video)
- [Cross-browser audio basics](https://developer.mozilla.org/en-US/docsApps/Fundamentals/Audio_and_video_delivery/Cross-browser_audio_basics)
- [The `audio` element](https://www.whatwg.org/specs/web-apps/current-work/#audio) (HTML5 specification)
