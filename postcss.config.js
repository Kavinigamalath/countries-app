export default {
  // PostCSS plugins applied in the order listed
  plugins: {
    // Tailwind CSS plugin:
    // - Reads your Tailwind config (tailwind.config.js)
    // - Processes @tailwind directives in your CSS
    // - Generates all of Tailwind’s utility classes
    tailwindcss: {},

    // Autoprefixer plugin:
    // - Scans your compiled CSS
    // - Adds vendor prefixes (e.g. -webkit-, -ms-) where needed
    // - Ensures better browser compatibility
    autoprefixer: {},
  },
}
