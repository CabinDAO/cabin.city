'use client'

import React, { useState, useRef, useLayoutEffect } from 'react'
import { useError } from '@/components/hooks/useError'
import { NO_TOKEN, apiPost } from '@/utils/api/backend'
import { uploadOneFile } from '@/components/neighborhoods/useFilesUpload'
import { cloudflareImageUrl } from '@/lib/image'
import { ImageNewResponse } from '@/utils/types/image'
import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from '@tiptap/pm/model'
import {
  JSONContent,
  Extensions,
} from '@tiptap/core/dist/packages/core/src/types'
import { EditorProvider } from '@tiptap/react'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import { body1Styles, h2Styles, h3Styles } from '@/components/core/Typography'
import { Toolbar } from '@/components/editor/Toolbar'
import { InputBase } from '@/components/core/InputBase'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import UploadImage, {
  imagePlaceholderCSS,
} from '@/components/editor/UploadImage'
import Caption from '@/components/editor/Caption'

export type Content = JSONContent

export const RichTextRender = ({
  initialContent,
  maxHeight, // TODO: this could use lh units to let you set a max height in lines of text https://caniuse.com/?search=lh%20unit
}: {
  initialContent: Content | string
  maxHeight?: number
}) => {
  return (
    <TipTap
      editable={false}
      initialContent={toContent(initialContent)}
      maxHeight={maxHeight}
    />
  )
}

export const RichTextInput = ({
  initialContent,
  label,
  required,
  placeholder,
  error,
  helperText,
  onChange,
}: {
  initialContent?: Content | string
  label?: string
  required?: boolean
  placeholder?: string
  error?: string | null
  helperText?: string
  onChange?: (content: Content) => void
}) => {
  return (
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
      helperText={helperText}
      // endAdornment={endAdornment}
      noPadding
      noOverflowScroll
    >
      <TipTap
        editable
        initialContent={toContent(initialContent)}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputBase>
  )
}

