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
              }
            }
          }
        }
      `}
      render={data =>
        children(data.allMdx.edges.map(data => data.node.fields.slug))
      }
    />
  )
}

MdxRoutes.propTypes = {
  children: PropTypes.func,
}
