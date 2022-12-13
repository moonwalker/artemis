import json from '@rollup/plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  plugins: [json()],
  external: ['path', 'fs/promises', 'commander', '@moonwalker/artemis-content']
}
