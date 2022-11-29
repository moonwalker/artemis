import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react'
import { useClient, endpoints } from '../../lib/moonbase'
import Loader from '../loader'
import Error from '../error'

export default () => {
  const client = useClient()
  const { owner, repo, branch } = useParams()
  const [error, setError] = useState(null)
  const [compsTree, setCompsTree] = useState(null)

  useEffect(() => {
    if (compsTree) setCompsTree(null)
    client
      .get(`${endpoints.info(owner, repo, branch)}/components?sandpack=1`)
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
            files={compsTree.files}
            options={{
              showTabs: false
            }}
            customSetup={{
              dependencies: compsTree.deps
            }}
          />
        )}
      </div>
    </div>
  )
}
