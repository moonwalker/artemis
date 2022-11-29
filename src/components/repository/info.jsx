import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../error'
import Loader from '../loader'

export default () => {
    const client = useClient()
    const [repository, setRepository] = useState(null)
    const [error, setError] = useState(null)
    const { owner, repo, branch } = useParams()

    useEffect(() => {
        if (repository)
            setRepository(null)
        client.get(endpoints.info(owner, repo, branch)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setRepository(data)
            console.log("repository", data)
        }).catch(err => setError(err.message))
    }, [branch])

    return <>
        <div className="flex">
            <div className="p-8">
                {!repository && !error && <Loader color="text-zinc-700" />}
                {!!error && <Error error={error} />}
                {!!repository && <div className="">

                </div>}
            </div>
        </div>
    </>
}