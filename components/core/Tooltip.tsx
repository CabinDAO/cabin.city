import { ReactNode, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Body1 } from './Typography'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  z-index: 1;
`

const ChildWrapper = styled.div`
  cursor: default;
  width: 100%;
`

const setTooltipPosition = (
  position: TooltipPosition,
  align: TooltipAlign,
  offset = 1.2
) => {
  if (position === 'bottom') {
    if (align === 'center') {
      return css`
        left: 50%;
        bottom: -${offset}rem;
        transform: translate(-50%, 100%);
      `
    }
    if (align === 'start') {
      return css`
        left: 4.8rem;
        bottom: -${offset}rem;
        transform: translate(-100%, 100%);
      `
    }
    if (align === 'end') {
      return css`
        right: 4.8rem;
        bottom: -${offset}rem;
        transform: translate(100%, 100%);
      `
    }
  }

  if (position === 'top') {
    if (align === 'center') {
      return css`
        left: 50%;
        top: -${offset}rem;
        transform: translate(-50%, -100%);
      `
    }
    if (align === 'start') {
      return css`
        left: 4.8rem;
        top: -${offset}rem;
        transform: translate(-100%, -100%);
      `
    }
    if (align === 'end') {
      return css`
        right: 4.8rem;
        top: -${offset}rem;
        transform: translate(100%, -100%);
      `
    }
  }

  if (position === 'left') {
    return css`
      left: -${offset}rem;
      top: 50%;
      transform: translate(-100%, -50%);
    `
  }

  if (position === 'right') {
    return css`
      right: -${offset}rem;
      top: 50%;
      transform: translate(100%, -50%);
    `
  }
  return null
}

interface PositionProps {
  position: TooltipPosition
  align: TooltipAlign
  show?: boolean
  offset?: number
}

// Disabling animation for now since the offsets are incorrect
//
// const TooltipPosition = styled.div<PositionProps>`
//   position: absolute;
//   ${(props) => setTooltipPosition(props.position, props.align, props.offset)}
//   visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
//   animation: ${(props) =>
//     props.show
//       ? 'fade-in 0.3s ease-in-out forwards'
//       : 'fade-out 0.3s ease-in-out forwards'};
//   @keyframes fade-in {
//     0% {
//       opacity: 0;
//       transform: translate(120%, -50%);
//     }
//     100% {
//       opacity: 1;
//       transform: translate(100%, -50%);
//     }
//   }
//   @keyframes fade-out {
//     0% {
//       opacity: 1;
//       transform: translate(100%, -50%);
//     }
//     100% {
//       opacity: 0;
//       transform: translate(120%, -50%);
//     }
//   }
// `

const TooltipPosition = styled.div<PositionProps>`
  position: absolute;
  ${(props) => setTooltipPosition(props.position, props.align, props.offset)}
  transition: all 300ms ease;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? '1' : '0')};
`

interface TooltipContainerProps {
  paragraph?: boolean
  width?: number
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  background: ${({ theme }) => theme.colors.yellow900};
  color: ${({ theme }) => theme.colors.yellow100};
  --tip-color: ${({ theme }) => theme.colors.yellow900};
  border-radius: 1.6rem;
  padding: 1.2rem 1.6rem;
  white-space: ${({ paragraph }) => (paragraph ? 'pre-line' : 'nowrap')};
  width: ${({ paragraph, width }) =>
    paragraph && width ? `${width}rem` : 'auto'};
  text-align: ${({ paragraph }) => (paragraph ? 'center' : 'left')};
`

interface TooltipProps {
  tooltip: string
  open?: boolean
  position?: TooltipPosition
  align?: TooltipAlign
  paragraph?: boolean
  width?: number
  hidden?: boolean
  offset?: number
  children: ReactNode
}

const Tooltip = ({
  tooltip,
  open,
  position = 'bottom',
  align = 'center',
  paragraph,
  width,
  hidden,
  offset,
  children,
}: TooltipProps) => {
  const [show, setShow] = useState(open)

  useEffect(() => {
    setShow(open)
  }, [open])

  const handleMouseEnter = () => {
    setShow(true)
  }

  const handleMouseLeave = () => {
    setShow(!!open)
  }

  return (
    <Wrapper>
      <ChildWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </ChildWrapper>
      <TooltipPosition
        show={show && !hidden}
        position={position}
        align={align}
        offset={offset}
      >
        <TooltipContainer paragraph={paragraph} width={width}>
          <Body1 $color="yellow100">{tooltip}</Body1>
        </TooltipContainer>
      </TooltipPosition>
    </Wrapper>
  )
}

export default Tooltip
