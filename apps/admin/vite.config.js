import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    base: '/admin',
    plugins: [react()],
    build: {
      target: 'esnext',
      assetsDir: '.'
    }
  }
})
