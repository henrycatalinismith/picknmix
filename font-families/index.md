---
name: font families
layout: mixin
description: Minimalistic high-performance typography
example: |
  @use "~@hendotcat/picknmix";
  :root {
    @include picknmix.font-families;
  }
  p {
    font-family: var(--picknmix-serif);
  }
---

Web fonts are great. They're usually gorgeous, for one thing, and in complex
layouts with lots of width and height constraints they give us useful
guarantees about whether or not our text will fit in our buttons and so on. But
for simplistic single-column stuff with uncrowded visuals and relatively little
stress about branding, why not just use the fonts already installed on the
device?

There are actually several good reasons why that idea's more of a pain in the
ass than it sounds. This mixin is where I keep my solutions to those problems
so that I can reduce the CO2 emissions my stuff generates by reducing the
bandwidth it consumes.

