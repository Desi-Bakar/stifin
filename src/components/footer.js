import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import "./footer.css"

const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 } // muncul 20% footer
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`footer-curved ${isVisible ? "show" : ""}`}
    >
      <p>
        <Link to="/" className="footer-link">
          <b>STIFIn</b>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
