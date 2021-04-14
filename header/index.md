---
name: header
layout: mixin
description: Eye-catching & accessible page headers
dependencies:
  - column
  - font-families
  - font-sizes
  - palette
examples:
  - name: header demo
    description: How it looks with some example text
    html: |
      <header>
        <h1>
          header demo
        </h1>
        <p>
          the quick brown fox jumps
          over the lazy dog
        </p>
      </header>
    scss: |
      header {
        @include picknmix.header;
      }

      main {
        display: grid;
        place-content: center;
      }
---
