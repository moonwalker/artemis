import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../../components/error'
import Loader from '../../components/loader'

export default () => {
    const client = useClient()
    const [repos, setRepos] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        client.get(endpoints.repos()).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setRepos(data)
        }).catch(err => setError(err.message))
    }, [])

    return <div className="flex items-center justify-center">
        <div className="p-8">
            {!repos && !error && <Loader color="text-zinc-700" />}
            {!!error && <Error error={error} />}
            {!!repos && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {(repos.items || []).map(repo => (<Link key={`${repo.owner}/${repo.name}`} to={`/${repo.owner}/${repo.name}/tree/${repo.defaultBranch}/`} className="p-4 border border-stone-200 rounded-md shadow-md flex items-center justify-center hover:shadow-xl hover-border-stone-400 focus:outline-none focus:ring focus:ring-stone-600 active:bg-stone-200 active:shadow-inner transition-all">
                    {`${repo.owner}/${repo.name}`}
                </Link>))}
            </div>}
        </div>
    </div>
}