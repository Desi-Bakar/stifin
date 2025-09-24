/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Pagination = ({ previous, next }) => (
  <nav
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mt: 5,
      mb: 6,
      fontSize: 1,
    }}
    aria-label="Pagination"
  >
    {previous ? (
      <Link
        to={previous.frontmatter.slug}
        rel="prev"
        sx={{
          variant: "links.pagination",
          display: "flex",
          alignItems: "center",
          color: "muted",
          "&:hover": { color: "primary" },
        }}
      >
        <RiArrowLeftLine sx={{ mr: 2, fontSize: 4 }} />
        <div>
          <div sx={{ fontSize: 0, color: "textMuted" }}>Previous</div>
          <div sx={{ fontWeight: "bold" }}>{previous.frontmatter.title}</div>
        </div>
      </Link>
    ) : (
      <div />
    )}

    {next ? (
      <Link
        to={next.frontmatter.slug}
        rel="next"
        sx={{
          variant: "links.pagination",
          display: "flex",
          alignItems: "center",
          color: "muted",
          "&:hover": { color: "primary" },
          ml: "auto",
        }}
      >
        <div>
          <div sx={{ fontSize: 0, color: "textMuted" }}>Next</div>
          <div sx={{ fontWeight: "bold" }}>{next.frontmatter.title}</div>
        </div>
        <RiArrowRightLine sx={{ ml: 2, fontSize: 4 }} />
      </Link>
    ) : (
      <div />
    )}
  </nav>
)

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : null
  const { previous, next } = pageContext

  return (
    <Layout className="page">
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || excerpt}
        image={Image}
        article={true}
      />
      <article
        sx={{
          maxWidth: 768,
          mx: "auto",
          px: 3,
          py: 5,
          fontFamily: "body",
          color: "text",
        }}
      >
        <header
          sx={{
            mb: 4,
            borderBottom: theme => `1px solid ${theme.colors.muted}`,
            pb: 3,
          }}
        >
          <h1
            sx={{
              fontSize: [6, 7],
              fontWeight: "heading",
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {frontmatter.title}
          </h1>

          <time
            sx={{
              color: "muted",
              fontSize: 1,
              fontWeight: "body",
            }}
          >
            {frontmatter.date}
          </time>
        </header>

        {Image && (
          <GatsbyImage
            image={Image}
            alt={`${frontmatter.title} - Featured image`}
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              mb: 5,
            }}
          />
        )}

        <section
          sx={{
            variant: "styles.root",
            fontSize: 3,
            lineHeight: "body",
            color: "text",
            "& p": {
              mb: 5,
            },
            "& blockquote": {
              pl: 4,
              borderLeft: theme => `4px solid ${theme.colors.primary}`,
              color: "primary",
              fontStyle: "italic",
              mb: 5,
            },
            "& a": {
              color: "primary",
              textDecoration: "underline",
              "&:hover": {
                color: "secondary",
              },
            },
            "& img": {
              maxWidth: "100%",
              borderRadius: 4,
              my: 5,
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {(previous || next) && <Pagination previous={previous} next={next} />}
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        template
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
