import { useCallback } from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { EditableProps } from 'slate-react/dist/components/editable'
import { withImageRendering } from '@/components/core/slate/ImagePlugin'
import { withButtonRendering } from '@/components/core/slate/ButtonPlugin'
import styled from 'styled-components'
import {
  BlockQuote,
  Body1,
  H4,
  H5,
  ListItem,
  OrderedList,
  UnorderedList,
} from '../Typography'

export type RenderPluginProps = {
  Element: NonNullable<EditableProps['renderElement']>
  Leaf: NonNullable<EditableProps['renderLeaf']>
}

export function useSlateRendering() {
  const { Element, Leaf } = withButtonRendering(
    withImageRendering({ Element: BaseElement, Leaf: BaseLeaf })
  )

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [Element]
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [Leaf]
  )

  return { renderElement, renderLeaf }
}

const BaseElement = (props: RenderElementProps) => {
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
      return (
        <StyledUnorderedList {...attributes}>{children}</StyledUnorderedList>
      )
    case 'list-numbered':
      return <StyledOrderedList {...attributes}>{children}</StyledOrderedList>
    default:
      return <StyledBody1 {...attributes}>{children}</StyledBody1>
  }
}

const BaseLeaf = (props: RenderLeafProps) => {
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

const StyledUnorderedList = styled(UnorderedList)`
  opacity: 0.75;
`

const StyledOrderedList = styled(OrderedList)`
  opacity: 0.75;
`

const StyledBody1 = styled(Body1)`
  opacity: 0.75;
`
