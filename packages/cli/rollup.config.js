import url from '@rollup/plugin-url'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  plugins: [
    url({
      include: ['**/*.zip'],
      limit: null,
      emitFiles: false
    })
  ],
  external: [
    'path',
    'fs/promises',
    '@moonwalker/artemis-content',
    'commander',
    'decompress'
  ]
}
