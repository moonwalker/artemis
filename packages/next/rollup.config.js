export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  external: ['@moonwalker/artemis-content']
}
