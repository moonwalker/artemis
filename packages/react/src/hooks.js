'use client'

import { useState, useEffect } from 'react'

const targetOrigin = '*' // window.location.origin

export function useArtemis(props) {
  const [data, setData] = useState(props.data)

  const id = JSON.stringify({
    collection: props.collection,
    entry: props.entry
  })

  useEffect(() => {
    setData(props.data)
  }, [id])

  useEffect(() => {
    parent.postMessage({ type: 'open', ...props, id }, targetOrigin)
    window.addEventListener('message', (event) => {
      if (event.data.id === id && event.data.type === 'updateData') {
        setData(event.data.data)
      }
    })

    return () => parent.postMessage({ type: 'close', id }, targetOrigin)
  }, [id])

  return { data }
}
