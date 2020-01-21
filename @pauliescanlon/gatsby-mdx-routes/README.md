<div>

![npm (scoped)](https://img.shields.io/npm/v/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

![npm](https://img.shields.io/npm/dt/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

![NPM](https://img.shields.io/npm/l/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

</div>

# gatsby-mdx-routes

gatsby-mdx-routes is a plugin that exposes links to `.mdx` files sourced from `src/pages`.

This plugin aims to separate the data from the ui, which means the styling for your navigation is up to you.

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

Using the `defaultLayouts` from `gatsby-plugin-mdx` allows you to create one file that will be repeated across pages. This is where we'll add `MdxRoutes`.

### MdxRoutes

MdxRoutes returns two keys one is the actual route to the file in question, the other is the title from frontmatter

| Key             | Description                                |
| --------------- | ------------------------------------------ |
| slug            | Route to `.mdx` file                       |
| navigationLabel | navigationLabel extracted from frontmatter |

### src/pages/a-page.mdx

In order to construct a more human readable navigation use frontmatter in your `.mdx` file and add a title field

#### frontmatter

```js
---
navigationLabel: Page Title
---

```

### src/layouts/layout.js

```js
import React, { Fragment } from "react"
import { Link } from "gatsby"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

export default ({ children }) => (
  <Fragment>
    <nav>
      <MdxRoutes>
        {routes => (
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                <Link to={route.slug}>{route.navigationLabel}</Link>
              </li>
            ))}
          </ul>
        )}
      </MdxRoutes>
    </nav>
    <main>{children}</main>
  </Fragment>
)
```

#### props

| Prop            | Type          | Required | Description                   |
| --------------- | ------------- | -------- | ----------------------------- |
| navigationOrder | Array[string] | no       | A reference array to order by |

##### navigationOrder

```js
<MdxRoutes navigationOrder={["Contact", "About", "Home", "Sub Page"]}>
  {routes => (
    <ul>
      {routes.map((route, index) => (
        <li key={index}>
          <Link to={route.slug}>{route.navigationLabel}</Link>
        </li>
      ))}
    </ul>
  )}
</MdxRoutes>
```

If you're using **gatsby-mdx-routes** in your project i'd love to hear from you [@pauliescanlon](https://twitter.com/PaulieScanlon)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P31B7G8)
