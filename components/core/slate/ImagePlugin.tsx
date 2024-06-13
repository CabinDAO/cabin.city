import { Editor, Transforms, Element } from 'slate'
import { CustomText } from '@/types/slate'
import { RenderElementProps, useSlate } from 'slate-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { useError } from '@/components/hooks/useError'
import { useModal } from '@/components/hooks/useModal'
import { ToolbarButton } from '@/components/core/slate/Toolbar'
import styled from 'styled-components'
import { InputLabel } from '@/components/core/InputLabel'
import { InputText } from '@/components/core/InputText'
import { Caption } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { RenderPluginProps } from '@/components/core/slate/useSlateRendering'

type ImageType = 'image'
const imageTypeValue: ImageType = 'image'

export type ImageElement = {
  type: ImageType
  url: string
  caption: string
  children: CustomText[]
}

export function withImage(editor: Editor) {
  const { isVoid } = editor
  editor.isVoid = (element) => {
    return element.type === imageTypeValue ? true : isVoid(element)
  }
  return editor
}

export function withImageRendering({
  Element,
  Leaf,
}: RenderPluginProps): RenderPluginProps {
  const WithImage = (props: RenderElementProps) => {
    if (isImageElement(props.element)) {
      return <RenderImage {...props} />
    }

    return <Element {...props} />
  }

  return { Element: WithImage, Leaf }
}

function RenderImage({ attributes, children, element }: RenderElementProps) {
  if (!isImageElement(element)) return null

  return (
    <ImageContainer {...attributes} contentEditable={false}>
      <Image
        src={element.url}
        alt={element.caption}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <Caption>{element.caption}</Caption>
      {children}
    </ImageContainer>
  )
}

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`

function isImageElement(el: Element): el is ImageElement {
  return Element.isElement(el) && el.type === imageTypeValue
}

export const ImageButton = () => {
  const editor = useSlate()
  const { showModal } = useModal()
  return (
    <ToolbarButton
      type={imageTypeValue}
      iconName={'image'}
      isActive={false}
      onClick={() => {
        showModal(() => <ImageModal editor={editor} />)
      }}
    />
  )
}

const ImageModal = ({ editor }: { editor: Editor }) => {
  const { hideModal } = useModal()
  const { showError } = useError()

  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')

  return (
    <Container>
      <ModalTitle text={'Add Image'} />
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
          <InputLabel label={'Caption'} />
          <InputText
            value={caption}
            placeholder={'A gorgeous sunset'}
            onChange={(e) => setCaption(e.target.value)}
          />
        </InputGroup>

        <Buttons>
          <Button
            variant="primary"
            isFullWidth
            onClick={async () => {
              if (!url) {
                showError('Enter an image URL')
              } else {
                insertImage(editor, url, caption)
              }
              hideModal()
            }}
          >
            Add Image
          </Button>
          <Button isActive variant="tertiary" isFullWidth onClick={hideModal}>
            Cancel
          </Button>
        </Buttons>
      </Content>
    </Container>
  )
}

function insertImage(editor: Editor, url: string, caption = '') {
  Transforms.insertNodes(editor, {
    type: imageTypeValue,
    url: url,
    caption: caption,
    children: [{ text: '' }],
  } satisfies ImageElement)
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
