import { Editor, Element } from 'slate'
import { CustomText } from '@/types/slate'
import { RenderElementProps, useSlate } from 'slate-react'
import React, { useState } from 'react'
import { useError } from '@/components/hooks/useError'
import { useModal } from '@/components/hooks/useModal'
import { ToolbarButton } from '@/components/core/slate/Toolbar'
import styled from 'styled-components'
import { InputLabel } from '@/components/core/InputLabel'
import { InputText } from '@/components/core/InputText'
import { Button } from '@/components/core/Button'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { RenderPluginProps } from '@/components/core/slate/useSlateRendering'

type ButtonType = 'button'
const buttonTypeValue: ButtonType = 'button'

export type ButtonElement = {
  type: ButtonType
  url: string
  buttonText: string
  children: CustomText[]
}

export function withButton(editor: Editor) {
  const { isVoid } = editor
  editor.isVoid = (element) => {
    return element.type === buttonTypeValue ? true : isVoid(element)
  }
  return editor
}

export function withButtonRendering({
  Element,
  Leaf,
}: RenderPluginProps): RenderPluginProps {
  const WithButton = (props: RenderElementProps) => {
    if (isButtonElement(props.element)) {
      return <RenderButton {...props} />
    }

    return <Element {...props} />
  }

  return { Element: WithButton, Leaf }
}

function RenderButton({ attributes, children, element }: RenderElementProps) {
  if (!isButtonElement(element)) return null

  return (
    <StyledButton
      {...attributes}
      contentEditable={false}
      onClick={(e) => {
        e.preventDefault()
        const newWindow = window.open(
          element.url,
          '_blank',
          'noopener,noreferrer'
        )
        if (newWindow) {
          newWindow.opener = null // This is an additional safety measure
        }
      }}
    >
      {element.buttonText}
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  box-sizing: border-box;
  user-select: none;
  font-style: normal;

  cursor: pointer;
  white-space: nowrap;

  font-size: 1.6rem;
  width: 50%;
  margin: 0 auto;
  padding: 1.5rem 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  opacity: 0.75;

  color: ${({ theme }) => theme.colors.green900};
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.yellow200};
  outline: 0;
  border: solid 0.1rem rgb(23, 18, 11, 0.75);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow100};
  }
`

function isButtonElement(el: Element): el is ButtonElement {
  return Element.isElement(el) && el.type === buttonTypeValue
}

export const ButtonButton = () => {
  const editor = useSlate()
  const { showModal } = useModal()
  return (
    <ToolbarButton
      type={buttonTypeValue}
      iconName={'format-button'}
      isActive={false}
      onClick={() => {
        showModal(() => <ButtonModal editor={editor} />)
      }}
    />
  )
}

const ButtonModal = ({ editor }: { editor: Editor }) => {
  const { hideModal } = useModal()
  const { showError } = useError()

  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  return (
    <Container>
      <ModalTitle text={'Add Button'} />
      <Content>
        <InputGroup>
          <InputLabel label={'URL'} required />
          <InputText
            required
            value={url}
            placeholder={'https://'}
            onChange={(e) => setUrl(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label={'Button Text'} />
          <InputText
            required
            value={text}
            placeholder={'Click Me!'}
            onChange={(e) => setText(e.target.value)}
          />
        </InputGroup>

        <Buttons>
          <Button
            variant="primary"
            isFullWidth
            onClick={async () => {
              if (!url || !text) {
                showError('Enter a URL and button text')
              } else {
                insertButton(editor, url, text)
              }
              hideModal()
            }}
          >
            Add Button
          </Button>
          <Button isActive variant="tertiary" isFullWidth onClick={hideModal}>
            Cancel
          </Button>
        </Buttons>
      </Content>
    </Container>
  )
}

function insertButton(editor: Editor, url: string, text: string) {
  editor.insertNode({
    type: buttonTypeValue,
    url:
      url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`,
    buttonText: text,
    children: [{ text: '' }],
  } satisfies ButtonElement)
}

const Container = styled(ModalContainer)`
  height: min-content;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 4rem 3.2rem;
  gap: 3.2rem;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`
