/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#7F664A", // Custom primary color
        secondary: "#ABB26D", // Custom secondary color
        accent: "#D5B740", // Custom accent color
        sienna: "#8A6822", // Custom accent color
        beige: "#E9E7CE", // Custom accent color
        // Add more custom colors as needed
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"], // Custom font family
        serif: ["Georgia", "serif"],
        // Add more custom fonts as needed
      },
    },
  },
  plugins: [],
};
