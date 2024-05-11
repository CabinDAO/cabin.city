import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { Button } from '../Button'

interface ModalActionBarProps {
  onActionClick?: VoidFunction
  locationHref?: string
  text: string
}

export const ModalActionBar = (props: ModalActionBarProps) => {
  const { hideModal } = useModal()
  const { text, onActionClick, locationHref } = props

  const handleActionClick = () => {
    onActionClick?.()
    hideModal()
  }

  if (locationHref) {
    return (
      <Container>
        <a
          href={locationHref}
          onClick={handleActionClick}
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          <Button isFullWidth onClick={handleActionClick}>
            {text}
          </Button>
        </a>
      </Container>
    )
  }

  return (
    <Container>
      <Button isFullWidth onClick={handleActionClick}>
        {text}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.green900};
  background-color: ${(props) => props.theme.colors.yellow100};
  padding: 1.6rem 2.4rem;

  a {
    width: 100%;
  }
`
