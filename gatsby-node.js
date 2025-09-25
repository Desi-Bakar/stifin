const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

// Buat slug otomatis
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "content/posts" })

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogListTemplate = path.resolve("./src/templates/blog-list.js")
  const blogPostTemplate = path.resolve("./src/templates/blog-post.js")

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
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
  `)

  if (result.errors) {
    reporter.panicOnBuild("❌ Error saat menjalankan GraphQL query.")
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  // Buat halaman artikel
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog${post.node.fields.slug}`, // contoh: /blog/ekstrovert-introvert/
      component: blogPostTemplate,
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })

  // Buat pagination list blog
  const postsPerPage = 9
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
