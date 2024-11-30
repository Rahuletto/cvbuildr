import type { Config } from "tailwindcss";

const config: Config = {
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
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards', // Define the fadeIn animation
        opacityFade: 'opacityFade 0.25s ease-out forwards', // Define the fadeIn animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        opacityFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
