const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
    }, 
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     }
  },
  variants: {
    extend: {
      gridTemplateRows: {
        'auto': 'auto'
      },
      gridTemplateColumns: {
        'layout': 'auto 100px'
      },
      backgroundColor: ['active'],
      textColor: ['active'],
    }
  }

}