import { ParagraphElement } from '@/types/slate'
import { Descendant } from 'slate'

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

  const parsed = stringToSlateValue(description)[0] as ParagraphElement

  if (parsed && parsed.children[0].text === '') {
    return true
  }
}
