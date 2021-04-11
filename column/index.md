---
name: column
layout: mixin
description: Accessible single-column responsive layout
example: |
  @use "~@hendotcat/picknmix";
  :root {
    @include picknmix.column;
  }
  p {
    width: var(--picknmix-column);
  }
---

This single-column responsive layout mixin supports viewport widths as narrow
as 128px. For widths below 256px it applies no margin in order to conserve
space for content. A 16px margin is applied to wider viewports to create some
breathing room around content. At 512px, the width maxes out and stops growing.

The following graph shows the growth of the column width (in purple) and the
padding (in blue) for viewport widths from 128px to 1024px.

{% include column-plot.svg %}

The plateau in the growth of the column width coincides with the growth phase
of the margin. This allows the margin to grow without the combined width of
both values exceeding the viewport width. The following animated GIF
illustrates the effect of this growth pause.

<img
  src="/column/margin.gif"
  alt="Animation showing the smooth transition between the no-margin layout and the margin layout"
/>

The column width is implemented with relative units rather than an absolute
value such as pixels. This causes the width to scale up for users who resize
the text. On desktop-size viewports this is important because otherwise the
resized text would still have only 512px of width to fit inside, and lines
would get shorter and shorter as the text size increased.

WCAG 2.0 success criterion 1.4.4 requires authors to support a zoom level of up
to 200% without loss of content or functionality.

> **Resize text**: Except for captions and images of text, text can be resized
> without assistive technology up to 200 percent without loss of content or
> functionality. (Level AA)
>
> <cite><a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html">WCAG 2.0 SC 1.4.4</a></cite>

This mixin handles zoom levels far beyond 200%. On larger desktop-size
viewports, higher zoom levels revert the layout further and further towards the
mobile layout with the text filling the full width of the viewport.


