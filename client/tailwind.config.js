module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155'
        },
        accent: '#fb923c'
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.35)',
        glow: '0 0 30px rgba(251, 146, 60, 0.18)'
      }
    }
  },
  plugins: []
};
