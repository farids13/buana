import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#27104E",
        purple: "#9854CB",
        "light-purple": "rgba(221, 172, 245, 0.4)",
        "base-purple": "#334798",
        "base-pink" : "#E854D3",

        // blue: "#4F6DFF",
      },
      fontFamily: {
        'exo': ["Exo", "sans-serif"],
        'notosan' : ["Noto Sans", "sans-serif"],
      }
    },
  },
  prefix: "tw-",
  plugins: [],
};

export type { Config };
export { config };
