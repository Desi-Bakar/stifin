/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page" sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={`${frontmatter.title} - ${site.siteMetadata.title}`}
      />
      <div sx={contactStyles.container}>
        <div sx={contactStyles.infoSection}>
          <h1 sx={contactStyles.title}>{frontmatter.title}</h1>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
            sx={contactStyles.description}
          />
          <div sx={contactStyles.contactDetails}>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:satrioareta55@gmail.com" sx={contactStyles.link}>
                anonim@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+628123456789" sx={contactStyles.link}>
                +62 812-3456-789
              </a>
            </p>
            <p>
              <strong>Address:</strong> Jakarta, Indonesia
            </p>
          </div>
        </div>
        <form
          className="contact-form"
          action="/thanks"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          sx={contactStyles.form}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p sx={contactStyles.field}>
            <label htmlFor="name" sx={contactStyles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="email" sx={contactStyles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="subject" sx={contactStyles.label}>
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject of your message"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="message" sx={contactStyles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              required
              rows={5}
              sx={contactStyles.textarea}
            />
          </p>
          <p sx={contactStyles.submitWrapper}>
            <button type="submit" sx={contactStyles.button}>
              Send Message{" "}
              <RiSendPlane2Line sx={{ ml: 2, verticalAlign: "middle" }} />
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

const contactStyles = {
  contactPage: {
    bg: "#FFD529",
    minHeight: "100vh",
    py: [5, 6],
    px: 3,
    fontFamily: "'Poppins', sans-serif",
    color: "#222",
  },
  container: {
    maxWidth: 800,
    mx: "auto",
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr 1fr"],
    gap: 5,
    alignItems: "start",
  },
  infoSection: {
    bg: "rgba(255, 255, 255, 0.85)",
    p: [3, 4],
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: [4, 5],
    fontWeight: "800",
    mb: 2,
    color: "#222",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 1,
    lineHeight: 1.6,
    mb: 3,
    color: "#444",
  },
  contactDetails: {
    fontSize: 1,
    color: "#333",
    lineHeight: 1.5,
    p: {
      mb: 2,
    },
  },
  link: {
    color: "#222",
    textDecoration: "none",
    fontWeight: "600",
    "&:hover": {
      color: "#000",
      textDecoration: "underline",
    },
  },
  form: {
    bg: "rgba(255, 255, 255, 0.95)",
    p: [4, 5],
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    mb: 3,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    mb: 1,
    fontWeight: "600",
    fontSize: 1,
    color: "#222",
    letterSpacing: "0.02em",
  },
  input: {
    border: "1.5px solid #ccc",
    borderRadius: 6,
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: "500",
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 5px #222",
      backgroundColor: "#fff",
    },
  },
  textarea: {
    border: "1.5px solid #ccc",
    borderRadius: 6,
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: "500",
    resize: "vertical",
    minHeight: 100,
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 5px #222",
      backgroundColor: "#fff",
    },
  },
  submitWrapper: {
    textAlign: "right",
  },
  button: {
    bg: "#222",
    color: "#FFD529",
    fontWeight: "800",
    fontSize: 2,
    px: 4,
    py: 2,
    borderRadius: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    border: "none",
    "&:hover, &:focus": {
      bg: "#000",
      color: "#FFD529",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
      outline: "none",
      transform: "translateY(-1px)",
    },
    svg: {
      ml: 2,
      fontSize: 22,
    },
  },
}
