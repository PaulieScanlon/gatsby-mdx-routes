const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// exports.createSchemaCustomization = ({ actions }, pluginOptions) => {
//   console.log("pluginOptions: ", pluginOptions)

//   const { frontmatter } = pluginOptions

//   const { createTypes } = actions

//   const typeDefs = `
//   type MdxFrontmatter @infer {
//     menu: String
//   }
//   `
//   createTypes(typeDefs)
// }
