import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: env.PUBLIC_URL || '/',
    build: {
      outDir: env.BUILD_PATH || 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
