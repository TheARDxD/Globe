import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['three']  // Add 'three' to the external array
    }
  }
});
