import React, { FunctionComponent, Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { recursiveMenu } from "../../utils/recursiveMenu"

interface IMdxRoutesProps {
  /** Navigation order */
  navigationOrder: string[]
  /** Custom children */
  children: any
}

interface IMdxData {
  /** navigationLabel from frontmatter */
  navigationLabel: string
  /** slug from graphql query */
  slug: string
}

export const MdxRoutes: FunctionComponent<IMdxRoutesProps> = ({
  children,
  navigationOrder,
}) => {
  const data = useStaticQuery(graphql`
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
  `)
  const { edges } = data.allMdx

  const sortOrder = (array: IMdxData[]) => {
    if (navigationOrder) {
      return array.sort((a: any, b: any) => {
        return (
          navigationOrder.indexOf(a.navigationLabel) -
          navigationOrder.indexOf(b.navigationLabel)
        )
      })
    }

    return array.reduce((routes: any, route: any) => {
      if (route.slug === "/") {
        return [route, ...routes]
      }
      return [...routes, route]
    }, [])
  }

  const mdxData = edges.map(
    (data: any): IMdxData => {
      const { frontmatter, fields } = data.node
      return {
        navigationLabel: frontmatter.navigationLabel,
        slug: fields.slug,
      }
    }
  )

  const routes = sortOrder(mdxData)
  const menus = sortOrder(recursiveMenu(mdxData))

  return <Fragment>{children(routes, menus)}</Fragment>
}
