// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomTypes } from 'slate'

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
type ListNumberedElement = {
  type: 'list-numbered'
  children: ListItemElement[]
}
type ListBulletedElement = {
  type: 'list-bulleted'
  children: ListItemElement[]
}
type ListItemElement = {
  type: 'list-item'
  children: CustomText[]
}
type ButtonElement = {
  type: 'button'
  url: string
  children: CustomText
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
