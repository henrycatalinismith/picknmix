import React from "react"
import { renderSync } from "sass"

export default function ExampleIframe({ example }: Layout<{ example: Example }>): React.ReactElement {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <style dangerouslySetInnerHTML={{
          __html: renderSync({
            data: `
              @use "./picknmix";
              @include picknmix.border-box;
              @include picknmix.root;
              @include picknmix.viewport-fill;
              @include picknmix.viewport-fill;
              body {
                background-color: var(--bg0);
              }
              main {
                height: 100%;
              }
              ${example.scss}
            `
          }).css.toString()
        }} />
      </head>
      <body>
        <main dangerouslySetInnerHTML={{
          __html: example.html,
        }} />
      </body>
    </html>
  )
}
