import { useState } from 'react'
import { Descendant, Editor, createEditor } from 'slate'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import { Button } from '../Button'
import styled from 'styled-components'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'

interface SlateEditorProps {
  value?: Descendant[]
  onChange?: ((value: Descendant[]) => void) | undefined
}

export const SlateEditor = (props: SlateEditorProps) => {
  const { value = defaultSlateValue, onChange } = props
  const [editor] = useState(() => withReact(createEditor()))
  const { renderElement, renderLeaf } = useSlateRendering()

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
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
    Editor.removeMark(editor, format)
  } else {
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

const EditorContainer = styled.div`
  margin: 1rem;
`
