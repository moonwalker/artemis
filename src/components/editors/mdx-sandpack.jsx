import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react'
import { useClient, endpoints } from '../../lib/moonbase'
import Loader from '../loader'
import Error from '../error'

export default ({ defaultValue: content }) => {
  const client = useClient()
  const { owner, repo, branch } = useParams()
  const [error, setError] = useState(null)
  const [compsTree, setCompsTree] = useState(null)

  useEffect(() => {
    if (compsTree) setCompsTree(null)
    client
      .get(endpoints.components(owner, repo, branch, true))
      .then((data) => {
        if (data.error) {
          return setError(data.error)
        }
        setCompsTree(data)
      })
      .catch((err) => setError(err.message))
  }, [branch])

  return (
    <div className="flex">
      <div className="p-8">
        {!compsTree && !error && <Loader color="text-zinc-700" />}
        {!!error && <Error error={error} />}
        {!!compsTree && (
          <Sandpack
            template="react"
            theme="auto"
            files={{
              '/App.js': {
                code: appCode({ entry: compsTree.entry })
              },
              '/Editing.mdx': {
                code: content,
                active: true
              },
              ...prefixFiles({ files: compsTree.files })
            }}
            options={{
              showTabs: false
            }}
            customSetup={{
              dependencies: {
                'next-mdx-remote': '^4.2.0',
                'remark-gfm': '^3.0.1',
                ...compsTree.deps
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

const prefixFiles = ({ files }) => {
  const res = {}
  Object.keys(files).forEach((key) => {
    const path = key.startsWith('/') ? key : `/${key}`
    res[path] = files[key]
  })
  return res
}

const appCode = ({ entry }) => {
  if (!entry.startsWith('/')) {
    entry = `/${entry}`
  }
  return `
  import React, { useState, useEffect } from 'react'
  import { serialize } from 'next-mdx-remote/serialize'
  import { MDXRemote } from 'next-mdx-remote'
  import remarkGfm from 'remark-gfm'

  // components
  import * as comps from '${entry}'
  const components = comps.default

  // content
  import datauri from './Editing.mdx'
  const data = datauri.split(',')[1]
  const markup = data ? Buffer.from(data, 'base64') : ''

  const scope = {}
  const mdxOptions = {
    remarkPlugins: [remarkGfm]
  }

  export default function App() {
    const [mdxSource, setMdxSource] = useState('')

    const parse = async () => {
      const s = await serialize(markup, { scope, mdxOptions })
      setMdxSource(s)
    }

    useEffect(() => {
      parse()
    }, [markup])

    if (!mdxSource) {
      return <></>
    }

    return (
      <>
        <MDXRemote {...mdxSource} components={components} />
      </>
    )
  }`.trim()
}
