var generateSpacing = (m, c) => {
  m = m || 6
  c = c || 55
  var result = {}

  for (var i = c; i >= 0; i--) {
    var r = i * m
    result[r] = r + 'px'
  }

  return result
}

module.exports = {
  purge: [
    'app/snippets/**/*.php',
    'app/templates/**/*.php',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    spacing: generateSpacing(6, 55),
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    fontSize: {
      'button-mobile': ['18px', '20px'], //m
      'text-mobile'  : 'text-s',
      'h2-mobile'    : ['32px','32px'], //l
      'h1-mobile'    : ['40px', '42px'], //lg
      'h2-tabl'      : ['40px','40px'], //md
      'h1-tabl'      : ['56px', '56px'], //lg
      'text-s'       : ['16px', '24px'], //xs
      'text'         : ['20px', '28px'], //sm
      'h3-desk'      : ['24px', '28px'], //24
      'h2-desk'      : ['48px','46px'], //md
      'h1-desk'      : ['64px', '64px'], //lg
    },
    colors: {
      black: '#151515',
      primary: '#FF5700',
      white: '#FFFFFF',
      gray: '#F8F8F8',
      purple: '#D09CF6',
    },
    extend: {
      height: {
        '90v': '90vh',
        '95v': '95vh',
        '480': '480px',
        '12' : '12px',
        '80v': '80vh',
        '60v': '60vh',
      },
      width: {
        'map-button': '600px',
        'error-button': '350px',
        'video': '90%',
      },
      minHeight: {
        'appBlock': '420px',
        '90v': '90vh',
        '550': '550px',
        '800': '800px',
      },
      maxHeight: {
        '105v': '105vh',
        '80v': '80vh',
        '880': '880px',
        '95v': '95vh',
        '70v': '70vh',
      },
      maxWidth: {
        'appBlock'       : '360px',
        'bigScreen'      : '1920px',
        'mobile-modal'   : '300px',
        'tablet-modal'   : '400px',
        'screen-modal'   : '650px',
        'bigScreen-modal': '645px'
      },
      minWidth: {
        'map-button': '540px',
      },
      borderRadius: {
        'sm': '24px',
        's': '32px',
        'lg': '40px',
        'app': '60px',
        'xl': '70px',
      },
      spacing: {
        '2xl': '450px',
      },
      screens: {
        '3xl': '1920px',
        'xl': '1366px',
        'm': '1200px',
      },
    },
  },
  variants: {
    fontSize: ['responsive'],
    extend: {},
  },
  plugins: [
    require('@whiterussianstudio/tailwind-easing'),
  ],
}
