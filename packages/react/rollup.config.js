export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'esm',
    banner: "'use client'\n"
  },
  external: [
    'next-mdx-remote',
    'next-mdx-remote/serialize',
    'react',
    'remark-gfm'
  ]
}
