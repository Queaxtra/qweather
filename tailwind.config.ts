import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "cDarkPurple": "#540079",
        "cPurple": "#d031ff",
        "cHoverPurple": "#c30aff",
      }
    }
  },

  plugins: []
} as Config;
