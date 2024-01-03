import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  // server: { https: true, host: true },
  plugins: [react(), tsconfigPaths(), mkcert()],
  resolve: {
    preserveSymlinks: true,
  },
  base: '/',
});
