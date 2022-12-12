'use client'

import { useState, useEffect, createElement } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
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

// experiments, not in use atm

export const MarkdownContentRSC = async ({ content, components, scope }) => {
  const code = await compileMDX(content)
  const MDXContent = await getMDXComponent(code, scope)
  return MDXContent({ components, ...scope })
}

const getMDXComponent = async (code) => {
  const { default: MDXContent } = await run(code, jsxRuntime)
  return MDXContent
}

const compileMDX = async (markup) => {
  return String(
    await compile(markup, {
      outputFormat: 'function-body',
      remarkPlugins: [remarkGfm]
    })
  )
}
