module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, 
    theme: {
      extend: {
        colors: {
          primary: '#25befa',
          secondary: '#f0f4f5',
          accent: '#f5cf45',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }