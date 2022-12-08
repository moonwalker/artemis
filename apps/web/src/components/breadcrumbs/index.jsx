import { Link, useParams } from 'react-router-dom'
import Branches from '../branches'

export default () => {
    const { owner, repo, branch, collection, entry } = useParams()

    return <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {owner && <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-400 inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span className="hidden">Home</span>
                </Link>
            </li>}
            {repo && <><Separator />
                <li className="inline-flex items-center">
                    {branch ? <Link to={`/cms/${owner}/${repo}/${branch}`} className="text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-100 dark:hover:text-gray-400 dark:hover:underline inline-flex items-center">
                        {owner}/{repo}
                    </Link> : <span className="text-gray-700 dark:text-gray-100 inline-flex items-center">{owner}/{repo}</span>}
                </li></>}
            {branch && <><Separator /><li className="inline-flex items-center">
                <Branches active={branch} />
            </li></>}
            {collection && <><Separator />
                <li className="inline-flex items-center">
                    {entry ? <Link to={`/cms/${owner}/${repo}/${branch}/${collection}`} className="text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-100 dark:hover:text-gray-400 dark:hover:underline inline-flex items-center">
                        {collection}
                    </Link> : <span className="text-gray-700 dark:text-gray-100 inline-flex items-center">{collection}</span>}
                </li></>}
            {entry && <><Separator />
                <li className="inline-flex items-center">
                    <span className="text-gray-700 dark:text-gray-100 inline-flex items-center">{entry}</span>
                </li></>}
        </ol>
    </nav >
}

const Separator = () => (<li className="inline-flex items-center">
    <svg className="w-6 h-6 text-gray-700 dark:text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fullrule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
    </svg></li>)