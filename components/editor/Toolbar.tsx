import React from 'react'
import styled from 'styled-components'
import Icon, { IconName } from '@/components/core/Icon'
import { h4Styles } from '@/components/core/Typography'
import { useCurrentEditor } from '@tiptap/react'

export const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return <div></div>
  }

  return (
    <ToolbarContainer>
      <ToolbarButton
        type={'bold'}
        iconName={'format-bold'}
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        type={'italic'}
        iconName={'format-italic'}
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <Divider />
      <ToolbarButton
        type={'header1'}
        iconName={'format-header1'}
        isActive={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        type={'header2'}
        iconName={'format-header2'}
        isActive={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <ToolbarButton
        type={'quote'}
        iconName={'format-quote'}
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <Divider />
      <ToolbarButton
        type={'list-numbered'}
        iconName={'format-list-numbered'}
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        type={'list-bulleted'}
        iconName={'format-list-bulleted'}
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <Divider />
      <ToolbarButton
        type={'image'}
        iconName={'image'}
        isActive={editor.isActive('image')}
        onClick={() => editor.chain().focus().addImage().run()}
      />
      {/*<ButtonButton />*/}
      {/*<ImageButton />*/}
      {/*<button*/}
      {/*  onClick={() => editor.chain().focus().setParagraph().run()}*/}
      {/*  className={editor.isActive('paragraph') ? 'is-active' : ''}*/}
      {/*>*/} {/*  Paragraph*/} {/*</button>*/}
      {/*<button*/}
      {/*  onClick={() => editor.chain().focus().setHorizontalRule().run()}*/}
      {/*>*/} {/*  Horizontal rule*/} {/*</button>*/}
      {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
      {/*  Hard break*/} {/*</button>*/}
      {/*<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>*/}
      {/*  Clear marks*/} {/*</button>*/}
      {/*<button onClick={() => editor.chain().focus().clearNodes().run()}>*/}
      {/*  Clear nodes*/} {/*</button>*/}
      {/*<button*/} {/*  onClick={() => editor.chain().focus().undo().run()}*/}
      {/*  disabled={!editor.can().chain().focus().undo().run()}*/} {/*>*/}
      {/*  Undo*/} {/*</button>*/} {/*<button*/}
      {/*  onClick={() => editor.chain().focus().redo().run()}*/}
      {/*  disabled={!editor.can().chain().focus().redo().run()}*/} {/*>*/}
      {/*  Redo*/} {/*</button>*/}
      {/*<button*/}
      {/*  onClick={() => editor.chain().focus().setColor('#958df1').run()}*/}
      {/*  className={*/}
      {/*    editor.isActive('textStyle', { color: '#958df1' }) ? 'is-active' : ''*/}
      {/*  }*/}
      {/*>*/}
      {/*  Purple*/}
      {/*</button>*/}
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

export const ToolbarButton = ({
  type,
  iconName,
  isActive,
  onClick,
  disabled, // TODO: make this work
}: {
  type: string
  iconName: IconName
  isActive: boolean
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <ToolbarItem
      title={prettifyTitle(type)}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <StyledIcon
        name={iconName}
        size={2}
        isActive={isActive}
        className={isActive ? 'is-active' : undefined}
      />
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

function prettifyTitle(type: string) {
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
