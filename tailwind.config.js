/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx}',
    './src/components/**/*.{js,ts,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
