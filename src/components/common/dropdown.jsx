import { useCallback, useEffect, useRef, useState } from 'react'


export default ({ active, setActive, items }) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false)

    const activeClass = "bg-gray-100 text-gray-900"
    const inactiveClass = "text-gray-700"

    const handleClose = () => setOpen(false)

    const handleEscKey = useCallback((event) => {
        if (event.key === 'Escape') {
            handleClose();
        }
    }, [handleClose])

    const handleClick = useCallback((event) => {
        if (ref?.current?.contains && !ref.current.contains(event.target)) {
            handleClose();
        }
    }, [handleClose, ref])

    useEffect(() => {
        if (!open)
            return () => (null)

        document.addEventListener('keyup', handleEscKey);
        document.addEventListener('mouseup', handleClick);

        return () => {
            document.removeEventListener('keyup', handleEscKey)
            document.removeEventListener('mouseup', handleClick)
        }
    }, [open])

    return <div className="relative inline-block text-left" ref={ref}>
        <div>
            <button className={`border border-gray-400  bg-white rounded-md px-4 py-1 hover:bg-gray-200 flex items-center space-x-2` + (!items || !items.length ? disabledClass : '')} onClick={() => setOpen(!open)}>
                <svg className="fill-current text-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z" />
                </svg>
                <div className="font-semibold">{active}</div>
                <svg className="w-3 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    {(!items || items.length) && <path d="M19 9l-7 7-7-7" />}
                </svg>
            </button>
        </div>
        {!!items && items.length &&
            <div className={(open ? 'block' : 'hidden') + " absolute z-10 w-44 border-gray-400 bg-white rounded shadow dark:bg-gray-700"}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    {items.map((v, i) => (<li key={`${i}- ${v}`}>
                        <div className={"block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white " + (v == active ? activeClass : inactiveClass)} onClick={() => setActive(v)}>{v}</div>
                    </li>))
                    }
                </ul>
            </div>}
    </div >
}