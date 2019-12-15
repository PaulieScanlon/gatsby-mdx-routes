module.exports = {
  siteMetadata: {
    title: `@pauliescanlon/gatsby-mdx-routes`,
    description: `gatsby-mdx-routes is....`,
    siteURL: "https://gatsby-mdx-routes.netlify.com",
    siteImage: "mdx-routes-og-image.jpg",
    author: "@pauliescanlon",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
