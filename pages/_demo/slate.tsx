import { Button } from '@/components/core/Button'
import { Body1 } from '@/components/core/Typography'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { createEditor, Descendant, Editor } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react'
import styled from 'styled-components'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const SlateDemo: NextPage = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return (
    <>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(val) => setValue(val)}
      >
        <EditorContainer>
          <Toolbar />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            style={{
              minHeight: '200px',
              backgroundColor: 'white',
              padding: '1rem',
              marginTop: '0.4rem',
            }}
          />
        </EditorContainer>
      </Slate>
      <hr />
      <Rendered
        key={JSON.stringify(value)} // force re-render just for demo purposes
        value={value}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </>
  )
}

interface RenderedProps {
  value: Descendant[]
  renderElement: (props: RenderElementProps) => JSX.Element
  renderLeaf: (props: RenderLeafProps) => JSX.Element
}
const Rendered = (props: RenderedProps) => {
  const { value, renderElement, renderLeaf } = props
  const [readOnlyEditor] = useState(() => withReact(createEditor()))
  return (
    <EditorContainer>
      <Slate editor={readOnlyEditor} value={value}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </EditorContainer>
  )
}

const Toolbar = () => {
  return (
    <div>
      <MarkButton format="bold" text="B" />
    </div>
  )
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean>
  return marks ? marks[format] === true : false
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    console.log('removeMark', format)
    Editor.removeMark(editor, format)
  } else {
    console.log('addMark', format)
    Editor.addMark(editor, format, true)
  }
}

interface MarkButtonProps {
  format: string
  text: string
}
const MarkButton = ({ format, text }: MarkButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      variant="tertiary"
      onClick={() => {
        toggleMark(editor, format)
      }}
    >
      {text}
    </Button>
  )
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

const EditorContainer = styled.div`
  margin: 1rem;
`

export default SlateDemo
