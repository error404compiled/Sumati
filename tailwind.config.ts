import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft pastel wisdom palette
        cream: "#fdf2f3",
        blush: {
          50: "#fff5f6",
          100: "#ffe9ec",
          200: "#ffd2d9",
          300: "#ffb3bf",
          400: "#ff8aa0",
          500: "#fb6f87",
          600: "#ec5a74",
        },
        lotus: {
          50: "#fbf4fb",
          100: "#f6e8f6",
          200: "#ecd2ec",
          300: "#dcaedd",
          400: "#c483c6",
          500: "#a85fab",
        },
        ink: "#2c2530",
        muted: "#6f6675",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(236, 90, 116, 0.18)",
        card: "0 12px 50px -18px rgba(44, 37, 48, 0.16)",
        float: "0 18px 60px -20px rgba(44, 37, 48, 0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
