---
name: margin
layout: mixin
description: Responsive content margin
example: |
  @use "~@hendotcat/picknmix";
  :root {
    @include picknmix.margin;
  }
  main {
    margin: var(--margin);
  }
---

This mixin provides a CSS variable called `--margin` which can be used as a
margin around page content. It supports viewport widths as narrow as 128px. For
widths below 256px it applies no margin in order to conserve space for content.
A 16px margin is applied to mobile viewports to create some breathing room
around content. Once the viewport width exceeds the maximum width of the
[column], the margin drops back to zero.

The following graph shows the growth of the margin for viewport widths from
128px to 1024px.

{% include margin-plot.svg %}

[column]: /column
