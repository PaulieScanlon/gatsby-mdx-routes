import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

export const MdxRoutes = ({ children }) => {
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
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        const mdxData = data.allMdx.edges.map(data => {
          return {
            title: data.node.frontmatter.title,
            slug: data.node.fields.slug,
          }
        })
        return children(mdxData)
      }}
    />
  )
}

MdxRoutes.propTypes = {
  children: PropTypes.func,
}
