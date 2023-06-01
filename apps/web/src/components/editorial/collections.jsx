import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../error'
import Loader from '../loader'
import { DeleteButton, NewCollectionIcon } from '../common'
import CreateNew from './create-new'

export default ({ owner, repo, branch }) => {
    const client = useClient()
    const navigate = useNavigate()
    const [addNew, setAddNew] = useState(false)
    const [collections, setCollections] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        client.get(endpoints.collections(owner, repo, branch)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setCollections(data.filter(f => (f.name[0] != '.' && f.name[0] != '_')))
        }).catch(err => setError(err.message))
    }, [])

    const newCollection = (name) => {
        if (!name)
            return setAddNew(false)

        client.post(endpoints.collections(owner, repo, branch), { name }).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            navigate(`/cms/${owner}/${repo}/${branch}/${name}`)
        }).catch(err => setError(err.message))
            .finally(() => setAddNew(false))
    }

    const deleteCollection = (col) => (e) => {
        e.preventDefault()
        e.stopPropagation()
        client.del(endpoints.collection(owner, repo, branch, col.name)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setCollections(collections.filter(c => (c.name != col.name)))
        }).catch(err => setError(err.message))
    }

    return <div className="text-gray-900 text-sm">
        {!!error && <Error error={error} />}
        <div className="container mx-auto my-8 px4">
            <div className="container w-full">
                <div className="collection-header flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <h2 className="font-medium leading-tight text-4xl text-gray-600">Collections</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-1" onClick={() => setAddNew(true)}>
                            <NewCollectionIcon />
                            <div className="font-semibold">New collection</div>
                        </button>
                    </div>
                </div> {/* <!-- end of collection-header --> */}
                <div className="flex items-center justify-center">
                    <div className="p-8">
                        {!collections && !error && <Loader color="text-zinc-700" />}
                        {!!collections && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                            {collections.map((col, idx) => (
                                <Link key={`${idx}-${col.name}`} to={`/cms/${owner}/${repo}/${branch}/${col.name}`} className="p-4 border border-stone-200 rounded-md shadow-md flex items-center justify-center hover:shadow-xl hover-border-stone-400 focus:outline-none focus:ring focus:ring-stone-600 active:bg-stone-200 active:shadow-inner transition-all">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-lg text-zinc-600">{`${col.name}`}</h3>
                                        <DeleteButton onClick={deleteCollection(col)} />
                                    </div>
                                </Link>))}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        {addNew && <CreateNew title="collection" onClose={newCollection} owner={owner} repo={repo} branch={branch} />}
    </div>
}
