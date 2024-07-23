import { ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ClickAway = ({
  children,
  onClickAway,
  className,
}: {
  onClickAway: ((event: MouseEvent) => void) | null
  children: ReactNode
  className?: string
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickAway && onClickAway(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickAway, wrapperRef])

  return (
    <ClickawayWrapper className={className} ref={wrapperRef}>
      {children}
    </ClickawayWrapper>
  )
}

const ClickawayWrapper = styled.div`
  width: fit-content;
`

export default ClickAway
