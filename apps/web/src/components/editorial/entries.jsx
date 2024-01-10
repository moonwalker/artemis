import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { useClient, endpoints, isSchema } from '../../lib/moonbase'
import { DeleteButton, FileIcon, NewDocumentIcon } from '../common'
import Error from '../error'
import Loader from '../loader'
import CreateNew from './create-new'

function fmtDisplayName(name) {
    return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ')
}

export default ({ owner, repo, branch, collection }) => {
    const client = useClient()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [addNew, setAddNew] = useState(false)
    const [entries, setEntries] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!!entries)
            setEntries(null)
        client.get(endpoints.collection(owner, repo, branch, collection)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setEntries(data.filter(e => !isSchema(e.name)))
        }).catch(err => setError(err.message))
    }, [])

    const newEntry = (name) => {
        if (!name)
            return setAddNew(false)

        client.post(endpoints.collection(owner, repo, branch, collection), { login: user.login, name, contents: '{}' }).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            navigate(`/cms/${owner}/${repo}/${branch}/${collection}/${name}`, { state: { isNew: true } })
        }).catch(err => setError(err.message))
            .finally(() => setAddNew(false))
    }

    const deleteEntry = (name) => (e) => {
        e.preventDefault()
        e.stopPropagation()
        client.del(endpoints.entry(owner, repo, branch, collection, name)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setEntries(entries.filter(e => (e.name != name)))
        }).catch(err => setError(err.message))
    }


    return (<div className="text-gray-900 text-sm">
        {!!error && <Error error={error} />}
        <div className="container mx-auto my-8 px4">
            <div className="file-explorer container w-full">
                <div className="branch-navigation flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-2">
                            <svg className="fill-current text-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z" />
                            </svg>
                            <div className="font-semibold">{branch}</div>
                            <svg className="w-3 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {/* <!-- branches selector dropdown --> */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-1" onClick={() => setAddNew(true)}>
                            <NewDocumentIcon />
                            <div className="font-semibold">New entry</div>
                        </button>
                    </div>
                </div> {/* <!-- end of branch-navigation --> */}
                <div className="commits-container bg-blue-100 rounded-md rounded-b-none border-blue-200 border-b-0 flex items-center justify-between px-4 py-4 mt-5">
                    <div className="flex items-center space-x-2">

                    </div>
                </div>{/* <!-- end of commits-container --> */}
                <div className="file-explorer rounded-md rounded-t-none border border-gray-300 text-gray-700 divide-y divide-gray-300">
                    {!entries && !error && <Loader color="text-zinc-700" />}
                    {!!entries && (<Link key='_back' to={`/cms/${owner}/${repo}/${branch}`} className="flex justify-between px-4 py-2 hover:bg-gray-200">
                        <div className="w-4/12 flex items-center">
                            <span className="text-bold text-center d-inline-block min-w-[1em]">. .</span>
                        </div>
                        <div className="w-6/12 truncate"></div>
                        <div className="w-2/12 text-right"></div>
                    </Link>
                    )}
                    {!!entries && entries.map((e, idx) => (<Link key={`${idx}-${e.name}`} to={`/cms/${owner}/${repo}/${branch}/${collection}/${e.name}`} className="flex justify-between px-4 py-2 hover:bg-gray-200">
                        <div className="w-4/12 flex items-center">
                            <FileIcon />
                            <span className="ml-3">{fmtDisplayName(e.name)}</span>
                        </div>
                        <div className="w-5/12 truncate"></div>
                        <div className="w-2/12 text-right"></div>
                        <div className="w-1/12 items-center">
                            <DeleteButton onClick={deleteEntry(e.name)} />
                        </div>
                    </Link>
                    ))}
                </div>{/* <!-- end of file-explorer --> */}
            </div>
        </div>
        {addNew && <CreateNew title="entry" onClose={newEntry} owner={owner} repo={repo} branch={branch} collection={collection} />}
    </div>)
}