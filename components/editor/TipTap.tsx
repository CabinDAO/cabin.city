'use client'

import React, { useState } from 'react'
import {
  JSONContent,
  Extensions,
} from '@tiptap/core/dist/packages/core/src/types'
import { useCurrentEditor, EditorProvider, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import {
  body1Styles,
  h2Styles,
  h3Styles,
  Caption,
} from '@/components/core/Typography'
import { MenuBar } from '@/components/editor/Toolbar'
import { InputBase } from '@/components/core/InputBase'

export type Content = JSONContent

export const TipTap = ({
  readonly,
  initialContent,
  label,
  required,
  placeholder,
  error,
  onChange,
}: {
  readonly?: boolean
  initialContent?: Content
  label?: string
  required?: boolean
  placeholder?: string
  error?: string | null
  onChange?: (content: Content) => void
}) => {
  const initContent = initialContent || {
    type: 'doc',
    content: [{ type: 'paragraph' }],
  }
  // const [isEmpty, setIsEmpty] = useState(isEditorEmpty(initContent))

  const extensions: Extensions = [
    Color.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  if (placeholder) {
    extensions.push(
      Placeholder.configure({
        placeholder: placeholder,
      })
    )
  }

  const el = (
    <div style={{ width: '100%' }}>
      <EditorProvider
        editable={!readonly}
        slotBefore={!readonly && <MenuBar />}
        extensions={extensions}
        content={initContent}
        onUpdate={(e) => {
          const value = e.editor.getJSON()
          // setIsEmpty(isEditorEmpty(value))
          onChange && onChange(value)
        }}
      >
        {/*{!readonly && (*/}
        {/*  <BubbleMenu editor={null}>*/}
        {/*    <HighlightedTextMenu />*/}
        {/*  </BubbleMenu>*/}
        {/*)}*/}
      </EditorProvider>
    </div>
  )

  return (
    <Container readonly={readonly}>
      {readonly ? (
        el
      ) : (
        <InputBase
          // helperTextPosition={helperTextPosition}
          // id={id}
          label={label}
          required={required}
          // info={info}
          // filled={!!value}
          error={!!error}
          errorMessage={error || undefined}
          // disabled={disabled}
          // helperText={helperText}
          // endAdornment={endAdornment}
        >
          {el}
        </InputBase>
      )}
    </Container>
  )
}

const HighlightedTextMenu = () => {
  const { editor } = useCurrentEditor()
  if (!editor) return null

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        Heading
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        Subheading
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet list
      </button>
    </>
  )
}

const Container = styled.div<{ readonly?: boolean }>`
  .tiptap {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    word-break: break-word;
    outline: 0; // no orange outline when focused

    ${({ readonly }) =>
      !readonly &&
      css`
        background-color: white;
        padding: 2rem 1.6rem;
      `}

    p.is-editor-empty:first-child::before {
      color: ${({ theme }) => theme.colors.gray};
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    h2 {
      ${h2Styles}
    }

    h3 {
      ${h3Styles}
    }

    p {
      ${body1Styles}
    }

    ul,
    ol {
      list-style-position: inside;

      li p {
        margin: 0.25rem 0;
      }
    }

    blockquote {
      border-left: 3px solid ${theme.colors.green800};
      margin: 1.5rem 0;
      padding-left: 1rem;
    }

    hr {
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.green900};
      opacity: 0.12;
    }
  }
`

const ErrorMessage = styled(Caption)`
  color: ${({ theme }) => theme.colors.red600};
  margin-top: 0.4rem;
`

export function trimEmptyParagraphs(doc: Content) {
  // Function to check if a paragraph node is empty or just contains whitespace
  function isEmptyParagraph(node: Content) {
    return (
      node.type === 'paragraph' &&
      (!node.content ||
        node.content.every(
          (child) => child.type === 'text' && child.text?.trim() === ''
        ))
    )
  }

  // Remove leading and trailing empty paragraphs
  function trimParagraphs(content: Content) {
    let start = 0
    let end = content.length

    // Remove empty paragraphs from the start
    while (start < end && isEmptyParagraph(content[start])) {
      start++
    }

    // Remove empty paragraphs from the end
    while (end > start && isEmptyParagraph(content[end - 1])) {
      end--
    }

    // Return the trimmed content array
    return content.slice(start, end)
  }

  // If the doc contains content, process it
  if (doc.content && Array.isArray(doc.content)) {
    doc.content = trimParagraphs(doc.content)
  }

  return doc // Return the modified JSON document
}

export function isEditorEmpty(value: Content | string | null | undefined) {
  if (!value) return true

  const node =
    typeof value === 'string' ? (JSON.parse(value) as Content) : value

  // If the node has no content, it is empty
  if (
    !node.content ||
    !Array.isArray(node.content) ||
    node.content.length === 0
  ) {
    return true
  }

  // Check if all the content nodes are either empty or contain only whitespace
  return node.content.every((child) => {
    // Check if it's a text node and contains only whitespace
    if (child.type === 'text' && child.text?.trim() === '') {
      return true
    }

    // Check if it's a block node (like a paragraph) and is empty
    if (
      child.type !== 'text' &&
      (!child.content || child.content.length === 0)
    ) {
      return true
    }

    // If there are non-empty nodes, return false
    return false
  })
}

export function toContent(value: string | null | undefined) {
  return value ? (JSON.parse(value) as Content) : []
}
