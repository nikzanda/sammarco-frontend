import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * pdfmake 0.2.x vfs_fonts.js is an IIFE: `this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {...}`
 * This doesn't work with Rollup/Vite because `this` is undefined in strict ESM.
 * This plugin rewrites it into a proper ESM export.
 */
const pdfmakeVfsPlugin = (): Plugin => ({
  name: 'pdfmake-vfs',
  transform(code, id) {
    if (id.includes('pdfmake') && id.includes('vfs_fonts')) {
      const transformed = code
        .replace('this.pdfMake = this.pdfMake || {};', '')
        .replace('this.pdfMake.vfs =', 'export const vfs =');
      return { code: transformed, map: null };
    }
    return null;
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const year = process.env.YEAR || mode;

  return {
    plugins: [react(), pdfmakeVfsPlugin()],
    base: env.PUBLIC_URL || '/',
    build: {
      outDir: year !== 'production' ? `build-${year}` : 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
