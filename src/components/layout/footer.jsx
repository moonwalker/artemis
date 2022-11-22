export default function Footer() {
    const commit = env.COMMIT_SHA.substring(0, 7)

    return (
        <footer className="p-4 bg-zinc-100 shadow-inner fixed inset-x-0 bottom-0 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-600 sm:text-center dark:text-slate-400">© Moon & Walker Technologies 2022 | <a href="https://artemis.mw.zone/" className="text:zinc-600 hover:underline">Artemis</a>
            </span>
            <span className="text-sm text-gray-600 sm:display-none dark:text-slate-400 float-right">{commit}</span>
        </footer>
    )
}
