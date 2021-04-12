---
name: border box
layout: mixin
description: The same box-sizing reset everyone uses
example: |
  @use "~@hendotcat/picknmix";
  @include picknmix.border-box;
---

This mixin applies the `box-sizing: border-box` reset that almost everyone
uses. I find myself copypasting these same 8 lines of code from either [CSS
Tricks] or [Paul Irish's blog] every time I start a new stylesheet, so this
is just a way for me to avoid that extra bit of work.

[CSS Tricks]: https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
[Paul Irish's blog]: https://www.paulirish.com/2012/box-sizing-border-box-ftw/

