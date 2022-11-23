import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'
import Error from '../../components/error'
import Loader from '../../components/loader'

export default ({ owner, repo, branch, path }) => {
    const [items, setItems] = useState(null)
    const [branches, setBranches] = useState(null)
    const [error, setError] = useState(null)

    const client = useClient()

    const sortItems = (a, b) => ((a.type > b.type) ? -1 : ((a.type < b.type) ? 1 : ((a.name < b.name) ? -1 : 1)))

    useEffect(() => {
        client.get(endpoints.branches(owner, repo)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setBranches(data.items)
        }).catch(err => setError(err.message))
    }, [])

    useEffect(() => {
        client.get(endpoints.tree(owner, repo, branch, path)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setItems(data.sort(sortItems))
        }).catch(err => setError(err.message))
    }, [branch, path])


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
                        <button className="border border-gray-400 rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-1">
                            <svg className="fill-current text-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                            <div className="font-semibold">New</div>
                            <svg className="w-3 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {/* <!-- new folder/file selector dropdown --> */}
                    </div>
                </div> {/* <!-- end of branch-navigation --> */}
                <div className="commits-container bg-blue-100 rounded-md rounded-b-none border-blue-200 border-b-0 flex items-center justify-between px-4 py-4 mt-5">
                    <div className="flex items-center space-x-2">

                    </div>
                </div>{/* <!-- end of commits-container --> */}
                <div className="file-explorer rounded-md rounded-t-none border border-gray-300 text-gray-700 divide-y divide-gray-300">
                    {!items && !error && <Loader color="text-zinc-700" />}
                    {!!items && items.map((i, idx) => (<Link key={idx} to={i.path} className="flex justify-between px-4 py-2 hover:bg-gray-200">
                        <div className="w-4/12 flex items-center">
                            {i.type == 'dir' && <DirIcon />}
                            {i.type == 'file' && <FileIcon />}
                            <span className="ml-3">{i.name}</span>
                        </div>
                        <div className="w-6/12 truncate"></div>
                        <div className="w-2/12 text-right"></div>
                    </Link>
                    ))}
                </div>{/* <!-- end of file-explorer --> */}
            </div>
        </div>
    </div>)
}

const DirIcon = () => (<svg className="w-4 fill-current text-blue-400" color="blue-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
</svg>)

const FileIcon = () => (<svg className="w-4 fill-current text-gray-600" color="gray-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M0 64C0 28.65 28.65 0 64 0H229.5C246.5 0 262.7 6.743 274.7 18.75L365.3 109.3C377.3 121.3 384 137.5 384 154.5V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM336 448V160H256C238.3 160 224 145.7 224 128V48H64C55.16 48 48 55.16 48 64V448C48 456.8 55.16 464 64 464H320C328.8 464 336 456.8 336 448z" />
</svg>)