import { generate } from '@moonwalker/artemis-content'

export const withArtemis = (nextConfig) => {
  return {
    ...nextConfig,
    redirects: async () => {
      await generate()
      return nextConfig.redirects?.() ?? []
    }
  }
}
