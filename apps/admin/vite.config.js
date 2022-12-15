import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // base: '/admin',
    plugins: [react()],
    build: {
      target: 'esnext'
      // assetsDir: '.'
    },
    define: {
      __APP_ENV__: {
        MODE: mode,
        APP_BASE_URL: env.APP_BASE_URL
      }
    }
  }
})
