---
name: width
layout: mixin
description: Simple content width limit
example: |
  @use "~@hendotcat/picknmix";
  :root {
    @include picknmix.width;
  }
  p {
    width: var(--width);
  }
---

This mixin provides a CSS variable called `--width` which can be used as a
width limit constraining content to with 512px.

The following graph shows the growth of the width for viewport widths from
128px to 1024px.

{% include width-plot.svg %}

