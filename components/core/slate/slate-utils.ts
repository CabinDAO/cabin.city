import { Element, Editor, Transforms } from 'slate'
import { Descendant } from 'slate'
import { createEditor } from '@/components/core/slate/SlateEditor'

export const defaultSlateValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export const stringToSlateValue = (
  value: string | null | undefined
): Descendant[] => {
  return value ? (JSON.parse(value) as Descendant[]) : []
}

export const isEmptyEditoryValue = (description: string | null | undefined) => {
  if (!description || description === JSON.stringify(defaultSlateValue)) {
    return true
  }

  const editor = createEditor()

  const parsed = stringToSlateValue(description)[0] as Element

  return parsed && Editor.isEmpty(editor, parsed)
}

function resetToEmptyState(editor: Editor) {
  Transforms.delete(editor, {
    at: {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    },
  })
  Transforms.removeNodes(editor, { at: [0] })
  Transforms.insertNodes(editor, defaultSlateValue)
  Transforms.select(editor, Editor.start(editor, []))

  const point = { path: [0, 0], offset: 0 }
  editor.selection = { anchor: point, focus: point } // clean up selection
  // editor.history = { redos: [], undos: [] }; // clean up history
}
