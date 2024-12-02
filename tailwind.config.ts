import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      cursor: {
        auto: "url('/cursor.svg'), auto",
        default: "url('/cursor.svg'), default",
        pointer: "url('/cursors/pointer.svg'), pointer",
        "not-allowed": "url('/cursors/block.svg'), not-allowed",
        text: "url('/cursors/text.svg'), text",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        shimmerGradient: "linear-gradient(90deg, #9333EA 25%, black 50%, #6366F1 75%)",
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        opacityFade: 'opacityFade 0.25s ease-out forwards',
        cursor: 'cursor 1.7s cubic-bezier(0.19, 1, 0.22, 1) forwards, hovering 6s infinite',
        shapeShift: 'shapeShift 3s cubic-bezier(0.19, 1, 0.22, 1) forwards infinite',
        shimmer: "shimmer 1.5s ease-in-out infinite",
        pulseOpacity: "pulseOpacity 1.5s ease-in-out infinite",
      },
      
      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
            backgroundImage: "linear-gradient(90deg, #9333EA 25%, black 50%, #6366F1 75%)",
            opacity: "0.8",
            // textShadow: "0 0 4px #9333EA, 0 0 8px #6366F1",
          },
          "50%": {
            backgroundPosition: "200% 0",
            backgroundImage: "linear-gradient(90deg, #6366F1 25%, black 50%, #9333EA 75%)",
            opacity: "1",
            // textShadow: "0 0 6px #6366F1, 0 0 12px #9333EA",
          },
          "100%": {
            backgroundPosition: "-200% 0",
            backgroundImage: "linear-gradient(90deg, #9333EA 25%, black 50%, #6366F1 75%)",
            opacity: "0.8",
            // textShadow: "0 0 4px #9333EA, 0 0 8px #6366F1",
          },
        },
        // Text fade-in and opacity pulse
        pulseOpacity: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        shapeShift: {
          '0%': { borderRadius: '24px' },
          '12.5%': { borderRadius: '0px' },
          '25%': { borderRadius: '48px' },
          '37.5%': { borderRadius: '60px' },
          '50%': { borderRadius: '100px' },
          '62.5%': { borderRadius: '80px' },
          '75%': { borderRadius: '0px' },
          '87.5%': { borderRadius: '20px' },
          '100%': { borderRadius: '24px' },
        },
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
