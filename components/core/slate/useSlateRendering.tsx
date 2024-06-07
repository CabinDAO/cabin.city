import styled from 'styled-components'
import { useCallback } from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  BlockQuote,
  Body1,
  H4,
  H5,
  ListItem,
  OrderedList,
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
      return (
        <StyledUnorderedList {...attributes}>{children}</StyledUnorderedList>
      )
    case 'list-numbered':
      return <StyledOrderedList {...attributes}>{children}</StyledOrderedList>
    case 'button':
      return (
        <StyledButton
          {...attributes}
          onClick={(e) => {
            e.preventDefault()
            console.log(element)
            const newWindow = window.open(
              element.url,
              '_blank',
              'noopener,noreferrer'
            )
            if (newWindow) {
              newWindow.opener = null // This is an additional safety measure
            }
          }}
        >
          {children}
        </StyledButton>
      )
    default:
      return <StyledBody1 {...attributes}>{children}</StyledBody1>
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

const StyledUnorderedList = styled(UnorderedList)`
  opacity: 0.75;
`

const StyledOrderedList = styled(OrderedList)`
  opacity: 0.75;
`

const StyledBody1 = styled(Body1)`
  opacity: 0.75;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  user-select: none;
  font-style: normal;

  cursor: pointer;
  white-space: nowrap;

  font-size: 1.6rem;
  width: 50%;
  margin: 0 auto;
  padding: 1.5rem 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  opacity: 0.75;

  color: ${({ theme }) => theme.colors.green900};
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.yellow200};
  outline: 0;
  border: solid 0.1rem rgb(23, 18, 11, 0.75);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow100};
  }
`
