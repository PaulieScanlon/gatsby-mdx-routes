import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

export const MdxRoutes = ({ children, navigationOrder }) => {
  return (
    <StaticQuery
      query={graphql`
        query MdxRoutesQuery {
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  navigationLabel
                }
              }
            }
          }
        }
      `}
      render={data => {
        const mdxData = data.allMdx.edges
          .map(data => {
            return {
              navigationLabel: data.node.frontmatter.navigationLabel,
              slug: data.node.fields.slug,
            }
          })
          .sort((a, b) => {
            if (navigationOrder) {
              return (
                navigationOrder.indexOf(a.navigationLabel) -
                navigationOrder.indexOf(b.navigationLabel)
              )
            }
            return a.navigationLabel - b.navigationLabel
          })
        return children(mdxData)
      }}
    />
  )
}

MdxRoutes.propTypes = {
  children: PropTypes.func,
  navigationOrder: PropTypes.arrayOf(PropTypes.string),
}
