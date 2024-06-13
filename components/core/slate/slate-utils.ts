import { Element, Editor } from 'slate'
import { Descendant } from 'slate'
import { createEditor } from '@/components/core/slate/editor'

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

export const emptyEditorValue = (description: string | null | undefined) => {
  if (!description || description === JSON.stringify(defaultSlateValue)) {
    return true
  }

  const editor = createEditor()

  const parsed = stringToSlateValue(description)[0] as Element

  return parsed && Editor.isEmpty(editor, parsed)
}
