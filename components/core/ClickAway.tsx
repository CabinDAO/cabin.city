import { ReactNode, useEffect, useRef } from 'react'

interface ClickAwayProps {
  onClickAway: ((event: MouseEvent) => void) | null
  children: ReactNode
}

const ClickAway = ({ children, onClickAway }: ClickAwayProps) => {
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

  return <div ref={wrapperRef}>{children}</div>
}

export default ClickAway
