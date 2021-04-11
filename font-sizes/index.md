---
name: font sizes
layout: mixin
description: Accessible responsive font sizes
example: |
  @use "~@hendotcat/picknmix";
  :root {
    @include picknmix.font-sizes;
  }
  p {
    width: var(--picknmix-font-size-12);
  }
---

This responsive font size mixin supports viewport widths as narrow as 128px.
For widths of 128px and below, all text is exactly `1rem` in size in order to
fit as much content as possible within the limited space. As the viewport
grows wider and can thus hold larger text, the sizes scale up. They max out and
stop growing when the viewport width hits 544px.

The following graph shows the growth of the font sizes viewport widths from
128px to 1024px.

{% include font-sizes-plot.svg %}

The math behind the growth of these font sizes is tuned for compatibility with
the [`column`](/column) mixin. So the plateaus in the growth of the font sizes
coincides with the growth phase of the `column` mixin's margin. This causes
the font sizes to scale with the width of the column instead of the width of
the viewport.

<video
  autoplay
  controls
  loop
  src="/font-sizes/margin-pause.mp4"
  aria-label="The Google Chrome dev tools with a page containing a cyan box. As the page is widened, the text grows with it. Around 256px of width, the text briefly stops growing with the page width as the box containing the text stays the same size for a moment."
/>

The font sizes are implemented with relative units rather than an absolute
value such as pixels. This causes them to scale up for users who resize the
text.

<blockquote>
  <p>
    <strong>Resize text</strong>: Except for captions and images of text, text
    can be resized without assistive technology up to 200 percent without loss
    of content or functionality. (Level AA)
  </p>
  <footer>
    <cite>
      <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html">
        WCAG 2.0 SC 1.4.4
      </a>
    </cite>
  </footer>
</blockquote>

Because the font sizes are relative and converge towards `1rem` on smaller
viewports, browser-native text resizing has more impact on smaller font sizes
than larger ones. This is helpful because the larger sizes are already very,
very large, so if a user is still zooming in further then it's presumably
because one of the smaller sizes is still too small for them.

The largest font sizes are, in fact, already 200% larger than the base `1rem`
font size. So it's not particularly helpful for those to scale up another 200%.
The most helpful thing is if the smaller text gets bigger without the larger
text becoming unnecessarily large to the extent that single words no longer fit
in the viewport. The following video shows the resizing behavior of the font
sizes on iOS. Maxing out the zoom level at 300% takes all the font sizes to
`1rem` so that all of them become extremely easy to read but none of them
become so big that a single word no longer fits on the screen.

<video
  autoplay
  controls
  loop
  src="/font-sizes/mobile-zoom.mp4"
  aria-label="Mobile Safari with the text size controls enabled and 4 lines of text on the page. As the text size increases, the smaller text grows faster than the larger text. At 300% zoom, all lines are the same size."
/>

