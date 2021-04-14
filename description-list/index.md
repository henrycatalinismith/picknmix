---
name: description-list
layout: mixin
description: Lovely neat & versatile description lists
dependencies:
  - column
  - font-families
  - font-sizes
examples:
  - name: description list style demo
    description: How it looks with some example text
    html: |
      <dl>
        <dt>Avocado</dt>
        <dd>
          An avocado is a berry fruit.
          It has medium dark green or
          dark green bumpy or smooth skin
          depending on the variety.
        </dd>
        <dt>Blackberry</dt>
        <dd>
          The blackberry is a berry made
          by any of several species in the
          Rubus genus of the Rosaceae family.
        </dd>
        <dt>Coconut</dt>
        <dd>
          Coconuts floats on water and
          can float to another island and
          germinate there.
        </dd>
        <dt>Durian</dt>
        <dd>
          A durian is a big fruit with a
          strong smell and a hard shell
          with sharp thorns.
        </dd>
      </dl>
    scss: |
      dl {
        @include picknmix.description-list;
      }

---

