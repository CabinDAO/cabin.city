import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { Tooltip } from './Tooltip'

interface CopyToClipboardProps {
  text: string
  children: React.ReactNode
}

export const CopyToClipboard = ({ text, children }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then()
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Tooltip tooltip="Copied" hidden={!copied} open={copied} position="top">
      <Container onClick={handleCopyClick}>
        {children}
        <Icon name="copy" size={1.2} />
      </Container>
    </Tooltip>
  )
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  width: max-content;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 200ms linear;
    opacity: 0;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`
