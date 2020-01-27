import React, { FunctionComponent } from "react"
import { StaticQuery, graphql } from "gatsby"

import { recursiveMenu } from "../../utils/recursiveMenu"

interface IMdxRoutesProps {
  /** Navigation order */
  navigationOrder: string[]
  /** Custom children */
  children: any
}

export const MdxRoutes: FunctionComponent<IMdxRoutesProps> = ({
  children,
  navigationOrder,
}) => {
  return (
    <StaticQuery
      query={graphql`
        query {
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

        const sortOrder = (array: any) => {
          return array.sort((a: any, b: any) => {
            if (navigationOrder) {
              return (
                navigationOrder.indexOf(a.navigationLabel) -
                navigationOrder.indexOf(b.navigationLabel)
              )
            }
            return a.navigationLabel - b.navigationLabel
          })
        }

        const mdxData = edges.map((data: any) => {
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
