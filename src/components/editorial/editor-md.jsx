import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../lib/auth'
import { useClient, endpoints } from '../../lib/moonbase'
import { CloseIcon, SaveIcon } from '../common'
import Error from '../error'
import Loader from '../loader'

export default ({ owner, repo, branch, collection, entry }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const { user } = useAuth()
    const client = useClient()
    const navigate = useNavigate()

    const backUrl = `/cms/${owner}/${repo}/${branch}/${collection}`
    const apiUrl = endpoints.entry(owner, repo, branch, collection, entry)

    const cancel = () => navigate(backUrl)

    const save = (schema) => {
        client.put(apiUrl + (schema ? '?save_schema=true' : ''), { login: user.login, name: entry, contents: data }).then(res => {
            if (res.error)
                return setError(res.error)
            navigate(backUrl)
        }).catch(err => setError(error.message))
    }

    useEffect(() => {
        client.get(apiUrl).then(resp => {
            if (resp.error) {
                return setError(resp.error)
            }
            setData(resp)
        }).catch(err => setError(err.message))
            .finally(() => setLoaded(true))
    }, [branch, entry])

    return (<div className="text-gray-900 text-sm">
        {!!error && <Error error={error} />}
        <div className="container mx-auto my-8 px4">
            <div className="file-editor container w-full">
                <div className="file-list">
                    {!loaded && !error && <Loader color="text-zinc-700" />}
                    {loaded &&
                        <div className="w-full px-4">
                            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-grey-600">{entry}</h3>
                            <div className="rounded-md rounded-t-none border border-gray-300 text-gray-70 mb-4">
                                <SandpackMDX className="block h-96 py-4 px-3 w-full text-sm text-gray-700 placeholder-gray-500 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg resize-none" id="content-editor" type="text" defaultValue={content} onChange={e => setContent(e.target.value)} >
                                </SandpackMDX>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-2" onClick={cancel}>
                                        <CloseIcon />
                                        <div className="font-semibold">Cancel</div>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="group border border-green-400 text-grey-400 bg-green-200 rounded-md px-4 py-1 hover:bg-green-400 flex items-center space-x-2" onClick={() => save()}>
                                        <SaveIcon />
                                        <div className="font-semibold">Save</div>
                                    </button>
                                    {/* <button className="group border border-green-400 text-grey-400 bg-green-200 rounded-md px-4 py-1 hover:bg-green-400 flex items-center space-x-2" onClick={() => save(true)}>
                                        <SaveIcon />
                                        <div className="font-semibold">Save with schema</div>
                                    </button> */}
                                </div>
                            </div>
                        </div>}
                </div>
            </div>{/* <!-- end of file-list --> */}
        </div>{/* <!-- end of file-explorer --> */}
    </div >)
}