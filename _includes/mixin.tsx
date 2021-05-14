import Prism from "prismjs"
import React from "react"

export default function Mixin(props: any): React.ReactElement {
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
              {props.name} mixin
            </h1>
            <p>
              {props.description}
            </p>
          </header>

          <section>
            <pre className="language-scss">
              <code dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  props.mixin,
                  Prism.languages["css"],
                  "css",
                )
              }} />
            </pre>
          </section>


          <section dangerouslySetInnerHTML={{
            __html: props.content,
          }} />

          {props.examples && props.examples.length > 0 && (
            <section>
              <h2>
                Examples
              </h2>
              <dl>
                {props.examples.map(example => (
                  <React.Fragment key={example.name}>  
                    <dt>
                      <a href={`/examples/${example.name}`}>
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

          {props.dependencies && props.dependencies.length > 0 && (
            <section>
              <h2>
                Dependencies
              </h2>
              <dl>
                {props.dependencies.map(dependency => (
                  <React.Fragment key={dependency.data.name}>  
                    <dt>
                      <a href={`/mixins/${dependency.data.name}`}>
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

          {props.dependents && props.dependents.length > 0 && (
            <section>
              <h2>
                Dependents
              </h2>
              <dl>
                {props.dependents.map(dependent => (
                  <React.Fragment key={dependent.data.name}>  
                    <dt>
                      <a href={`/mixins/${dependent.data.name}`}>
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
