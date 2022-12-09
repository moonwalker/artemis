import { generate } from '@moonwalker/artemis-content'

export const dev = (options) => {
  options = { ...options, watch: true }
  return generate(options)
}
