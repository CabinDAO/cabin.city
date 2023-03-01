import styled from 'styled-components'
import Icon from './Icon'

interface CopyToClipboardProps {
  text: string
  children: React.ReactNode
}

export const CopyText = ({ text, children }: CopyToClipboardProps) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Container onClick={handleCopyClick}>
      {children}
      <Icon name="copy" size={1.2} />
    </Container>
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
