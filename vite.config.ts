import path from 'path';
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    // The React Router plugin owns React/JSX transform, route code-splitting,
    // and the build-time prerender pass. It replaces @vitejs/plugin-react.
    plugins: [reactRouter()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
