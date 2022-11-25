import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
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
      __APP_ENV__: {
        MODE: mode,
        COMMIT_SHA: env.CF_PAGES_COMMIT_SHA || env.VERCEL_GIT_COMMIT_SHA,
        MOONBASE_API_URL: env.MOONBASE_API_URL
      }
    }
  }
})
