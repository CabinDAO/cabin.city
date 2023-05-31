import { useState } from 'react'
import {
  Descendant,
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import styled from 'styled-components'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'
import { Caption, body1Styles, h4Styles } from '../Typography'
import Icon, { IconName } from '../Icon'
import { CustomElement } from '@/types/slate'

interface SlateEditorProps {
  placeholder?: string
  value?: Descendant[]
  onChange?: ((value: Descendant[]) => void) | undefined
  error?: boolean
  errorMessage?: string
}

export const SlateEditor = (props: SlateEditorProps) => {
  const { value = defaultSlateValue, onChange } = props
  const [editor] = useState(() => withReact(createEditor()))
  const { renderElement, renderLeaf } = useSlateRendering()

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <EditorContainer error={!!props.error}>
        <Toolbar />
        <StyledEditable
          placeholder={props.placeholder}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </EditorContainer>
      {props.error && (
        <ErrorMessage emphasized $color="red600">
          {props.errorMessage}
        </ErrorMessage>
      )}
    </Slate>
  )
}

const LIST_TYPES = ['list-numbered', 'list-bulleted']

interface EditorContainerProps {
  error: boolean
}

const ErrorMessage = styled(Caption)`
  color: ${({ theme }) => theme.colors.red600};
  margin-top: 0.4rem;
`

const EditorContainer = styled.div<EditorContainerProps>`
  min-height: 32.5rem;
  background-color: white;
  border: ${({ theme, error }) =>
    error
      ? `2px solid ${theme.colors.red600}`
      : `1px solid ${theme.colors.green900}`};
`

const StyledEditable = styled(Editable)`
  ${body1Styles}
  background-color: white;
  padding: 2rem 1.6rem;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <MarkButton format="bold" iconName="format-bold" />
      <MarkButton format="italic" iconName="format-italic" />
      <MarkButton format="underline" iconName="format-underline" />
      <BlockButton format="header1" iconName="format-header1" />
      <BlockButton format="header2" iconName="format-header2" />
      <BlockButton format="quote" iconName="format-quote" />
      <BlockButton format="list-numbered" iconName="format-list-numbered" />
      <BlockButton format="list-bulleted" iconName="format-list-bulleted" />
    </ToolbarContainer>
  )
}

const ToolbarContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  overflow-x: auto;
`

const ToolbarItem = styled.div`
  ${h4Styles}
  padding: 1rem;
  cursor: pointer;
`

interface MarkButtonProps {
  format: string
  iconName: IconName
}
const MarkButton = ({ format, iconName }: MarkButtonProps) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)

  return (
    <ToolbarItem
      onMouseDown={(e) => {
        e.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <StyledIcon name={iconName} size={2} isActive={isActive} />
    </ToolbarItem>
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

interface BlockButtonProps {
  format: CustomElement['type']
  iconName: IconName
}
const BlockButton = ({ format, iconName }: BlockButtonProps) => {
  const editor = useSlate()
  const isActive = isBlockActive(editor, format)
  return (
    <ToolbarItem
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <StyledIcon name={iconName} size={2} isActive={isActive} />
    </ToolbarItem>
  )
}

const toggleBlock = (editor: Editor, format: CustomElement['type']) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n['type'] === format,
    })
  )

  return !!match
}

const StyledIcon = styled(Icon)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.42)};
`
