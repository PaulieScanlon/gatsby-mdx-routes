const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // only create the slug for mdx files sourced from pages directory
  if (
    node.internal.type === `Mdx` &&
    node.fileAbsolutePath &&
    node.fileAbsolutePath.includes(`pages`)
  ) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
