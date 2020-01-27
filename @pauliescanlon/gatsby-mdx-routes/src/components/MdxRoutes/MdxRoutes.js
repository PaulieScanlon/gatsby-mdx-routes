import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import { recursiveMenu } from "../../utils/recursiveMenu"

export const MdxRoutes = ({ children, navigationOrder }) => {
  return (
    <StaticQuery
      query={graphql`
        query MdxRoutesQuery {
          allMdx {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  navigationLabel
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { edges } = data.allMdx

        const sortOrder = array => {
          return array.sort((a, b) => {
            if (navigationOrder) {
              return (
                navigationOrder.indexOf(a.navigationLabel) -
                navigationOrder.indexOf(b.navigationLabel)
              )
            }
            return a.navigationLabel - b.navigationLabel
          })
        }

        const mdxData = edges.map(data => {
          const { frontmatter, fields } = data.node
          return {
            navigationLabel: frontmatter.navigationLabel,
            slug: fields.slug,
          }
        })

        const routes = sortOrder(mdxData)
        const menus = sortOrder(recursiveMenu(mdxData))

        return children(routes, menus)
      }}
    />
  )
}

MdxRoutes.propTypes = {
  children: PropTypes.func,
  navigationOrder: PropTypes.arrayOf(PropTypes.string),
}
