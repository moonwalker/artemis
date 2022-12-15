import { unified } from 'unified'

import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import { remark } from 'remark'
import remarkMdx from 'remark-mdx'

export const mdx2html = (s) => {
  return md2htmlS(s)
  return (
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      // .use(rehypeSanitize)
      .use(rehypeStringify)
      .processSync(s)
      .toString()
  )
}

import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'

export const html2mdx = (s) => {
  return html2mdS(s)
  return remark().use(remarkMdx).processSync(s).toString()

  return unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(s)
    .toString()
}

import showdown from 'showdown'

const md2htmlS = (s) => {
  const converter = new showdown.Converter({ noHeaderId: true })
  // converter.setFlavor('github')
  return converter.makeHtml(s)
}

const html2mdS = (s) => {
  const converter = new showdown.Converter()
  // converter.setFlavor('github')
  return converter.makeMarkdown(s)
}
