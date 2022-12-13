import { useState, useEffect, createRef } from 'react'
import { Editor } from './editor'

export const Preview = ({ url }) => {
  const iframeRef = createRef()
  const [activeData, setActiveData] = useState()

  // const urlParams = new URLSearchParams(window.location.search)
  // const iframeUrl = props.url || urlParams.get('path') || '/'

  const iframeUrl = url || window.location.hash.replace('#/~', '') || '/'

  useEffect(() => {
    if (iframeRef.current) {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'open') {
          setActiveData(event.data)
        }
        if (event.data.type === 'close') {
          //
        }
      })

      iframeRef.current.contentWindow?.addEventListener('load', (e) => {
        const observer = new MutationObserver(() => {
          const iframepath = `#/~` + e.currentTarget.location.pathname
          // window.history.replaceState(null, null, iframepath)
        })
        observer.observe(e.currentTarget.document, {
          subtree: true,
          childList: true
        })
      })
    }
  }, [iframeRef.current])

  const updateData = (data) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'updateData',
      id: activeData.id,
      data: data
    })
  }

  return (
    <div className="min-h-screen flex">
      <nav className="w-96 flex-none bg-slate-200 px-4 py-4">
        <div>Edit</div>
        <Editor data={activeData?.data} update={updateData} />
      </nav>
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

export default function EditPage() {
  return <Preview />
}
