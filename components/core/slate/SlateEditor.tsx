import React, { useState } from 'react'
import { BaseEditor, Descendant, createEditor as baseCreateEditor } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'
import styled from 'styled-components'
import { Caption, Subline1, body1Styles } from '../Typography'
import Toolbar from '@/components/core/slate/Toolbar'
import { withButton } from '@/components/core/slate/ButtonPlugin'
import { withImage } from '@/components/core/slate/ImagePlugin'

export function createEditor(): BaseEditor & ReactEditor {
  return withReact(withButton(withImage(baseCreateEditor())))
}

export const SlateEditor = ({
  value = defaultSlateValue,
  label,
  placeholder,
  error,
  onChange,
}: {
  value?: Descendant[]
  label?: string
  placeholder?: string
  error?: string | null
  onChange?: ((value: Descendant[]) => void) | undefined
}) => {
  const [editor] = useState(() => createEditor())
  const { renderElement, renderLeaf } = useSlateRendering()

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {label && <StyledSubline1>{label}</StyledSubline1>}
      <EditorContainer error={!!error}>
        <Toolbar />
        <StyledEditable
          placeholder={placeholder}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </EditorContainer>
      {error && (
        <ErrorMessage emphasized $color="red600">
          {error}
        </ErrorMessage>
      )}
    </Slate>
  )
}

const StyledSubline1 = styled(Subline1)`
  padding-bottom: 1.6rem;
`

const ErrorMessage = styled(Caption)`
  color: ${({ theme }) => theme.colors.red600};
  margin-top: 0.4rem;
`

const EditorContainer = styled.div<{
  error: boolean
}>`
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
