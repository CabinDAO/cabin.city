import styled, { css } from 'styled-components'
import { notch } from '../layouts/common.styles'
import { NotchOutline } from './NotchOutline'

type ContainerShape = 'default' | 'notch' | 'curve' | 'notch-all'
type ContainerFillType = 'outline' | 'soft' | 'hard'

interface ContainerProps {
  children: React.ReactNode
  shadow?: boolean
  shape?: ContainerShape
  fillType?: ContainerFillType
  className?: string
  notchSize?: number
  maxWidth?: string
}

const BaseContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;

  ${({ shape, notchSize }) => {
    switch (shape) {
      case 'notch':
        return notch(notchSize, 'top-left')
      case 'notch-all':
        return notch(notchSize, 'all')
      case 'curve':
        return css`
          border-bottom-right-radius: 4.8rem;
        `
      default:
        return ''
    }
  }}

  ${({ fillType }) => {
    switch (fillType) {
      case 'soft':
        return css`
          background-color: ${({ theme }) => theme.colors.yellow300};
          border: none;
        `
      case 'hard':
        return css`
          background-color: ${({ theme }) => theme.colors.yellow900};
          border: none;
        `
      default:
        return css`
          border: 0.1rem solid
            var(--border-color, ${({ theme }) => theme.colors.yellow900});
        `
    }
  }}

  ${({ shadow, theme }) =>
    shadow &&
    `
    box-shadow: 0.8rem 0.8rem 0rem ${theme.colors.yellow900};
    `}

    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}rem;`}
`

export const ContentCard = ({
  children,
  shadow,
  shape,
  fillType,
  className,
  notchSize = 1.6,
  maxWidth,
}: ContainerProps) => {
  return (
    <BaseContainer
      maxWidth={maxWidth}
      className={className}
      shadow={!!shadow}
      shape={shape ?? 'default'}
      fillType={fillType ?? 'outline'}
      notchSize={notchSize}
    >
      <>
        {shape === 'notch' ? (
          <NotchOutline notchPosition="top-left" notchSize={notchSize} />
        ) : null}
        {shape === 'notch-all' ? (
          <NotchAllContent notchSize={notchSize} />
        ) : null}
        {children}
      </>
    </BaseContainer>
  )
}

interface NotchOutlineContentProps {
  notchSize: number
}

const NotchAllContent = ({ notchSize }: NotchOutlineContentProps) => {
  return (
    <>
      <NotchOutline notchPosition="top-left" notchSize={notchSize} />
      <NotchOutline notchPosition="top-right" notchSize={notchSize} />
      <NotchOutline notchPosition="bottom-left" notchSize={notchSize} />
      <NotchOutline notchPosition="bottom-right" notchSize={notchSize} />
    </>
  )
}
