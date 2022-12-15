import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer
} from 'prosemirror-markdown'

export const RichEditor = ({ data, update }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false })
    ],
    editorProps: {
      attributes: {
        class: 'prose m-5 focus:outline-none'
      }
    }
  })

  useEffect(() => {
    if (editor && data) {
      const content = parseMarkdown(data.body)
      editor.commands.setContent(content)
      editor.commands.focus('start')

      editor.on('update', ({ editor }) => {
        const md = serializeMarkdown(editor.schema, editor.getJSON())
        update({ body: md })
      })
    }
  }, [data])

  return (
    <EditorContent
      editor={editor}
      className="bg-white w-full h-3/4 overflow-y-auto"
    />
  )
}

const parseMarkdown = (md) => {
  return defaultMarkdownParser.parse(md).toJSON()
}

const serializeMarkdown = (schema, doc) => {
  return defaultMarkdownSerializer.serialize(schema.nodeFromJSON(doc))
}
