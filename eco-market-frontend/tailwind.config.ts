/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "red-telkom": "#800020",
        "red-telkom-hover": "#BF153E",
        "red-text": "#480313",
        "red-bg": "#4A4042",
        "light-cream": "#FFFDD0",
        "color-menu": "#FFA07A",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "var(--font-poppins)", "sans-serif"], // Fallback ke Poppins
        poppins: ["var(--font-poppins)", "var(--font-montserrat)", "sans-serif"], // Fallback ke Montserrat
        "geist-sans": ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};