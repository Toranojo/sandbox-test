import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        ink: "#0B0B0C",
        muted: "#6B6B70",
        hairline: "#E5E4E0",
        gold: {
          DEFAULT: "#B8935F",
          light: "#EDE1D0",
          dark: "#8F6D42",
        },
        loss: "#B3413E",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Hiragino Sans",
          "Noto Sans JP",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
