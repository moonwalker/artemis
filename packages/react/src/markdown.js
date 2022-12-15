import { useState, useEffect, createElement } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

const serializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  }
}

export function MarkdownContent({ content, components, scope }) {
  const [source, setSource] = useState()

  const compile = async () => {
    const s = await serialize(content, serializeOptions)
    setSource(s)
  }

  useEffect(() => {
    if (content) {
      compile()
    }
  }, [content])

  if (!source) {
    return null
  }

  return createElement(MDXRemote, {
    ...source,
    components: components,
    scope: scope
  })
}
