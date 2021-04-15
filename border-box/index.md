---
name: border-box
layout: mixin
description: The same box-sizing reset everyone uses
examples:
  - name: border-box vs content-box
    description: Inheritance demo of the border-box mixin
    html: |
      <div class="border-box">
        .border-box
      </div>
      <div class="content-box">
        .content-box
      </div>
    scss: |
      main {
        align-items: center;
        justify-content: space-around;
        display: flex;
      }

      div {
        align-items: center;
        display: flex;
        height: 20vmin;
        justify-content: center;
        width: 20vmin;
      }

      .border-box {
        background: tomato;
        padding: 2vmin;
      }

      .content-box {
        box-sizing: content-box;
        position: relative;
      }

      .content-box::after {
        align-items: center;
        background: deepskyblue;
        content: '.content-box::after';
        display: flex;
        justify-content: space-around;
        height: 20vmin;
        left: 0;
        padding: 2vmin;
        position: absolute;
        top: 0;
        width: 20vmin;
      }
---

This mixin applies the `box-sizing: border-box` reset that almost everyone
uses. I find myself copypasting these same 8 lines of code from either [CSS
Tricks] or [Paul Irish's blog] every time I start a new stylesheet, so this
is just a way for me to avoid that extra bit of work.

[CSS Tricks]: https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
[Paul Irish's blog]: https://www.paulirish.com/2012/box-sizing-border-box-ftw/

