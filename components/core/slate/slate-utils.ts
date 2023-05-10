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
