/*---
title: picknmix mixins
description: All of them in alphabetical order
---*/

import React from "react"

export default function Index(props: any): React.ReactElement {
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
          {props.title}
        </title>
      </head>
      <body>
        <main>

        <header>
          <h1>
            {props.title}
          </h1>
          <p>
            {props.description}
          </p>
        </header>

        {props.collections.mixins && props.collections.mixins.length > 0 && (
          <section>
            <dl>
              {props.collections.mixins.map(mixin => (
                <React.Fragment key={mixin.data.name}>  
                  <dt>
                    <a href={`/mixins/${mixin.data.name}`}>
                      {mixin.data.name}
                    </a>
                  </dt>
                  <dd>
                    {mixin.data.description}
                  </dd>
                </React.Fragment>
              ))}
            </dl>
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

