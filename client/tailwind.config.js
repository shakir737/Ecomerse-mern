/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode:["class"],
  theme: {
    extend: {},
    extend: {
      colors: {
        "backGround-color-light": "var(--backGround-color-light)",
        "backGround-color-dark": "var(--backGround-color-dark)",
        "hover-color": "var(--hover-color)",
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
};
