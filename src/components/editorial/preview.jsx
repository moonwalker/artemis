import { useState, useEffect, createRef } from 'react'

const targetOrigin = '*' // window.location.origin

export const Preview = ({ url, content, setContent }) => {
  const iframeRef = createRef()
  const [activeData, setActiveData] = useState()

  // fake it
  const fake = 'http://localhost:3000'

  const iframeUrl =
    url || window.location.hash.replace('#/~', '') || fake || '/'

  useEffect(() => {
    if (iframeRef.current) {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'open') {
          setActiveData(event.data)
        }
        if (event.data.type === 'close') {
          setActiveData(null)
        }
      })

      iframeRef.current.contentWindow?.addEventListener('load', (e) => {
        const observer = new MutationObserver(() => {
          //if (e.currentTarget.location.pathname !== iframeUrl) {
          const iframepath = `#/~` + e.currentTarget.location.pathname
          window.console.log('aaaa')
          // window.history.replaceState(null, null, iframepath)
          // }
        })
        observer.observe(e.currentTarget.document, {
          subtree: true,
          childList: true
        })
      })
    }
  }, [iframeRef.current])

  useEffect(() => {
    if (!activeData) return
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'updateData',
        id: activeData.id,
        data: content
      },
      targetOrigin
    )
  }, [content])

  return (
    <>
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        style={{ width: '100%', height: '100vh' }}
      ></iframe>
    </>
  )
}

export default function EditPage() {
  return <Preview />
}
