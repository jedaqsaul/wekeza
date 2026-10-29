/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        ink: { DEFAULT: "#10151F", muted: "#5B6472", faint: "#8A93A3" },
        border: "#E4E7EC",
        pine: { 50: "#EAF2F0", 100: "#CFE2DD", 400: "#1A5C53", 500: "#0B3B36", 600: "#092E2A" },
        emerald: { 50: "#E9F6F1", 100: "#C8EBDD", 500: "#147D64", 600: "#0F6350" },
        clay: { 50: "#FBEDE8", 100: "#F3D2C6", 500: "#B3492F", 600: "#8F3925" },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgba(16, 21, 31, 0.04), 0 4px 16px rgba(16, 21, 31, 0.06)",
        modal: "0 12px 40px rgba(16, 21, 31, 0.18)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "scale-in": "scale-in 0.18s ease-out both",
        "slide-up": "slide-up 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};
