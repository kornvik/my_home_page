/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   forest: "url('/assets/forest.jpeg')",
      // },
    },
  },
  plugins: [
    // require("@tailwindcss/typography")
  ],
};

