import { Link, useLocation, useSearchParams } from 'react-router-dom'

export default ({ count = 0, lastPage = 1 }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation()
    const activeClass = "pointer-events-none border-green-500 bg-green-50 text-green-600"
    const inactiveClass = "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"

    const page = Number(searchParams.get('page')) || 1
    const per_page = Number(searchParams.get('per_page')) || 30

    const from = (page - 1) * per_page + 1
    const to = (page - 1) * per_page + count

    if (!count)
        return null

    if (!lastPage)
        lastPage = page

    return <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            {page > 1 && <Link to={`${pathname}?page=${page - 1}`} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</Link>}
            {page < lastPage && <Link to={`${pathname}?page=${page + 1}`} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</Link>}
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    <span>Showing</span>
                    <span className="font-medium px-1">{from}</span>
                    <span>to</span>
                    <span className="font-medium px-1">{to}</span>
                    {/* <span>of</span>
                    <span className="font-medium px-1">{total}</span> */}
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    {page > 1 && <Link to={`${pathname}?page=${page - 1}`} className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </Link>}
                    <Link to={pathname} className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (page == 1 ? activeClass + " rounded-l-md" : inactiveClass)}>1</Link>
                    {lastPage > 1 && <Link to={`${pathname}?page=2`} className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (page == 2 ? activeClass : inactiveClass)}>2</Link>}
                    {/* <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a> */}
                    {lastPage > 4 && page != 3 && <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>}
                    {(page > 2 && page < lastPage - 1) && <span className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 pointer-events-none border-green-500 bg-green-50 text-green-600"}>{page}</span>}
                    {lastPage > 4 && page != lastPage - 2 && <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>}
                    {/* <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a> */}
                    {lastPage > 3 && <Link to={`${pathname}?page=${lastPage - 1}`} className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (page == lastPage - 1 ? activeClass : inactiveClass)}>{lastPage - 1}</Link>}
                    {lastPage > 2 && <Link to={`${pathname}?page=${lastPage}`} className={"relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (page == lastPage ? activeClass + " rounded-r-md" : inactiveClass)}>{lastPage}</Link>}
                    {page < lastPage && <Link to={`${pathname}?page=${page + 1}`} className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </Link>}
                </nav>
            </div>
        </div>
    </div >
}