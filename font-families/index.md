---
name: font-families
layout: mixin
description: Minimalistic high-performance typography
examples:
  - name: font families demo
    description: Preview text showing all four font families
    html: |
      <p class="mono">
        The quick brown fox jumps
        over the lazy dog.
      </p>
      <p class="sans">
        The five boxing wizards
        jump quickly.
      </p>
      <p class="serif">
        How vexingly quick daft
        zebras jump!
      </p>
      <p class="slab">
        Sphinx of black quartz,
        judge my vow.
      </p>
    scss: |
      p { font-size: var(--f20); }
      .mono { font-family: var(--mono); }
      .sans { font-family: var(--sans); }
      .serif { font-family: var(--serif); }
      .slab { font-family: var(--slab); }

      main {
        display: grid;
        place-content: center;
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

## Problem #1: Which Fonts?

Do you have a computer and a phone each from every major platform? Me neither.
Figuring out which fonts look best on Apple devices is easy because I have
plenty of those. Microsoft's stuff is easy enough too, because you can [install
their fonts with Homebrew](https://github.com/colindean/homebrew-fonts-nonfree).

What fonts does Android ship with though? Who knows! It felt ironic that it was
impossible to Google a good answer to this question even though Google's in
charge of Android. Maybe that's how Android developers feel every day. On the
bright side, when I finally do nail down a good answer to this question, this
mixin gives me a place to capture it in a useful way.

If I can get all the font choices are nailed down for all the major platforms,
this time next year Rodney my boy, we'll be millionaires.

## Problem #2: Does This Look OK?

Using system fonts in this way means at some level you do have to accept that
things aren't going to look the same on different platforms. But sometimes I
want to least *check*. And I want that to be something I can do without a bunch
of manual steps in the browser dev tools.

Assuming all the fonts have been installed locally, here's how this mixin
allows for a bit of quick testing to see how something looks in e.g. Windows.

```scss
@include picknmix.font-families("Windows");
```

Passing a parameter like that to the mixin tells it to skip all the other
platforms and only output the fonts for that one. It's a quick way to make sure
a page doesn't have any major visual issues on an important platform.



