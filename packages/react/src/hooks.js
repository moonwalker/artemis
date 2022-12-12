'use client'

import { useState, useEffect } from 'react'

const targetOrigin = '*' // window.location.origin

export function useArtemis(props) {
  const [data, setData] = useState(props.data)

  const id = hashCode(JSON.stringify(props.data))

  useEffect(() => {
    setData(props.data)
  }, [id])

  useEffect(() => {
    parent.postMessage({ id, type: 'open', ...props }, targetOrigin)

    window.addEventListener('message', (event) => {
      if (event.data.id === id && event.data.type === 'updateData') {
        setData(event.data.data)
      }
    })

    return () => parent.postMessage({ id, type: 'close' }, targetOrigin)
  }, [id])

  return { data }
}

function hashCode(str) {
  if (str.length === 0) return 0

  let chr, hash
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // convert to 32bit integer
  }

  return hash
}
