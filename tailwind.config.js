const theme = require("./config/theme.json");
const fontPrimary = theme.fonts.font_family.primary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
const fontPrimaryType = theme.fonts.font_family.primary_type;
const fontSecondary = theme.fonts.font_family.secondary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
const fontSecondaryType = theme.fonts.font_family.secondary_type;
const font_base = Number(theme.fonts.font_size.base.replace("px", ""));
const font_scale = Number(theme.fonts.font_size.scale);
const h6 = font_base / font_base;
const h5 = h6 * font_scale;
const h4 = h5 * font_scale;
const h3 = h4 * font_scale;
const h2 = h3 * font_scale;
const h1 = h2 * font_scale;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.theme_color.primary,
        secondary: theme.colors.theme_color.secondary,
        body: theme.colors.theme_color.body,
        border: theme.colors.theme_color.border,
        light: theme.colors.theme_color.light,
        dark: theme.colors.theme_color.dark,
        text: {
          DEFAULT: theme.colors.text_color.default,
          light: theme.colors.text_color.light,
          dark: theme.colors.text_color.dark,
        },
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        h2: h2 + "rem",
        h3: h3 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
