export default function Footer() {
    const commit = (__APP_ENV__.COMMIT_SHA || (__APP_ENV__.mode === 'development' ? 'dev' : '')).substring(0, 7)

    return (
        <footer className="p-4 bg-zinc-100 shadow-inner fixed inset-x-0 bottom-0 flex items-center justify-center md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-600 sm:text-center dark:text-slate-400 mr-1">© Moon & Walker Technologies 2022</span>
            {commit && <span className="text-sm text-gray-600 sm:display-none dark:text-slate-400">| {commit}</span>}
        </footer>
    )
}
