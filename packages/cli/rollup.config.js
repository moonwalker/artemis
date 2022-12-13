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
      limit: 2048000, // 2mb
      emitFiles: false
    })
  ],
  external: ['path', 'fs/promises', 'commander', '@moonwalker/artemis-content']
}
