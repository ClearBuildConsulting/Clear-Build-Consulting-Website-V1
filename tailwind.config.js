/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#020617',       // hero + header base
        paper: '#FFFFFF',
        structural: '#94A3B8',     // body / annotation grey
        focus: '#6366F1',          // indigo accent — the engineer's red pen
        'focus-pressed': '#4338CA', // indigo hover / pressed
        surface: '#0F172A',        // standard card / section surface
        'surface-2': '#0B1120',    // fractionally lighter cadence surface
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes for the hero and large section headings.
        'display-xl': ['clamp(3.25rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1280px',
        prose: '46ch',
      },
      keyframes: {
        // SVG stroke-dashoffset draw-in for the hero path / process line.
        'draw-line': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(0.6em)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // Accordion / disclosure reveal: small slide down with fade.
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-0.25rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'slide-down': 'slide-down 0.2s ease-out both',
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
};
