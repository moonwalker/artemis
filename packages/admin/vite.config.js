import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es'],
      fileName: 'main'
    },
    rollupOptions: {
      external: ['react', 'framer-motion']
    }
  }
})
