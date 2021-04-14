---
name: width
layout: mixin
description: Simple content width limit
examples:
  - name: width demo
    description: A box with a width limit
    html: |
      <div></div>
    scss: |
      div {
        background: var(--orange);
        flex: 1;
        width: var(--width);
      }

      main {
        display: flex;
      }
---

This mixin provides a CSS variable called `--width` which can be used as a
width limit constraining content to with 512px.

The following graph shows the growth of the width for viewport widths from
128px to 1024px.

{% include width-plot.svg %}

