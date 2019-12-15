# gatsby-mdx-routes

gatsby-mdx-routes is a plugin that exposes links to `.mdx` files sourced from `src/pages`.

This plugin aims to seperate the data from the ui, whichs means the styling for your navigation is up to you.

If you're using **gatsby-mdx-routes** in your project i'd love to hear from you [@pauliescanlon](https://twitter.com/PaulieScanlon)

## 👁️ Preview

- [Live Demo](https://gatsby-mdx-routes.netlify.com/)

## 🚀 Getting started

### Install

```
npm install @pauliescanlon/gatsby-mdx-routes
```

### Setup

To source `.mdx` files from `src/pages` you'll need `gatsby-source-filesystem` and `gatsby-plugin-mdx` installed. Your `gatsby-config` should look something like this...

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: `${__dirname}/src/layouts/layout.js`,
        },
        plugins: [`@pauliescanlon/gatsby-mdx-routes`],
      },
    },
  ],
}
```

If that's all setup you'll now need to add `@pauliescanlon/gatsby-mdx-routes` as a plugin of `gatsby-plugin-mdx` 😅

```js
module.exports = {
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      defaultLayouts: {
        default: `${__dirname}/src/layouts/layout.js`,
      },
      plugins: [`@pauliescanlon/gatsby-mdx-routes`],
    },
  },
}
```

Using the `defaultLayouts` from `gatsby-plugin-mdx` allows you to create one file that will be repated across pages. This is where we'll add `MdxRoutes`.

### src/layouts/layout.js

```js
import React from "react"
import { Link } from "gatsby"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

export default ({ children }) => (
  <div>
    <nav>
      <MdxRoutes>
        {routes => (
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                <Link to={route}>{route}</Link>
              </li>
            ))}
          </ul>
        )}
      </MdxRoutes>
    </nav>
    <main>
      <h1>My Layout</h1>
      <div>{children}</div>
    </main>
  </div>
)
```
