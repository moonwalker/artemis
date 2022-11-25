import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../error'
import Loader from '../loader'
import Pagination from '../pagination'

export default () => {
    const client = useClient()
    const { search } = useLocation()
    const [repos, setRepos] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (repos)
            setRepos(null)
        client.get(endpoints.repos(), search).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setRepos(data)
        }).catch(err => setError(err.message))
    }, [search])

    return <>
        <div className="flex items-center justify-center">
            <div className="p-8">
                {!repos && !error && <Loader color="text-zinc-700" />}
                {!!error && <Error error={error} />}
                {!!repos && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                    {(repos.items || []).map(repo => (<Link key={`${repo.owner}/${repo.name}`} to={`/cms/${repo.owner}/${repo.name}/${repo.defaultBranch}/`} className="p-4 border border-stone-200 rounded-md shadow-md flex items-center justify-center hover:shadow-xl hover-border-stone-400 focus:outline-none focus:ring focus:ring-stone-600 active:bg-stone-200 active:shadow-inner transition-all">
                        {`${repo.owner}/${repo.name}`}
                    </Link>))}
                </div>}
            </div>
        </div>
        <Pagination count={repos?.items?.length} lastPage={repos?.lastPage} />
    </>
}