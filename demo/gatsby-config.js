module.exports = {
  siteMetadata: {
    title: `@pauliescanlon/gatsby-mdx-routes`,
    description: `gatsby-mdx-routes is....`,
    siteURL: "https://gatsby-mdx-routes.netlify.com",
    siteImage: "mdx-routes-main-og-image.jpg",
    author: "@pauliescanlon",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-76055934-6",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    // test source file system to ensure routes are only created for files sourced from src/pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
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
