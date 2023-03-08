module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // https://usbrandcolors.com/twitter-colors/
        'twitter-blue': '#1DA1F2',
        'twitter-black': '#14171A',
        'twitter-dark-gray': '#657786',
        'twitter-light-gray': '#AAB8C2',
        'twitter-extra-light-gray': '#E1E8ED',
        'twitter-extra-extra-light-gray': '#F5F8FA'
      }
    },
  },
  plugins: [],
}