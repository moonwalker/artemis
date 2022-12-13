import { useState, useEffect, createRef } from 'react'
import { motion } from 'framer-motion'
import { Editor } from './editor'

import './app.css'

const dev = import.meta.env.DEV
const targetOrigin = '*' // dev ? '*' : window.location.origin

const testAppUrl = __APP_ENV__.TEST_APP_URL

const iframePath = window.location.hash.replace('#', '') || '/'
const iframeUrl = testAppUrl ? testAppUrl + iframePath : iframePath

export const AdminPage = () => {
  const iframeRef = createRef()
  const [activeData, setActiveData] = useState()

  useEffect(() => {
    if (iframeRef.current) {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'open') {
          setActiveData(event.data)
          window.location.hash = `${event.data.path}`
        }
        if (event.data.type === 'close') {
          setActiveData()
          window.location.hash = ''
        }
      })

      iframeRef.current.addEventListener('load', (e) => {
        // iframe loaded, not in use atm.
      })
    }
  }, [iframeRef.current])

  const updateData = (data) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'updateData',
        id: activeData.id,
        data: data
      },
      targetOrigin
    )
  }

  let className = 'w-96 flex-none bg-slate-200 px-4 py-4'
  if (!activeData) {
    className += ' hidden'
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' }
  }

  return (
    <div className="min-h-screen flex">
      <motion.nav
        initial={false}
        animate={activeData ? 'open' : 'closed'}
        variants={variants}
        className={className}
      >
        <span>Edit</span>
        <Editor data={activeData?.data} update={updateData} />
      </motion.nav>
      <main className="flex-1 min-w-0 overflow-auto">
        <div>
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            style={{ width: '100%', height: '100vh' }}
          ></iframe>
        </div>
      </main>
    </div>
  )
}
