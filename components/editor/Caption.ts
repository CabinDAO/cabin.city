import { Node, mergeAttributes } from '@tiptap/core'

interface CaptionOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    caption: {
      setCaption: () => ReturnType
      toggleCaption: () => ReturnType
    }
  }
}

const Caption = Node.create<CaptionOptions>({
  name: 'caption',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'figcaption',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ]
  },

  addCommands() {
    return {
      setCaption:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
      toggleCaption:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph')
        },
    }
  },
})

export default Caption
