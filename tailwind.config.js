module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'kawaii': "url('/public/img/pexels-photo-2256259.jpeg')", // FUNKAR INTE.....!
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
