import {
  Anchor,
  DescriptionList,
} from "@henrycatalinismith/elements"
import React from "react"

export default function Index({
  title,
  description,
  links,
  collections,
}: Layout<Home>): React.ReactElement {
  return (
    <html
      lang="en"
      dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="stylesheet"
          href="style.scss"
        />
        <title>{title}</title>
      </head>
      <body>
        <main>

          <header className="hero">
            <h1>
              <span>{title}</span>
              <svg
                aria-labelledby="svg-title"
                preserveAspectRatio="xMidyMid meet"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2.5 0 41 8">
                <title id="svg-title">picknmix</title>
                <path stroke="#000" strokeWidth="2.8" d="M0 6V3h2v2H0"/>
                <path stroke="#000" strokeWidth="2.8" d="M0 6V3h2v2H0"/>
                <path stroke="#fff1e8" d="M0 6V3h2v2H0"/>
                <path stroke="#000" strokeWidth="2.8" d="M4.8 3h2m-2 3h2m-1-3v3"/>
                <path stroke="#fff1e8" d="M4.8 3h2m-2 3h2m-1-3v3"/>
                <path stroke="#000" strokeWidth="2.8" d="M11.6 3h-2v3h2"/>
                <path stroke="#fff1e8" d="M11.6 3h-2v3h2"/>
                <path stroke="#000" strokeWidth="2.8" d="M14.4 3v3m0-1l2-2m-1 1l1 1v1"/>
                <path stroke="#fff1e8" d="M14.4 3v3m0-1l2-2m-1 1l1 1v1"/>
                <path stroke="#000" strokeWidth="2.8" d="M19.2 6V3h1l1 1v2"/>
                <path stroke="#fff1e8" d="M19.2 6V3h1l1 1v2"/>
                <path stroke="#000" strokeWidth="2.8" d="M24 6V3l1 1 1-1v3"/>
                <path stroke="#fff1e8" d="M24 6V3l1 1 1-1v3"/>
                <path stroke="#000" strokeWidth="2.8" d="M28.8 3h2m-2 3h2m-1-3v3"/>
                <path stroke="#fff1e8" d="M28.8 3h2m-2 3h2m-1-3v3"/>
                <path stroke="#000" strokeWidth="2.8" d="M33.6 3l2 2v1m0-3l-2 2v1"/>
                <path stroke="#fff1e8" d="M33.6 3l2 2v1m0-3l-2 2v1"/>
              </svg>
            </h1>
            <p>
              {description}
            </p>
          </header>

          {collections.readmeSections.slice(0, -1).map(section => (
            <section dangerouslySetInnerHTML={{ __html: section }} />
          ))}

          {collections.mixins && collections.mixins.length > 0 && (
            <section>
              <h2>
                Mixins
              </h2>
              <DescriptionList items={collections.mixins.map(mixin => [
                <Anchor href={`/mixins/${mixin.data.name}`}>
                  {mixin.data.name}
                </Anchor>,
                <>{mixin.data.description}</>,
              ])} />
            </section>
          )}

          {collections.readmeSections.slice(-1).map(section => (
            <section dangerouslySetInnerHTML={{ __html: section }} />
          ))}

          <footer>
            Henry Catalini Smith
          </footer>

        </main>
      </body>
    </html>
  )
}

