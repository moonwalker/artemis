import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { SaveIcon } from '../common'

export default function Create({ owner, repo, branch, collection, title, onClose }) {
    let [isOpen, setIsOpen] = useState(true)
    let [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal(name)
    }

    const closeModal = (_name) => {
        setIsOpen(false)
        onClose(_name)
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        New {title}
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-500 flex items-center space-x-1">
                                                <div className="font-semibold">/</div>
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
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={`${title}`} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="border border-green-400 rounded-md px-4 py-1 hover:bg-green-200 flex items-center space-x-1"
                                            >
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