// https://tiptap.dev/docs/guides/performance says to isolate editor in separate component
const TipTap = ({
  editable,
  initialContent,
  placeholder = '',
  maxHeight,
  onChange,
}: {
  editable: boolean
  initialContent?: Content
  placeholder?: string
  maxHeight?: number
  onChange?: (content: Content) => void
}) => {
  // const [isEmpty, setIsEmpty] = useState(isEditorEmpty(initContent))

  const { showError } = useError()

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
      heading: {
        levels: [2, 3],
      },
      dropcursor: { color: theme.colors.yellow400, width: 3 },
      codeBlock: false,
      strike: false,
      hardBreak: false,
      horizontalRule: false,
    }),
    Placeholder.configure({
      showOnlyCurrent: false, // true also works well. try em both
      placeholder: ({
        editor,
        node,
        pos,
      }: {
        editor: Editor
        node: ProsemirrorNode
        pos: number
        hasAnchor: boolean
      }) => {
        if (node.type.name == 'heading') {
          const level = node.attrs.level ? node.attrs.level - 1 : ''
          return `Heading ${level}`
        }

        if (editor.isEmpty) {
          return pos === 0 ? placeholder : ''
        }

        // if (node.type.name == 'blockquote') return 'Blockquote'
        return ''
      },
    }),
    Link.extend({ inclusive: false }).configure({
      defaultProtocol: 'https',
      openOnClick: !editable,
    }),
    UploadImage.configure({
      inline: false,
      uploadFn: makeUploadFn(showError),
    }),
    Caption,
  ]

  const maxHeightPx = maxHeight ? maxHeight * 10 : undefined
  const ref = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const fadeClass = maxHeightPx && containerHeight >= maxHeightPx ? 'fade' : ''
  console.log({ containerHeight, maxHeightPx, fadeClass })

  useLayoutEffect(() => {
    if (!maxHeight || !ref.current) return

    const { height } = ref.current.getBoundingClientRect()
    setContainerHeight(height)

    const resizeObserver = new ResizeObserver(() => {
      const { height } = ref.current!.getBoundingClientRect()
      setContainerHeight(height)
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [maxHeight, ref.current])

  // TODO: consider further optimization https://tiptap.dev/docs/guides/performance#gain-more-control-over-rendering

  return (
    <Container
      ref={ref}
      editable={editable}
      maxHeight={maxHeight}
      className={fadeClass}
    >
      <EditorProvider
        editable={editable}
        immediatelyRender={false}
        slotBefore={editable && <Toolbar />}
        extensions={extensions}
        content={initialContent || emptyValue}
        onUpdate={(e) => {
          const value = e.editor.getJSON()
          // setIsEmpty(isEditorEmpty(value))
          onChange && onChange(value)
        }}
      />
    </Container>
  )
}

const makeUploadFn = (showError: (message: string) => void) => {
  return async (file: File) => {
    // return 'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/280f51ce-d0de-4eeb-4a34-ab2e04766d00/public'
    const { id, error } = await uploadOneFile(file, async () =>
      apiPost<ImageNewResponse>('api_image_new', {}, NO_TOKEN)
    )
    if (error !== null) {
      showError(error)
      return ''
    } else {
      return cloudflareImageUrl(id)
    }
  }
}

// const HighlightedTextMenu = () => {
//   const { editor } = useCurrentEditor()
//   if (!editor) return null
//
//   return (
//     <>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
//       >
//         Heading
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
//       >
//         Subheading
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive('bulletList') ? 'is-active' : ''}
//       >
//         Bullet list
//       </button>
//     </>
//   )
// }

const Container = styled.div<{ editable?: boolean; maxHeight?: number }>`
  width: 100%;

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight}rem;
      overflow-y: hidden;
    `}

  &.fade {
    -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  }

  /* container-name: editor;
  container-type: inline-size; */
  /* @container editor (height < 20rem) {
    -webkit-mask-image: none;
    mask-image: none;
  } */

  .tiptap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    word-break: break-word;
    outline: 0; // no orange outline when focused

    ${({ editable }) =>
      editable &&
      css`
        background-color: white;
        padding: 2rem 1.6rem;
      `}

    p, h2, h3, blockquote {
      &[data-placeholder].is-empty::before {
        color: ${({ theme }) => theme.colors.gray};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
        opacity: 0.75;
      }
    }

    .ProseMirror-selectednode {
      ${({ editable, theme }) =>
        editable && `outline: 3px solid ${theme.colors.yellow400}`}
    }

    // fix gapcursor not showing up in the right place
    .ProseMirror-gapcursor {
      position: relative;
    }

    h2 {
      ${h2Styles}
    }

    h3 {
      ${h3Styles}
    }

    p,
    blockquote,
    ol,
    ul,
    li::marker {
      ${body1Styles}
      ${({ editable }) => editable && `font-weight: 400;`}
      ${({ editable }) => !editable && `opacity: 0.9;`}
    }

    a {
      text-decoration: underline;
      &.uploaded-image img {
        // display: inline-block;
        width: 100%;
        // height: auto;
      }
    }

    ul,
    ol {
      list-style-position: inside;

      li + li {
        margin-top: 0.5rem;
      }

      li p {
        display: inline;
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

    figcaption {
      ${body1Styles}
      color: ${theme.colors.gray};
      text-align: center;
      margin-top: -0.8rem;
      font-size: 1.4rem;
    }

    // image uploading blurred preview + spinner
    ${imagePlaceholderCSS}
  }
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
  const node = toContent(value)

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

    const neverEmptyTypes = ['uploadImage']
    if (child.type && neverEmptyTypes.includes(child.type)) {
      return false
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

const emptyValue = { type: 'doc', content: [{ type: 'paragraph' }] }

function toContent(value: Content | string | null | undefined): Content {
  const isEmpty =
    !value || (typeof value === 'object' && Object.keys(value).length === 0)
  return isEmpty
    ? JSON.parse(JSON.stringify(emptyValue))
    : typeof value === 'string'
    ? (JSON.parse(value) as Content)
    : value
}
