import { useState } from 'react'
import { Descendant, Editor, createEditor } from 'slate'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import styled from 'styled-components'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'
import { h4Styles, subline2Styles } from '../Typography'

interface SlateEditorProps {
  placeholder?: string
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
        <StyledEditable
          placeholder={props.placeholder}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </EditorContainer>
    </Slate>
  )
}

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <MarkButton format="highlight" text="Header" />
      <MarkButton format="bold" text="B" />
    </ToolbarContainer>
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
    <ToolbarItem
      onClick={() => {
        toggleMark(editor, format)
      }}
    >
      {text}
    </ToolbarItem>
  )
}

const EditorContainer = styled.div`
  margin: 1rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.green900};
`

const StyledEditable = styled(Editable)`
  ${subline2Styles}
  height: 32.5rem;
  background-color: white;
  padding: 2rem 1.6rem;
  margin-top: 0.4rem;
`

const ToolbarContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`

const ToolbarItem = styled.div`
  ${h4Styles}
  padding: 1rem;
  cursor: pointer;
`
