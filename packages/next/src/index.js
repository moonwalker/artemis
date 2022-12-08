import { generate } from '@moonwalker/artemis-content'

const withArtemis = (nextConfig) => {
  return {
    ...nextConfig,
    webpack: (config, { dev, isServer, defaultLoaders, nextRuntime }) => {
      if (isServer) {
        generate()
      }
      return config
    }
  }
}

module.exports = { withArtemis }
