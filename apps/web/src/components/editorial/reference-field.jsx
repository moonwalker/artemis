
import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useClient, endpoints, isSchema } from '../../lib/moonbase'

export default function ReferenceField({ field, value, onSelect, owner, repo, branch, locale, disabled, onChange, ...rest }) {
    const client = useClient()
    const [reference, setReference] = useState(null)
    const [loaded, setLoaded] = useState(!value)
    const [showSelector, setShowSelector] = useState(false)

    useEffect(() => {
        if (!!value) {
            client.get(endpoints.reference(owner, repo, branch, field.type, value, locale)).then(data => {
                if (data.error) {
                    return setReference(data.error)
                }
                setReference(data.schema.displayField && data.content.fields[data.schema.displayField] || value)
            }).catch(err => setReference(err.message))
                .finally(() => setLoaded(true))
        }
    }, [ owner, repo, branch, field, value])

    const selectReference = (name) => {
        if (!!name) {
            client.get(endpoints.entry(owner, repo, branch, field.type, name)).then(data => {
                if (data.error) {
                    return setReference(data.error)
                }
                onChange(data.content.id || value, field.id, locale)
                setShowSelector(false)
            }).catch(err => setReference(err.message))
        }
    }

    return (<div className="md:flex md:items-center w-full">
        <div className="md:flex md:items-center w-full">
            <input type="text" defaultValue={reference} {...rest} disabled />
            {!loaded &&
                <div role="status" class="absolute ml-4">
                    <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            }
        </div>
        {!disabled && <div className="flex-auto ml-2">
            <button className={"border-2 border-gray-200 text-gray font-bold py-2 px-3 rounded" + (!loaded && ' cursor-not-allowed' || ' hover:bg-blue-200')} onClick={() => setShowSelector(true)} disabled={!loaded && 'disabled' || ''}>
                <svg className="w-4 fill-current text-gray" color="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                </svg>
            </button>
            <ReferenceSelector collection={field.type} shown={showSelector} owner={owner} repo={repo} branch={branch} onSelect={selectReference} />
        </div>}
    </div>)
}


const ReferenceSelector = ({ collection, shown, onSelect, owner, repo, branch }) => {
    const client = useClient()
    const [error, setError] = useState(null)
    const [entries, setEntries] = useState(null)

    useEffect(() => {
        client.get(endpoints.collection(owner, repo, branch, collection)).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            setEntries(data.filter(e => !isSchema(e.name)))
        }).catch(err => setError(err.message))
    }, [owner, repo, branch, collection])

    const cancelButtonRef = useRef(null)

    const onSelectClick = (name) => (e) => {
        e.preventDefault()
        onSelect(name)
    }

    return (
        <Transition.Root show={shown} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onSelect}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Select {collection}
                                        </Dialog.Title>
                                        <div className="flex flex-row flex-wrap shrink-0 justify-around justify-items-center items-stretch mt-2">
                                            {!!error && <p className="text-sm text-gray-500">{error}</p>}
                                            {!!entries && entries.map((e) => (
                                                <a key={e.name} href={`#${e.name}`} className="p-2 font-medium text-gray-600 hover:bg-gray-100" onClick={onSelectClick(e.name)}>{e.name}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => onSelect(null)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}