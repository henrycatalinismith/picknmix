---
name: ordered-list
layout: mixin
description: Numbered lists
dependencies:
  - column
  - font-families
  - font-sizes
  - palette
examples:
  - name: ordered list demo
    description: How it looks
    html: |
      <ol>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ol>
    scss: |
      @include picknmix.ordered-list;
---
