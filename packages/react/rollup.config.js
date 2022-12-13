export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  external: [
    'react',
    'next-mdx-remote',
    'next-mdx-remote/serialize',
    'remark-gfm'
  ]
}
