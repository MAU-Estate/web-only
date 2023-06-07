// const defaultTheme = require('tailwindcss/defaultTheme')
// loop for creating spacing units
const createSpacingUnits = val => {
  const result = {}
  for (let i = 0; i <= val; i++) {
    result[`${i}`] = `calc(var(--unit) * ${i})`
  }
  return result
}

module.exports = {
  purge: {
    enabled: false,
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './public/index.html'],
  mode: 'jit',
  theme: {
    fontFamily: {
      serif: `var(--font-primary)`,
      italic: `var(--font-primary--italic)`,
    },
    extend: {
      transitionProperty: {
        underline: 'text-decoration',
      },
      maxWidth: {
        'prose-50': '50ch',
      },
      height: {
        'screen-80': '80vh',
        'screen-50': '50vh',
      },
      spacing: {
        ...createSpacingUnits(25),
        a: 'var(--unit-a)',
        a2: 'var(--unit-a2)',
        a3: 'var(--unit-a3)',
        b: 'var(--unit-b)',
        c: 'var(--unit-c)',
        d: 'var(--unit-d)',
        d2: 'var(--unit-d2)',
        d3: 'var(--unit-d3)',
        e: 'var(--unit-e)',
        f: 'var(--unit-f)',
        g: 'var(--unit-g)',
        h: 'var(--unit-h)',
        i: 'var(--unit-i)',
        j: 'var(--unit-j)',
        k: 'var(--unit-k)',
        l: 'var(--unit-l)',
        m: 'var(--unit-m)',
        n: 'var(--unit-n)',
        o: 'var(--unit-o)',
        p: 'var(--unit-p)',
        q: 'var(--unit-q)',
        r: 'var(--unit-r)',
        s: 'var(--unit-s)',
        t: 'var(--unit-t)',
        u: 'var(--unit-u)',
        v: 'var(--unit-v)',
        header: 'var(--unit-header)',
      },
      colors: {
        black: 'var(--black)',
        'black-b': 'var(--black-b)',
        'black-c': 'var(--black-c)',
        'grey-a': 'var(--grey-a)',
        'grey-b': 'var(--grey-b)',
        'grey-c': 'var(--grey-c)',
        'grey-d': 'var(--grey-d)',
        'grey-e': 'var(--grey-e)',
        'bio-a': 'var(--bio-a)',
        'bio-b': 'var(--bio-b)',
        'bio-c': 'var(--bio-c)',
        white: 'var(--white)',
      },
    },
    screens: {
      'xs-only': { max: '550px' },
      sm: '551px',
      'sm-only': { max: '824px' },
      md: '825px',
      'md-max': { max: '999px' },
      'md-only': { min: '825px', max: '999px' },
      work3: '925px',
      lg: '1000px',
      filterMd: '1200px',
      xl: '1400px',
    },

    fontSize: {},
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  corePlugins: {
    fontWeight: false,
    container: false,
  },
}
