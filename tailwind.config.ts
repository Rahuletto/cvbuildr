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
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        opacityFade: 'opacityFade 0.25s ease-out forwards',
        cursor: 'cursor 1.7s cubic-bezier(0.19, 1, 0.22, 1) forwards, hovering 6s infinite',
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
        cursor: {
          "0%": {
            bottom: "-20px",
            right: "-100px"
          },
          "50%": {
            bottom: "90px",
            right: "240px",
            transform: "translateX(-50%) translateY(-50%)"
          },
          "100%": {
            bottom: "256px",
            right: "192px",
            transform: "translateX(0) translateY(0)"
          }
        },
        hovering: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateX(3px) translateY(-2px)' },
          '50%': { transform: 'translateX(2px) translateY(-4px)' },
          '75%': { transform: 'translateX(3px) translateY(2px)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;
