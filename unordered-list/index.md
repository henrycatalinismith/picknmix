---
name: unordered-list
layout: mixin
description: Nice easy bullet points
dependencies:
  - column
  - font-families
  - font-sizes
  - palette
examples:
  - name: unordered list demo
    description: How it looks
    html: |
      <ul>
        <li>apple</li>
        <li>ball</li>
        <li>cat</li>
      </ul>
    scss: |
      @include picknmix.unordered-list;
---
