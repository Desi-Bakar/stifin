import { ThemeContext } from "@emotion/react"
import defaultColors from "../util/default-colors.json"
import { lightness } from "@theme-ui/color"

const theme = {
  colors: {
    ...defaultColors,
    text: "#000",                // teks hitam
    background: "#fff",          // background putih
    primary: "#0047AB",          // biru utama
    accent: "#fff",              // aksen putih
    muted: "rgba(0, 0, 0, 0.7)", // teks abu
    cardBg: "#fff",              // background card putih
    borderColor: "#0047AB",      // border biru
    labelText: "#777",
    inputBorder: "#aaa",
    inputBackground: "#fff",
    socialIcons: lightness("siteColor", 0.4),
    socialIconsHover: lightness("siteColor", 0.3),
    buttonColor: lightness("siteColor", 0.9),
    buttonHoverBg: lightness("siteColor", 0.4),
    buttonHoverColor: lightness("siteColor", 0.8),
  },
  links: {
    postLink: {
      color: "muted",
      "&:hover": {
        color: "text",
      },
    },
  },
  variants: {
    button: {
      bg: "siteColor",
      color: "buttonColor",
      "&:hover": {
        bg: "buttonHoverBg",
        color: "buttonHoverColor",
      },
    },
    socialIcons: {
      a: {
        color: "socialIcons",
        ":hover": {
          color: "socialIconsHover",
        },
      },
    },
  },
}

export default theme
