/** @type {import('tailwindcss').Config} */

const gold = {
  50: "#fefdf7",
  100: "#fdf9e8",
  200: "#fbf0c3",
  300: "#f7e38a",
  400: "#f2d14d",
  500: "#edc026",
  600: "#d4a51a",
  700: "#b08215",
  800: "#8d6618",
  900: "#74541a",
  950: "#432e0a",
};

const navy = {
  50: "#f5f8fa",
  100: "#e6ecf1",
  200: "#c0cdda",
  300: "#8da8c0",
  400: "#5e84a6",
  500: "#355f8c",
  600: "#2a4c71",
  700: "#203956",
  800: "#15253b",
  900: "#0b121f",
};

const gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
  950: "#030712",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        1: "0.625rem", // 10px
        2: "1.25rem", // 20px
        3: "1.875rem", // 30px
        4: "2.5rem", // 40px
        5: "3.125rem", // 50px
        6: "3.75rem", // 60px
        7: "4.375rem", // 70px
        8: "5rem", // 80px
        9: "5.625rem", // 90px
        10: "6.25rem", // 100px
      },
      colors: {
        gold,
        navy,
        gray,
        auto: {
          primary: gold[500], // "#edc026"
          secondary: navy[600], // "#355f8c"
          accent: gold[400], // "#f2d14d"
          dark: gray[800], // "#1f2937"
          light: gray[100], // "#f9fafb"
          warning: "#f59e0b",
          success: "#10b981",
          error: "#ef4444",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        sm: "0.8rem",
        md: "1rem",
        lg: "1.2rem",
        xl: "1.6rem",
        "2xl": "2rem",
        "3xl": "3rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        strong:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)",
        gold: "0 4px 14px 0 rgba(237, 192, 38, 0.25)",
        yellow: "0 4px 14px 0 rgba(234, 179, 8, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-soft": "bounceSoft 0.6s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #edc026 0%, #f2d14d 100%)",
        "gradient-yellow": "linear-gradient(135deg, #eab308 0%, #facc15 100%)",
        "gradient-gray": "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        "gradient-auto":
          "linear-gradient(135deg, #edc026 0%, #eab308 50%, #f2d14d 100%)",
      },
    },
  },
  plugins: [],
};
