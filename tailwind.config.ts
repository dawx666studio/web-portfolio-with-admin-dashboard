import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          50: "#fffdf9",
          100: "#fef8ed",
          200: "#fcf4e4",
          300: "#faedd3",
          400: "#f4dcaf",
          500: "#ebd095",
        },
        fructus: {
          red: "#e61d2b",
          redDark: "#c41320",
          redLight: "#ff4d5a",
          pink: "#ffd2d7",
          pinkLight: "#ffeef0",
          pinkDark: "#f9a8b1",
          gold: "#ffc72c",
          dark: "#1e1b24",
          darkNavy: "#23202e",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      fontFamily: {
        sans: ["var(--font-jakarta-sans)", "sans-serif"],
        display: ["Impact", "Arial Black", "Cabinet Grotesk", "sans-serif"],
        funky: ["Comic Sans MS", "Chalkboard SE", "cursive", "sans-serif"],
      },
      boxShadow: {
        retro: "4px 4px 0px 0px #000000",
        "retro-lg": "6px 6px 0px 0px #000000",
        "retro-sm": "2px 2px 0px 0px #000000",
        "retro-red": "4px 4px 0px 0px #c41320",
        "retro-pink": "4px 4px 0px 0px #ffd2d7",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
