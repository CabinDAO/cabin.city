import { useCallback } from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { Body1 } from '../Typography'

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
    // case 'block-quote':
    //   return (
    //     <blockquote style={style} {...attributes}>
    //       {children}
    //     </blockquote>
    //   )
    // case 'bulleted-list':
    //   return (
    //     <ul style={style} {...attributes}>
    //       {children}
    //     </ul>
    //   )
    // case 'heading-one':
    //   return (
    //     <h1 style={style} {...attributes}>
    //       {children}
    //     </h1>
    //   )
    // case 'heading-two':
    //   return (
    //     <h2 style={style} {...attributes}>
    //       {children}
    //     </h2>
    //   )
    // case 'list-item':
    //   return (
    //     <li style={style} {...attributes}>
    //       {children}
    //     </li>
    //   )
    // case 'numbered-list':
    //   return (
    //     <ol style={style} {...attributes}>
    //       {children}
    //     </ol>
    //   )
    default:
      return <Body1 {...attributes}>{children}</Body1>
  }
}

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props
  let newChildren = children
  if (leaf.bold) {
    newChildren = <strong>{children}</strong>
  }

  // if (leaf.code) {
  //   newChildren = <code>{children}</code>
  // }

  // if (leaf.italic) {
  //   newChildren = <em>{children}</em>
  // }

  // if (leaf.underline) {
  //   newChildren = <u>{children}</u>
  // }

  return <span {...attributes}>{newChildren}</span>
}
