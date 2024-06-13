import { CustomTypes } from 'slate'
import { ImageElement } from '@/components/core/slate/ImagePlugin'
import { ButtonElement } from '@/components/core/slate/ButtonPlugin'

type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}
type Header1Element = {
  type: 'header1'
  children: CustomText[]
}
type Header2Element = {
  type: 'header2'
  children: CustomText[]
}
type QuoteElement = {
  type: 'quote'
  children: CustomText[]
}
type ListItemElement = {
  type: 'list-item'
  children: CustomText[]
}
type ListNumberedElement = {
  type: 'list-numbered'
  children: ListItemElement[]
}
type ListBulletedElement = {
  type: 'list-bulleted'
  children: ListItemElement[]
}

type CustomElement =
  | ParagraphElement
  | Header1Element
  | Header2Element
  | QuoteElement
  | ListNumberedElement
  | ListBulletedElement
  | ListItemElement
  | ButtonElement
  | ImageElement

type MarkType = 'bold' | 'italic' | 'underline'

type ElementType = CustomElement['type'] | MarkType

type CustomText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
}

declare module 'slate' {
  interface CustomTypes extends CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
