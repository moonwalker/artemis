'use client'

import { useState, useEffect } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { useArtemis } from './hooks'

const serializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  },
  parseFrontmatter: true
}

export const MarkdownContent = ({ content, components, scope }) => {
  const [source, setSource] = useState()

  const { data } = useArtemis({
    data: content
  })

  // console.log('>>>', process.env.NODE_ENV)

  const compile = async () => {
    const s = await serialize(data, serializeOptions)
    setSource(s)
  }

  useEffect(() => {
    compile()
  }, [data])

  if (!source) {
    return null
  }

  return <MDXRemote {...source} components={components} scope={scope} />
}

// https://github.com/vercel/platforms/blob/main/pages/_sites/%5Bsite%5D/%5Bslug%5D.tsx
// async function getMdxSource(postContents: string) {
//   // Use remark plugins to convert markdown into HTML string
//   const processedContent = await remark()
//     // Native remark plugin that parses markdown into MDX
//     .use(remarkMdx)
//     // Replaces tweets with static <Tweet /> component
//     .use(replaceTweets)
//     // Replaces examples with <Example /> component (only for demo.vercel.pub)
//     .use(() => replaceExamples(prisma))
//     .process(postContents);

//   // Convert converted html to string format
//   const contentHtml = String(processedContent);

//   // Serialize the content string into MDX
//   const mdxSource = await serialize(contentHtml);

//   return mdxSource;
// }

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
