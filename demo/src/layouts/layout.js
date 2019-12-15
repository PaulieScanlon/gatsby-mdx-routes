import React, { Fragment } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import PropTypes from "prop-types"

import "./layout.css"

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
        const lang = "eng"

        const {
          title,
          description,
          siteImage,
          siteURL,
          author,
        } = data.site.siteMetadata

        return (
          <Fragment>
            <Helmet title={title}>
              <html lang={lang} />
              <meta name="description" content={description} />
              <meta name="image" content={`${siteURL}/images/${siteImage}`} />
              <meta name="image:alt" content={description} />

              {/* Facebook */}
              <meta property="og:title" content={title} />
              <meta property="og:url" content={siteURL} />
              <meta property="og:description" content={description} />
              <meta
                property="og:image"
                content={`${siteURL}/images/${siteImage}`}
              />
              <meta property="og:type" content="website" />
              <meta property="og:image:alt" content={description} />
              {/* Twitter */}
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:url" content={siteURL} />
              <meta name="twitter:description" content={description} />
              <meta
                name="twitter:image"
                content={`${siteURL}/images/${siteImage}`}
              />
              <meta name="twitter:image:alt" content={description}></meta>
              <meta name="twitter:creator" content={author}></meta>
            </Helmet>
            <main>{children}</main>
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
