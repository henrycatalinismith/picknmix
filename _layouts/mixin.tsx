import Prism from "prismjs"
import markdownIt from "markdown-it"
import React from "react"

export default function Mixin({
  name,
  description,
  mixin,
  notes,
  dependencies,
  dependents,
  examples,
}: Layout<Mixin>): React.ReactElement {
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
      </head>
      <body>

        <article>
          <header>
            <h1>
              {name} mixin
            </h1>
            <p>
              {description}
            </p>
          </header>

          <section>
            <pre className="language-scss">
              <code dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  mixin.trim(),
                  Prism.languages["css"],
                  "css",
                )
              }} /></pre>
          </section>

          {notes && notes.length > 0 && notes.map(note => (
            <section dangerouslySetInnerHTML={{ __html: [
              `<h2>${note.title}</h2>`,
              markdownIt({ html: true }).render(note.text),
            ].join("") }} />
          ))}

          {examples && examples.length > 0 && (
            <section>
              <h2>
                Examples
              </h2>
              <dl>
                {examples.map(example => (
                  <React.Fragment key={example.name}>
                    <dt>
                      <a href={`/examples/${example.name.toLowerCase().replace(/ /g, "-")}`}>
                        {example.name}
                      </a>
                    </dt>
                    <dd>
                      {example.description}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          )}

          {dependencies && dependencies.length > 0 && (
            <section>
              <h2>
                Dependencies
              </h2>
              <dl>
                {dependencies.map(dependency => (
                  <React.Fragment key={dependency.data.name}>
                    <dt>
                      <a href={`/mixins/${dependency.data.name.toLowerCase().replace(/ /g, "-")}`}>
                        {dependency.data.name}
                      </a>
                    </dt>
                    <dd>
                      {dependency.data.description}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          )}

          {dependents && dependents.length > 0 && (
            <section>
              <h2>
                Dependents
              </h2>
              <dl>
                {dependents.map(dependent => (
                  <React.Fragment key={dependent.data.name}>
                    <dt>
                      <a href={`/mixins/${dependent.data.name.toLowerCase().replace(/ /g, "-")}`}>
                        {dependent.data.name}
                      </a>
                    </dt>
                    <dd>
                      {dependent.data.description}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          )}

        </article>

      </body>
    </html>
  )
}
