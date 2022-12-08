import { generate } from '@moonwalker/artemis-content'

const withArtemis = (nextConfig) => {
  return {
    ...nextConfig,
    redirects: async () => {
      await generate()
      return nextConfig.redirects?.() ?? []
    }
  }
}

module.exports = { withArtemis }
