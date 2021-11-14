module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#ff0000',
        background: '#0f0f0f',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
