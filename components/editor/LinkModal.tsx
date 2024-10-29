import { useEffect, useState, useRef } from 'react'
import { useEvent } from 'react-use'
import { Editor } from '@tiptap/core'
import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { InputText } from '@/components/core/InputText'
import { Button } from '@/components/core/Button'

export const LinkModal = ({ editor }: { editor: Editor }) => {
  const { hideModal } = useModal()
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  useEvent('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal()
    } else if (event.key === 'Enter') {
      addLink()
    }
  })

  const addLink = () => {
    if (!url) {
      return
    }

    editor
      .chain()
      .focus()
      .command(({ state }) => {
        const { from, to } = state.selection
        const linkMark = state.selection.$from
          .marks()
          .find((mark) => mark.type.name === 'link')

        if (linkMark) {
          // If cursor is in a link, replace that link
          const textMark = state.selection.$from.parent.child(
            state.selection.$from.index()
          )
          const linkStart =
            state.selection.$from.pos - state.selection.$from.textOffset
          const linkEnd = linkStart + (text || url).length
          console.log(state.selection.from, state.selection.to, textMark)
          return editor
            .chain()
            .extendMarkRange('link')
            .insertContent(text || url)
            .setTextSelection({ from: linkStart, to: linkEnd })
            .setLink({ href: url })
            .setTextSelection(linkEnd)
            .run()
        } else if (from !== to) {
          // If there's a selection, replace it with the link
          return editor
            .chain()
            .setLink({ href: url })
            .setTextSelection(state.selection.to)
            .run()
        } else {
          // If no selection, insert a new link at cursor position
          return editor
            .chain()
            .insertContent(text || url)
            .setTextSelection({
              from: state.selection.from,
              to: state.selection.from + (text || url).length,
            })
            .setLink({ href: url })
            .setTextSelection(state.selection.from + (text || url).length)
            .run()
        }
      })

    hideModal()
  }

  const urlInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { state } = editor
    const { from, to } = state.selection
    const selectedText = state.doc.textBetween(from, to)
    const linkMark =
      from === to
        ? state.selection.$from
            .marks()
            .find((mark) => mark.type.name === 'link')
        : null

    if (linkMark) {
      const textMark = state.selection.$from.parent.child(
        state.selection.$from.index()
      )
      setText(textMark.text || '')
      setUrl(linkMark.attrs.href)
    } else if (selectedText) {
      setText(selectedText)
    }

    setTimeout(() => {
      urlInputRef.current?.focus()
    }, 100)
  }, [editor])

  return (
    <StyledModalContainer>
      <ModalTitle text={'Add a link'} />
      <ModalContent>
        <InputText
          ref={urlInputRef}
          placeholder={'URL'}
          type={'url'}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <InputText
          placeholder={'Text'}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <Actions>
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addLink}>
            Add link
          </Button>
        </Actions>
      </ModalContent>
    </StyledModalContainer>
  )
}

const StyledModalContainer = styled(ModalContainer)`
  height: min-content;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 3.2rem;
  gap: 3.2rem;
  text-align: center;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-self: flex-end;
  padding: 0.8rem;
  gap: 0.8rem;
`
