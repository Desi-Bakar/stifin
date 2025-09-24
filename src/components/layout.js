/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import React, { useState } from "react"

import Header from "./header"
import Logo from "./logo"
import Footer from "./footer"
import Search from "../components/search"

import "../assets/scss/style.scss"
import "./navbar.css"

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    siteSearchIndex {
      index
    }
  }
`

const Layout = ({ children, className }) => {
  const { site, siteSearchIndex } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata

  const [isOpen, setIsOpen] = useState(false)

  // Tutup menu saat klik link
  const handleLinkClick = () => setIsOpen(false)

  return (
    <div className="primary-container">
      <Header>
        <Logo title={siteTitle} />

        <div sx={layoutStyle.nav}>
          {/* Search versi mobile */}
          <div sx={{ display: ["flex", "flex", "flex", "none"] }}>
            <Search searchIndex={siteSearchIndex.index} />
          </div>

          {/* ===== NAVBAR ===== */}
          <nav className="navbar">
            {/* Hamburger icon */}
            <div
              className={`menu-toggle ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span />
              <span />
              <span />
            </div>

            {/* Menu links */}
            <ul className={`nav-links ${isOpen ? "show" : ""}`}>
              <li>
                <Link to="/" activeClassName="active" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/manfaat"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Manfaat
                </Link>
              </li>
              <li>
                <Link
                  to="/keunggulan"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Keunggulan
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Icon kanan */}
        <div sx={layoutStyle.appearance}>
          <Search searchIndex={siteSearchIndex.index} />
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            sx={layoutStyle.whatsapp}
            aria-label="Chat via WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </Header>

      <main className={"container " + (className || "")}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

const layoutStyle = {
  appearance: {
    display: ["none", "none", "none", "flex"],
    alignItems: "center",
    gap: 4,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  whatsapp: {
    color: "#25D366",
    fontSize: "1.8rem",
    marginLeft: "1rem",
    transition: "opacity 0.3s ease",
    ":hover": {
      opacity: 0.8,
    },
  },
}
