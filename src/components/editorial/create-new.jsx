import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { SaveIcon } from '../common'

export default function Create({ owner, repo, branch, collection, title, onClose }) {
    let [isOpen, setIsOpen] = useState(true)
    let [name, setName] = useState('')
    let [ext, setExt] = useState('.json')
    let [hasError, setHasError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal(true)
    }

    const closeModal = (save) => {
        if (save && (!name || (collection && !ext))) {
            return setHasError(true)
        }
        setIsOpen(false)
        onClose(save ? `${name}${ext}` : null)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        New {title}
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-500 flex items-center space-x-1">
                                                <div className="font-semibold">{owner}</div>
                                                <div className="font-semibold">/</div>
                                                <div className="font-semibold">{repo}</div>
                                                <div className="font-semibold">/</div>
                                                <div className="font-semibold">{branch}</div>
                                                <div className="font-semibold">/</div>
                                                {!!collection && <>
                                                    <div className="font-semibold">{collection}</div>
                                                    <div className="font-semibold">/</div>
                                                </>}
                                                <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" + (hasError && !name ? ' border-red-500' : '')} type="text" placeholder={`${title}`} onChange={e => setName(e.target.value)} />
                                                {!!collection && <div className="relative">
                                                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline w-20" value={ext} placeholder={ext} onChange={e => setExt(e.target.value)}>
                                                        <option value=".json">.json</option>
                                                        <option value=".md">.md</option>
                                                        <option value=".mdx">.mdx</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="border border-green-400 rounded-md px-4 py-1 hover:bg-green-200 flex items-center space-x-1">
                                                <SaveIcon />
                                                <div className="font-semibold">Save</div>
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
