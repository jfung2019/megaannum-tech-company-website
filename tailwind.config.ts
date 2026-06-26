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
        accent: {
          DEFAULT: "#EC721A",
          bright: "#FF6B00",
          glow: "#F09A57",
          soft: "#F4C7A1",
        },
        graphite: "#1E2328",
        charcoal: "#1A1A1A",
        pearl: "#E9E7E2",
        "off-white": "#F7F7F5",
        metallic: "#C9CDD2",
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        cinematic: "0.18em",
        nav: "0.14em",
        sub: "0.32em",
        tagline: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
