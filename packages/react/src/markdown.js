'use client'

import { useState, useEffect, createElement } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

import { useArtemis } from './hooks'

const serializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  }
}

export function MarkdownContent({ content, components, scope }) {
  const [source, setSource] = useState()

  const { data } = useArtemis({
    data: content
  })

  const compile = async () => {
    if (data.body) {
      const s = await serialize(data.body, serializeOptions)
      setSource(s)
    }
  }

  useEffect(() => {
    compile()
  }, [data])

  if (!source) {
    return null
  }

  return createElement(MDXRemote, {
    ...source,
    components: components,
    scope: scope
  })
}
