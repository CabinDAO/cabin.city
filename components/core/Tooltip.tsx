import { ReactNode, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Subline1 } from './Typography'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipAlign = 'start' | 'center' | 'end'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`

const ChildWrapper = styled.div`
  cursor: default;
  width: 100%;
`

const setTooltipPosition = (
  position: TooltipPosition,
  align: TooltipAlign,
  offset = 1.2,
  animate = false
) => {
  if (position === 'bottom') {
    if (align === 'center') {
      return css`
        left: 50%;
        bottom: -${offset}rem;
        transform: translate(-50%, 100%);
        ${animate &&
        animation({
          start: { xPercentage: -50, yPercentage: 120 },
          end: { xPercentage: -50, yPercentage: 100 },
          position,
        })}
      `
    }
    if (align === 'start') {
      return css`
        left: 4.8rem;
        bottom: -${offset}rem;
        transform: translate(-100%, 100%);
        ${animate &&
        animation({
          start: { xPercentage: -120, yPercentage: 120 },
          end: { xPercentage: -100, yPercentage: 100 },
          position,
        })}
      `
    }
    if (align === 'end') {
      return css`
        right: 4.8rem;
        bottom: -${offset}rem;
        transform: translate(100%, 100%);
        ${animate &&
        animation({
          start: { xPercentage: 100, yPercentage: 120 },
          end: { xPercentage: 100, yPercentage: 100 },
          position,
        })}
      `
    }
  }

  if (position === 'top') {
    if (align === 'center') {
      return css`
        left: 50%;
        top: -${offset}rem;
        transform: translate(-50%, -100%);
        ${animate &&
        animation({
          start: { xPercentage: -50, yPercentage: -120 },
          end: { xPercentage: -50, yPercentage: -100 },
          position,
        })}
      `
    }
    if (align === 'start') {
      return css`
        left: 4.8rem;
        top: -${offset}rem;
        transform: translate(-100%, -100%);
        ${animate &&
        animation({
          start: { xPercentage: -120, yPercentage: -120 },
          end: { xPercentage: -100, yPercentage: -100 },
          position,
        })}
      `
    }
    if (align === 'end') {
      return css`
        right: 4.8rem;
        top: -${offset}rem;
        transform: translate(100%, -100%);
        ${animate &&
        animation({
          start: { xPercentage: 100, yPercentage: -120 },
          end: { xPercentage: 100, yPercentage: -100 },
          position,
        })}
      `
    }
  }

  if (position === 'left') {
    return css`
      left: -${offset}rem;
      top: 50%;
      transform: translate(-100%, -50%);
      ${animate &&
      animation({
        start: { xPercentage: -120, yPercentage: -50 },
        end: { xPercentage: -100, yPercentage: -50 },
        position,
      })}
    `
  }

  if (position === 'right') {
    return css`
      right: -${offset}rem;
      top: 50%;
      transform: translate(100%, -50%);
      ${animate &&
      animation({
        start: { xPercentage: 120, yPercentage: -50 },
        end: { xPercentage: 100, yPercentage: -50 },
        position,
      })}
    `
  }
  return null
}

interface PositionProps {
  position: TooltipPosition
  align: TooltipAlign
  show?: boolean
  offset?: number
  animate: boolean
}

const TooltipPosition = styled.div<PositionProps>`
  ${(props) => !props.animate && `transition: all 300ms ease;`}
  position: absolute;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  ${(props) => !props.animate && `opacity: ${props.show ? 1 : 0};`}
  ${(props) =>
    props.animate
      ? `animation: ${
          props.show
            ? `fade-in-${props.position}`
            : `fade-out-${props.position}`
        } 0.3s ease-in-out forwards`
      : null};
  ${(props) =>
    setTooltipPosition(
      props.position,
      props.align,
      props.offset,
      props.animate
    )}
`

interface Coordinate {
  xPercentage: number
  yPercentage: number
}

interface AnimationProps {
  start: Coordinate
  end: Coordinate
  position: TooltipPosition
}

const animation = ({ start, end, position }: AnimationProps) => css`
  @keyframes fade-in-${position} {
    0% {
      opacity: 0;
      transform: translate(${start.xPercentage}%, ${start.yPercentage}%);
    }
    100% {
      opacity: 1;
      transform: translate(${end.xPercentage}%, ${end.yPercentage}%);
    }
  }
  @keyframes fade-out-${position} {
    0% {
      opacity: 1;
      transform: translate(${end.xPercentage}%, ${end.yPercentage}%);
    }
    100% {
      opacity: 0;
      transform: translate(${start.xPercentage}%, ${start.yPercentage}%);
    }
  }
`

interface TooltipContainerProps {
  paragraph?: boolean
  width?: number
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  background: ${({ theme }) => theme.colors.yellow900};
  border-radius: 8px 0px;
  color: ${({ theme }) => theme.colors.yellow100};
  --tip-color: ${({ theme }) => theme.colors.yellow900};
  padding: 0.7rem 1.6rem;
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
  animate?: boolean
}

export const Tooltip = ({
  tooltip,
  open,
  position = 'bottom',
  align = 'center',
  paragraph,
  width,
  hidden,
  offset,
  children,
  animate = false,
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
        animate={animate}
        show={show && !hidden}
        position={position}
        align={align}
        offset={offset}
      >
        <TooltipContainer paragraph={paragraph} width={width}>
          <Subline1 $color="yellow100">{tooltip}</Subline1>
        </TooltipContainer>
      </TooltipPosition>
    </Wrapper>
  )
}
