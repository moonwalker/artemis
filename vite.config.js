import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig(({ mode }) => {
  return {
    // vite config
    plugins: [react(), pluginRewriteAll()],
    server: {
      port: 3000
    },
    build: {
      target: 'esnext'
    },
    define: {
      env: {
        COMMIT_SHA: process.env.CF_PAGES_COMMIT_SHA || 'dev',
        MOONBASE_API_URL: process.env.MOONBASE_API_URL
      }
    }
  }
})
