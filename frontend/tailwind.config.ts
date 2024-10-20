import type { Config } from "tailwindcss";
import { violet, green, red, amber, sky, zinc } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: violet["200"],
          main: violet["500"],
          dark: violet["950"],
          hover: violet["100"],
          selected: violet["50"],
          focus: violet["100"],
        },
        success: {
          light: green["200"],
          main: green["500"],
          dark: green["950"],
          hover: green["100"],
          selected: green["50"],
          focus: green["100"],
        },
        error: {
          light: red["200"],
          main: red["500"],
          dark: red["950"],
          hover: red["100"],
          selected: red["50"],
          focus: red["100"],
        },
        warning: {
          light: amber["200"],
          main: amber["500"],
          dark: amber["950"],
          hover: amber["100"],
          selected: amber["50"],
          focus: amber["100"],
        },
        info: {
          light: sky["200"],
          main: sky["500"],
          dark: sky["950"],
          hover: sky["100"],
          selected: sky["50"],
          focus: sky["100"],
        },
        default: {
          light: zinc["200"],
          border: zinc["300"],
          main: zinc["500"],
          lightDark: zinc["600"],
          dark: zinc["950"],
          hover: zinc["100"],
          selected: zinc["50"],
          focus: zinc["100"],
        },
      },
    },
  },
  plugins: [],
};

export default config;
