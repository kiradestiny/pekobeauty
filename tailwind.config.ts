import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA", // Pearl White
        foreground: "#333333", // Soft Black
        muted: "#888888", // Silver Grey
        accent: "#C52B21", // Peko Red
        "platinum-silver": "#E5E5E5", // Solid fallback
      },
      backgroundImage: {
        "platinum-gradient": "linear-gradient(135deg, #E0E0E0 0%, #FFFFFF 50%, #C0C0C0 100%)",
      },
      borderRadius: {
        "2xl": "1rem", // Standard for cards
        "3xl": "1.5rem", // Standard for buttons/large cards
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-tc)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "var(--font-noto-serif-tc)", "serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.5s ease forwards",
        "scale-in": "scale-in 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
