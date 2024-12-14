import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Ensure 'three/examples' is correctly resolved
      '@three': path.resolve(__dirname, 'node_modules/three')
    }
  }
});
