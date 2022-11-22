import { Link, useLocation } from 'react-router-dom'

export default () => {
    const location = useLocation()
    const currentPath = location.pathname
    const breadcrumbs = currentPath.substring(1).split('/').map((n, i) => {
        url: currentPath.substring(0, i + n.length)
        name: n[0].toUpperCase() + n.substring(1)
    })
    console.log(breadcrumbs)
    return <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Home
                </Link>
            </li>
            {breadcrumbs.map(bc => (
                < li >
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <Link key={bc.url} to={bc.url} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">{bc.name}</Link>
                    </div>
                </li>
            ))}
        </ol>
    </nav >
}