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

