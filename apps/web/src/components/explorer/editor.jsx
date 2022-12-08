import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../lib/auth'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../error'
import Loader from '../loader'

export default ({ owner, repo, branch, path }) => {
    const [content, setContent] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuth()
    const client = useClient()
    const navigate = useNavigate()

    let backUrl = `/${owner}/${repo}/tree/${branch}`
    const idx = path.lastIndexOf("/")
    if (idx != -1)
        backUrl += `/${path.substring(0, idx)}`

    const cancel = () => {
        navigate(backUrl)
    }

    const save = (e) => {
        client.post(endpoints.blob(owner, repo, branch, path), { login: user.login, contents: btoa(content) }).then(res => {
            if (res.error)
                return setError(res.error)
            navigate(backUrl)
        }).catch(err => setError(error.message))
    }

    useEffect(() => {
        client.get(endpoints.blob(owner, repo, branch, path)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setContent(atob(data.contents))
        }).catch(err => setError(err.message))
    }, [])

    return (<div className="text-gray-900 text-sm">
        {!!error && <Error error={error} />}
        <div className="container mx-auto my-8 px4">
            <div className="file-editor container w-full">
                <div className="file-list">
                    {!content && !error && <Loader color="text-zinc-700" />}
                    {!!content && <div className="w-full px-4">
                        <div className="rounded-md rounded-t-none border border-gray-300 text-gray-70 mb-4">
                            <textarea className="block h-96 py-4 px-3 w-full text-sm text-gray-700 placeholder-gray-500 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg resize-none" id="content-editor" type="text" defaultValue={content} onChange={e => setContent(e.target.value)} >
                            </textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-2" onClick={cancel}>
                                    <svg className="fill-current text-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                    </svg>
                                    <div className="font-semibold">Cancel</div>
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="group border border-green-400 text-white bg-green-600 rounded-md px-4 py-1 hover:bg-green-200 hover:text-gray-600 flex items-center space-x-2" onClick={save}>
                                    <svg className="fill-current text-white group-hover:fill-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
                                    </svg>
                                    <div className="font-semibold">Save</div>

                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>{/* <!-- end of file-list --> */}
        </div>{/* <!-- end of file-explorer --> */}
    </div>)
}
