import { MutableRefObject, useState } from 'react'
import { useEvent } from 'react-use'
import styled from 'styled-components'
import IconButton from './IconButton'

const GoUpButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4em;
  bottom: 3rem;
  background: white;
  padding: 1.6rem;
  width: 4.8rem;
  height: 4.8rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.green900};
  z-index: 100;
`

interface ScrollToTopProps {
  controlRef: MutableRefObject<HTMLElement>
  scrollableRef: MutableRefObject<HTMLElement>
}

export const ScrollToTop = ({ scrollableRef }: ScrollToTopProps) => {
  const [showScroll, setShowScroll] = useState(false)

  useEvent(
    'scroll',
    () => {
      if (scrollableRef.current?.parentElement) {
        setShowScroll(scrollableRef.current?.parentElement?.scrollTop > 73)
      }
    },
    scrollableRef.current?.parentElement || window
  )

  const scrollTop = () => {
    scrollableRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  if (!showScroll) {
    return null
  }

  return (
    <GoUpButton>
      <IconButton
        icon="up-arrow"
        color="green900"
        size={2}
        onClick={scrollTop}
      />
    </GoUpButton>
  )
}
