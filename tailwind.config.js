/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nokara: ["Nokara", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: "#2e3e49",
        lightBlack: "#222222",
        lightGray: "#495057",
        bgGray: "#f8f8f8",
        lightPeach: "#fa8f8d",
        iconClr: "#636363",
      },
      container: {
        // you can configure the container to be centered
        center: true,
        // or have default horizontal padding
        //  padding: '1rem',
        // default breakpoints but with 40px removed
        screens: {
          lg: "1100px",
        },
      },
    },
  },
  plugins: [],
};
