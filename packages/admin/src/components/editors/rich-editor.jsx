import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { mdx2html, html2mdx } from './mdxutils'

import ReactComponent from './ext.js'

export const RichEditor = ({ data, update }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Table,
      TableRow,
      TableHeader,
      TableCell,
      ReactComponent
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-img:rounded-xl prose-a:text-blue-600'
      }
    }
  })

  useEffect(() => {
    if (editor && data) {
      const html = deserialize(editor.schema, data.body)
      console.log(html)
      editor.commands.setContent(html)
      editor.commands.focus('start')

      editor.on('update', ({ editor }) => {
        const md = serialize(editor.schema, editor.getJSON())
        console.log(md)
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

// https://github.com/ueberdosis/tiptap/issues/66

import {
  MarkdownSerializer,
  defaultMarkdownSerializer
} from 'prosemirror-markdown'

import { marked } from 'marked'
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model'

const serializerNodes = {
  ...defaultMarkdownSerializer.nodes,
  [ReactComponent.name]: function (state, node) {
    console.log(node)
    state.write('sikdjsjd')
    state.closeBlock(node)
  },
  table: function (state, node) {
    state.write('table')
    state.closeBlock(node)
  }
}

const serializerMarks = {
  ...defaultMarkdownSerializer.marks
}

const serialize = (schema, content) => {
  const proseMirrorDocument = schema.nodeFromJSON(content)
  const serializer = new MarkdownSerializer(serializerNodes, serializerMarks)

  return serializer.serialize(proseMirrorDocument, {
    tightLists: true
  })
}

function deserialize(schema, content) {
  const html = marked.parse(content)

  if (!html) return null

  const parser = new DOMParser()
  const { body } = parser.parseFromString(html, 'text/html')

  // append original source as a comment that nodes can access
  body.append(document.createComment(content))

  const state = ProseMirrorDOMParser.fromSchema(schema).parse(body)

  return state.toJSON()
}
