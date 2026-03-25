import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gyanix: {
          primary: '#10a37f',    // ChatGPT jaisa green accent
          dark: '#202123',       // Sidebar color
          darker: '#343541',     // Main chat bg
          input: '#40414f',      // Input box bg
        }
      },
    },
  },
  plugins: [],
};
export default config;