import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import Component from './Component.jsx'

// const ReactComponent = createNode('Rating', Component)
// export default ReactComponent

// export default Node.create(createNode('Rating', Component))

export default Node.create({
  name: 'Rating',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'Rating'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['Rating', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  }
})

const createNode = (name, component) => {
  return {
    name: name,
    group: 'block',
    atom: true,

    addAttributes() {
      return {
        count: {
          default: 0
        }
      }
    },

    parseHTML() {
      return [
        {
          tag: name
        }
      ]
    },

    renderHTML({ HTMLAttributes }) {
      return [name, mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
      return ReactNodeViewRenderer(component)
    }
  }
}
