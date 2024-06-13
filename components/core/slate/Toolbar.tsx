import React from 'react'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { CustomElement, ElementType, MarkType } from '@/types/slate'
import styled from 'styled-components'
import Icon, { IconName } from '@/components/core/Icon'
import { h4Styles } from '@/components/core/Typography'
import { ImageButton } from '@/components/core/slate/ImagePlugin'
import { ButtonButton } from '@/components/core/slate/ButtonPlugin'

export default function Toolbar() {
  return (
    <ToolbarContainer>
      <MarkButton type="bold" iconName="format-bold" />
      <MarkButton type="italic" iconName="format-italic" />
      <MarkButton type="underline" iconName="format-underline" />
      <Divider />
      <BlockButton type="header1" iconName="format-header1" />
      <BlockButton type="header2" iconName="format-header2" />
      <BlockButton type="quote" iconName="format-quote" />
      <Divider />
      <BlockButton type="list-numbered" iconName="format-list-numbered" />
      <BlockButton type="list-bulleted" iconName="format-list-bulleted" />
      <Divider />
      <ButtonButton />
      <ImageButton />
    </ToolbarContainer>
  )
}

const Divider = styled.div`
  height: 2.5rem;
  border-left: solid 1px #ddd;
  margin: 0 1rem;
`

const ToolbarContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  overflow-x: auto;
`

const BlockButton = ({
  type,
  iconName,
}: {
  type: CustomElement['type']
  iconName: IconName
}) => {
  const editor = useSlate()
  const isActive = isBlockActive(editor, type)
  return (
    <ToolbarButton
      type={type}
      iconName={iconName}
      isActive={isActive}
      onClick={async () => {
        await toggleBlock(editor, type)
      }}
    />
  )
}

const isBlockActive = (editor: Editor, type: CustomElement['type']) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === type,
    })
  )

  return !!match
}

function isList(
  type: CustomElement['type']
): type is 'list-numbered' | 'list-bulleted' {
  return ['list-numbered', 'list-bulleted'].includes(type)
}

const toggleBlock = async (editor: Editor, type: CustomElement['type']) => {
  const isActive = isBlockActive(editor, type)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && isList(n.type),
    split: true,
  })

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList(type) ? 'list-item' : type,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList(type)) {
    // turning selected text into list
    Transforms.wrapNodes(editor, { type: type, children: [] })
  }
}

const MarkButton = ({
  type,
  iconName,
}: {
  type: MarkType
  iconName: IconName
}) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, type)

  return (
    <ToolbarButton
      type={type}
      iconName={iconName}
      isActive={isActive}
      onClick={() => {
        toggleMark(editor, type)
      }}
    />
  )
}

const isMarkActive = (editor: Editor, type: MarkType) => {
  const marks = Editor.marks(editor) as Record<MarkType, boolean>
  return marks ? marks[type] === true : false
}

const toggleMark = (editor: Editor, type: MarkType) => {
  const isActive = isMarkActive(editor, type)

  if (isActive) {
    Editor.removeMark(editor, type)
  } else {
    Editor.addMark(editor, type, true)
  }
}

export const ToolbarButton = ({
  type,
  iconName,
  isActive,
  onClick,
}: {
  type: ElementType
  iconName: IconName
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <ToolbarItem
      title={prettifyTitle(type)}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <StyledIcon name={iconName} size={2} isActive={isActive} />
    </ToolbarItem>
  )
}

const StyledIcon = styled(Icon)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.42)};
`

const ToolbarItem = styled.div`
  ${h4Styles}
  padding: 1rem;
  cursor: pointer;
`

function prettifyTitle(type: ElementType) {
  switch (type) {
    case 'header1':
      return 'Heading 1'
    case 'header2':
      return 'Heading 2'
    case 'list-numbered':
      return 'Numbered list'
    case 'list-bulleted':
      return 'Bulleted list'
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}
