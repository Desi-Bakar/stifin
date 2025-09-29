const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Template untuk daftar blog
  const blogListTemplate = path.resolve("./src/templates/blog-list.js");

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `);

  // Kalau query gagal, hentikan build
  if (result.errors) {
    reporter.panicOnBuild("❌ Error saat menjalankan GraphQL query.");
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;

  posts.forEach((post, index) => {
    const { id, frontmatter } = post.node;
    const { slug, template, title } = frontmatter;

    // ✅ Validasi: slug & template harus ada
    if (!slug || !template) {
      reporter.warn(
        `⚠️ Lewati pembuatan halaman untuk post "${title}" (ID: ${id}) karena slug atau template tidak ada.`
      );
      return;
    }

    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    // ✅ Buat halaman dari markdown
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${template}.js`),
      context: {
        id,
        previous,
        next,
      },
    });

    // Hitung hanya post dengan template "blog-post"
    if (template === "blog-post") {
      blogPostsCount++;
    }
  });

  // ✅ Pagination blog list
  const postsPerPage = 9;
  const numPages = Math.ceil(blogPostsCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blog" : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
