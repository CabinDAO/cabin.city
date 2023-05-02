import { useCallback } from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  BlockQuote,
  H4,
  H5,
  ListItem,
  OrderedList,
  Subline2,
  UnorderedList,
} from '../Typography'

export function useSlateRendering() {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return { renderElement, renderLeaf }
}

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'quote':
      return <BlockQuote {...attributes}>{children}</BlockQuote>
    case 'header1':
      return <H4 {...attributes}>{children}</H4>
    case 'header2':
      return <H5 {...attributes}>{children}</H5>
    case 'list-item':
      return <ListItem {...attributes}>{children}</ListItem>
    case 'list-bulleted':
      return <UnorderedList {...attributes}>{children}</UnorderedList>
    case 'list-numbered':
      return <OrderedList {...attributes}>{children}</OrderedList>
    default:
      return <Subline2 {...attributes}>{children}</Subline2>
  }
}

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props
  let newChildren = children
  if (leaf.bold) {
    newChildren = <strong>{children}</strong>
  }

  if (leaf.italic) {
    newChildren = <em>{children}</em>
  }

  if (leaf.underline) {
    newChildren = <u>{children}</u>
  }

  return <span {...attributes}>{newChildren}</span>
}
