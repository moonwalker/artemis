import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../lib/auth'
import { useClient, endpoints, isSchema } from '../../lib/moonbase'
import { CloseIcon, SaveIcon } from '../common'
import Error from '../error'
import Loader from '../loader'
import FieldInput from './field-input'

export default ({ owner, repo, branch, collection, entry }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const { user } = useAuth()
    const client = useClient()
    const navigate = useNavigate()

    const backUrl = `/cms/${owner}/${repo}/${branch}/${collection}`
    const apiUrl = endpoints.entry(owner, repo, branch, collection, entry)

    const cancel = () => {
        navigate(backUrl)
    }

    const save = (schema) => {
        client.put(apiUrl + (schema ? '?save_schema=true' : ''), { login: user.login, name: entry, contents: jsonContent() }).then(res => {
            if (res.error)
                return setError(res.error)
            navigate(backUrl)
        }).catch(err => setError(error.message))
    }

    useEffect(() => {
        client.get(apiUrl).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setData(data)
        }).catch(err => setError(err.message))
            .finally(() => setLoaded(true))
    }, [branch, entry])

    const setValue = (value, id) => {
        data.content[id] = value
        setData(data)
    }

    const setSchema = e => {
        try {
            const json = JSON.parse(e.target.value)
            if (!!json) {
                data.content = json
                setData(data)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    const jsonContent = () => JSON.stringify(data.content, null, 2)

    return (<div className="text-gray-900 text-sm">
        {!!error && <Error error={error} />}
        <div className="container mx-auto my-8 px4">
            <div className="file-editor container w-full">
                <div className="file-list">
                    {!loaded && !error && <Loader color="text-zinc-700" />}
                    {loaded &&
                        <div className="w-full px-4">
                            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-grey-600">{entry}</h3>
                            <div className="rounded-md rounded-t-none border-0 text-gray-70 mb-4">
                                {isSchema(entry) ?
                                    <textarea className="block h-96 py-4 px-3 w-full text-sm text-gray-700 placeholder-gray-500 font-medium outline-none bg-transparent border border-gray-400 hover:border-zinc-400 focus:border-green-500 rounded-lg resize-none" id="schema-editor" type="text" defaultValue={jsonContent()} onChange={setSchema} >
                                    </textarea>
                                    :
                                    data?.schema?.fields?.map(f =>
                                    (<div className="md:flex md:items-center mb-6" key={f.id}>
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={f.id}>
                                                {f.label}
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={data.content[f.id]} onChange={setValue} field={f} />
                                        </div>
                                    </div>)
                                    )}
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
                                </div>
                            </div>
                        </div>}
                </div>
            </div>{/* <!-- end of file-list --> */}
        </div>{/* <!-- end of file-explorer --> */}
    </div >)
}
