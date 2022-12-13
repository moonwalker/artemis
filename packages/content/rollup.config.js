export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  external: [
    'path',
    'fs/promises',
    'node:child_process',
    'fast-glob',
    'gray-matter',
    'chokidar',
    'camelcase'
  ]
}
