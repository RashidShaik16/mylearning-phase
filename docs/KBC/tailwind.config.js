/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
    safelist: [
    'bg-kbc-bg',
    'bg-kbc-curtain',
    'bg-kbc-logo'
  ],
  theme: {
    extend: {
      backgroundImage: {
         'kbc-bg': "url('/images/background.png')",
         'kbc-curtain': "url('./images/curtain.png')",
        'kbc-logo': "url('../images/kbc-logo.png')"
      }
    },
  },
  plugins: [],
}



