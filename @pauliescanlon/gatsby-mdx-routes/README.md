<div>

![npm (scoped)](https://img.shields.io/npm/v/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

![npm](https://img.shields.io/npm/dt/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

![NPM](https://img.shields.io/npm/l/@pauliescanlon/gatsby-mdx-routes?style=flat-square)

</div>

# gatsby-mdx-routes

gatsby-mdx-routes is a plugin that exposes links to `.mdx` files sourced from `src/pages`.

This plugin aims to separate the data from the ui, which means the styling of your navigation is up to you.

## 👁️ Preview

- [Live Demo](https://gatsby-mdx-routes.netlify.com/)

## 🚀 Getting started

### Install

```
npm install @pauliescanlon/gatsby-mdx-routes
```

### Setup

To source `.mdx` files from `src/pages` you'll need `gatsby-source-filesystem` and `gatsby-plugin-mdx` installed.

Your `gatsby-config` should look something like this...

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

Using the `defaultLayouts` from `gatsby-plugin-mdx` allows you to create one file that will be repeated across pages.

This is where we'll add `MdxRoutes`.

## MdxRoutes

MdxRoutes returns two arrays, _routes_ which is a flat array and _menus_ which is created recursively and contains a `menu` array.

You will probably use one or the other, not both.

### routes

The `routes` array returns two object keys, one is the actual route to the file in question (`slug`), the other is the `navigationLabel` from _frontmatter_

| Key             | Description                                |
| --------------- | ------------------------------------------ |
| slug            | Route to `.mdx` file                       |
| navigationLabel | navigationLabel extracted from frontmatter |

src/pages/a-page.mdx

#### frontmatter

```js
---
navigationLabel: Page Title
---

```

src/layouts/layout.js

```js
import React, { Fragment } from "react"
import { Link } from "gatsby"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

export default ({ children }) => (
  <Fragment>
    <nav>
      <MdxRoutes>
        {(routes, _) => (
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

### menus

The `menus` array also returns the two object keys mentioned above, it also returns the following

| Key             | Description                                 |
| --------------- | ------------------------------------------- |
| slug            | Route to `.mdx` file                        |
| navigationLabel | navigationLabel extracted from frontmatter  |
| id              | key to use in recursive function            |
| parent          | string to determine parent                  |
| menu            | array of routes grouped by parent           |
| paths           | internal array to use in recursive function |

The _menus_ array is constructed by looking at the file paths on disk and determining what depth a file lives. This is calculated by the amount of forward slashes in the `slug`

**To create the menus array `MdxRoutes` will mirror the directory structure in your project**

your project

<!-- prettier-ignore -->
```
|-- src
    |-- pages
        |-- other-pages
           |-- some-other-page.mdx
        |-- sub-pages
            |-- sub-page-items
               |-- sub-page-items-again
                  |-- sub-page-item-again-1.mdx
               |-- sub-page-item-1.mdx
            |-- sub-page-1.mdx
        |-- about.mdx
        |-- contact.mdx
        |-- index.mdx
```

To use the **menus** array you'll also need a recursive **Tree** function to create your navigation list.

Watch out for the conditional `slug`, we need this to determine if the object key is a parent or an actual route to a file.

src/layouts/layout.js

```js
import React, { Fragment } from "react"
import { Link } from "gatsby"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

const Tree = ({ menus }) => {
  const createTree = menus => {
    return (
      <ul>
        {menus.map(route => (
          <li key={route.navigationLabel}>
            {route.slug ? (
              <Link to={route.slug}>
                {route.navigationLabel}
                {route.menu && createTree(route.menu)}
              </Link>
            ) : (
              <span>
                {route.navigationLabel}
                {route.menu && createTree(route.menu)}
              </span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return createTree(menus, null)
}

export default ({ children }) => (
  <Fragment>
    <nav>
      <MdxRoutes>{(_, menus) => <Tree menus={menus} />}</MdxRoutes>
    </nav>
    <main>{children}</main>
  </Fragment>
)
```

### props

| Prop            | Type          | Required | Description                   |
| --------------- | ------------- | -------- | ----------------------------- |
| navigationOrder | Array[string] | no       | A reference array to order by |

#### navigationOrder

By passing in an array of strings `MdxRoutes` can use this to sort the returned **routes** or **menus** array, otherwise everything is just returned alphabetically in an ascending order based on the slug, with the index ("/") being first in the list.

```js
<MdxRoutes navigationOrder={["Contact", "About", "Home", "Sub Page"]}>
  {(routes, menus) => (
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
