/// <reference types="vite/client" />

// Ambient module declarations for static asset imports handled by Vite's
// bundler. Without these, tsc reports TS2307 on PNG imports even though Vite
// resolves them at build time.
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
