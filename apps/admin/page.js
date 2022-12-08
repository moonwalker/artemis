import { useState, useEffect, createRef } from 'react'

export const Preview = ({ url }) => {
  const iframeRef = createRef()
  const txtareaRef = createRef()
  const [activeQuery, setActiveQuery] = useState()

  // const urlParams = new URLSearchParams(window.location.search)
  // const iframeUrl = props.url || urlParams.get('path') || '/'

  const iframeUrl = url || window.location.hash.replace('#/~', '') || '/'

  useEffect(() => {
    if (iframeRef.current) {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'open') {
          setActiveQuery(event.data)
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

  const updateData = (e) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'updateData',
      id: activeQuery.id,
      data: JSON.parse(e.currentTarget.value)
    })
  }

  return (
    <div className="min-h-screen flex">
      <nav className="w-96 flex-none bg-slate-200 px-4 py-4">
        <div>Edit</div>
        <textarea
          ref={txtareaRef}
          style={{ width: '100%', height: '75vh' }}
          defaultValue={JSON.stringify(activeQuery?.data)}
          onChange={updateData}
        ></textarea>
      </nav>
      <main className="flex-1 min-w-0 overflow-auto">
        <div>
          <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '100vh' }}
            src={iframeUrl}
          ></iframe>
        </div>
      </main>
    </div>
  )
}

export default function EditPage() {
  return <Preview />
}
