import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import logo from '../../assets/logo.png'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="p-4 bg-zinc-100 shadow-inner fixed inset-x-0 top-0 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <a href="/" className="flex items-center">
        <img src={logo} className="fixed top-0 left-0 mr-3 h-20" alt="Artemis" />
        <span className="hidden lg:inline ml-20 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Artemis</span>
      </a>
      {!!user && <div className="flex items-center md:order-2">
        <div type="button" className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <span className="block text-base text-gray-900 dark:text-white mx-2 py-1">{user.login}</span>
          <img className="w-8 h-8 rounded-full" src={user.image} alt="user photo" />
        </div>
      </div>}
    </header>
  )
}
