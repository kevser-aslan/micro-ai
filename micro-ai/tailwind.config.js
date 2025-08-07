// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['var(--font-baloo)'],
      },
      keyframes: {
        drawDollar: {
          '0%': { transform: 'translateY(-200%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        drawDollar: 'drawDollar 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
