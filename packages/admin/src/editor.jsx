import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const EditorT = ({ data }) => {
  const editor = useEditor({
    extensions: [StarterKit]
  })

  useEffect(() => {
    editor.value = data?.body
  }, [data])

  return <EditorContent editor={editor} />
}

// import { createRef, useEffect } from 'react'
// import { EditorView, minimalSetup, basicSetup } from 'codemirror'
// import { javascript } from '@codemirror/lang-javascript'

export const Editor = ({ data, update }) => {
  const onChange = (e) => {
    update({ body: e.currentTarget.value })
  }

  return (
    <textarea
      style={{ width: '100%', height: '75vh' }}
      defaultValue={data?.body}
      onChange={onChange}
    />
  )
}

// export const Editor = ({ data, update }) => {
//   const cmref = createRef()

//   useEffect(() => {
//     if (!cmref) return

//     const edview = new EditorView({
//       doc: data?.body,
//       extensions: [basicSetup, javascript()],
//       parent: cmref.current
//     })

//     return () => edview?.destroy()
//   }, [cmref])

//   const onChange = (e) => {
//     update({ body: cmref.current.value })
//   }

//   return <div ref={cmref} className="bg-white"></div>
// }
