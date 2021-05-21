import React from "react"
import DefinitionList from "../_includes/definition-list"

export default function MixinIndex({
  title,
  description,
  collections,
}: Layout<MixinIndex>): React.ReactElement {
  return (
    <html
      lang="en"
      dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <link
          rel="canonical"
          href="https://hen.cat/picknmix/mixins"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="stylesheet"
          href="style.scss"
        />
        <title>
          {title}
        </title>
      </head>
      <body>
        <main>

        <header>
          <h1>
            {title}
          </h1>
          <p>
            {description}
          </p>
        </header>

        {collections.mixins && collections.mixins.length > 0 && (
          <section>
            <DefinitionList
              items={collections.mixins.map(mixin => ({
                termHref: `/mixins/${mixin.data.name}`,
                termText: mixin.data.name,
                detailsText: mixin.data.description
              }))}
            />
          </section>
        )}

        <footer>
          Henry Catalini Smith
        </footer>
      </main>
    </body>
  </html>
  )
}
