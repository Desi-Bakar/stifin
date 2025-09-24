/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"   // ✅ tambahin ini

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 600, height: 460)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 180)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 360, height: 240)
              }
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage?.childImageSharp.gatsbyImageData

  return (
    <Layout>
      <Seo title="STIFIn - Tes Kepribadian & Potensi Diri" />

      {/* HERO */}
      <section
        sx={{
          minHeight: "80vh",
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 1fr"],
          alignItems: "center",
          gap: 4,
          px: [3, 5],
          py: [5, 6],
          bg: "linear-gradient(135deg,#FFF8E1,#FFD529)",
        }}
      >
        <div>
          <h1
            sx={{
              fontSize: [5, 6],
              fontWeight: "900",
              lineHeight: 1.1,
              color: "#111",
            }}
          >
            {frontmatter.title}
          </h1>
          <p
            sx={{
              mt: 3,
              fontSize: [2, 3],
              color: "#444",
              maxWidth: "480px",
            }}
          >
            {frontmatter.tagline}
          </p>
          <div
            sx={{ mt: 3, fontSize: 2, color: "#333" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <Link
            to={frontmatter.cta.ctaLink}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              mt: 4,
              px: 5,
              py: 3,
              fontSize: 2,
              fontWeight: "bold",
              borderRadius: "999px",
              bg: "linear-gradient(90deg,#FFD529,#FF9800)",
              color: "#000",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
              "&:hover": {
                color: "#000",
                transform: "translateY(-3px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              },
            }}
          >
            {frontmatter.cta.ctaText}
            <RiArrowRightSLine sx={{ ml: 2, fontSize: 3 }} />
          </Link>
        </div>

        {Image && (
          <div sx={{ textAlign: "center" }}>
            <GatsbyImage
              image={Image}
              alt={frontmatter.title}
              sx={{
                borderRadius: "24px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )}
      </section>

      {/* BLOG SECTION */}
      <section sx={{ px: [3, 5], py: [5, 6], bg: "#fafafa" }}>
        <h2
          sx={{
            textAlign: "center",
            fontSize: [4, 5],
            fontWeight: "700",
            mb: 5,
          }}
        >
          ✨ Artikel Terbaru
        </h2>

        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"],
            gap: 4,
          }}
        >
          {posts.edges.map(({ node }) => {
            const img =
              node.frontmatter.featuredImage?.childImageSharp.gatsbyImageData
            return (
              <Link
                key={node.id}
                to={node.frontmatter.slug}
                sx={{
                  display: "block",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  bg: "#fff",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {img && (
                  <div
                    sx={{
                      overflow: "hidden",
                      maxHeight: "220px",
                    }}
                  >
                    <GatsbyImage
                      image={img}
                      alt={node.frontmatter.title}
                      sx={{
                        transition: "0.4s",
                        "&:hover": { transform: "scale(1.08)" },
                      }}
                    />
                  </div>
                )}
                <div sx={{ p: 3 }}>
                  <p
                    sx={{
                      fontSize: 1,
                      color: "gray",
                      mb: 2,
                    }}
                  >
                    {node.frontmatter.date}
                  </p>
                  <h3
                    sx={{
                      fontSize: 3,
                      fontWeight: "700",
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {node.frontmatter.title}
                  </h3>
                  <p
                    sx={{
                      fontSize: 2,
                      color: "#555",
                    }}
                  >
                    {node.excerpt}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ✅ Tambahin Footer */}
      <Footer />
    </Layout>
  )
}

export default HomePage
