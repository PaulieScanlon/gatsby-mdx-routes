import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import PropTypes from "prop-types"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

import Seo from "../components/seo"

import "./layout.css"

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

  return createTree(menus)
}

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query defaultQuery {
          site {
            siteMetadata {
              title
              description
              siteURL
              siteImage
              author
            }
          }
        }
      `}
      render={data => {
        const {
          title,
          description,
          siteImage,
          siteURL,
          author,
        } = data.site.siteMetadata

        return (
          <Fragment>
            <Seo
              lang="eng"
              title={title}
              description={description}
              siteImage={siteImage}
              siteURL={siteURL}
              author={author}
            />
            <ul>
              <li>
                <a
                  href="https://github.com/PaulieScanlon/gatsby-mdx-routes"
                  target="_blank"
                >
                  GitHub: gatsby-mdx-routes
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@pauliescanlon/gatsby-mdx-routes"
                  target="_blank"
                >
                  npm: @pauliescanlon/gatsby-mdx-routes
                </a>
              </li>
            </ul>

            <main>{children}</main>
            <h2>routes</h2>
            <p>Simple example `routes.map`</p>
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
            <h2>routes navigationOrder</h2>
            <p>Simple example `routes.map` with `navigationOrder`</p>
            <nav>
              <MdxRoutes
                navigationOrder={[
                  "home",
                  "some other page",
                  "sub page 1",
                  "sub page item 1",
                  "sub page item again 1",
                  "about",
                  "contact",
                ]}
              >
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
            <h2>menus</h2>
            <p>Recursive example `createTree`</p>
            <nav>
              <MdxRoutes>{(_, menus) => <Tree menus={menus} />}</MdxRoutes>
            </nav>
            <h2>menus navigationOrder</h2>
            <p>Recursive example `createTree` with `navigationOrder`</p>
            <nav>
              <MdxRoutes
                navigationOrder={[
                  "home",
                  "sub pages",
                  "other pages",
                  "about",
                  "contact",
                ]}
              >
                {(_, menus) => <Tree menus={menus} />}
              </MdxRoutes>
            </nav>
          </Fragment>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
