/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0284C7",
          dark: "#0F172A",
          navy: "#0A192F",
          deep: "#0369A1",
          light: "#F0F9FF",
          subtle: "#E0F2FE",
        },
        brand: {
          blue: "#0284C7",
          cyan: "#38BDF8",
          dark: "#0F172A",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#94A3B8",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          alt: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
