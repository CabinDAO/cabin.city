import styled, { css } from 'styled-components'
import { notch } from '../layouts/common.styles'

type ContainerShape = 'default' | 'notch' | 'curve'
type ContainerFillType = 'outline' | 'soft' | 'hard'

interface ContainerProps {
  children: React.ReactNode
  shadow?: boolean
  shape?: ContainerShape
  fillType?: ContainerFillType
  className?: string
  notchSize?: number
}

const BaseContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;

  ${({ shape, notchSize }) => {
    switch (shape) {
      case 'notch':
        return notch(notchSize)
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
          border: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
        `
    }
  }}

  ${({ shadow, theme }) =>
    shadow &&
    `
    box-shadow: 0.8rem 0.8rem 0rem ${theme.colors.yellow900};
    `}
`

const Notch = styled.div<{ notchSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.notchSize}rem};
  height: ${(props) => props.notchSize}rem};
  background-color: black;
  border: solid 1px black;
`

export const ContentCard = ({
  children,
  shadow,
  shape,
  fillType,
  className,
  notchSize = 1.6,
}: ContainerProps) => {
  return (
    <BaseContainer
      className={className}
      shadow={!!shadow}
      shape={shape ?? 'default'}
      fillType={fillType ?? 'outline'}
      notchSize={notchSize}
    >
      <>
        {shape === 'notch' ? <Notch notchSize={notchSize} /> : null}
        {children}
      </>
    </BaseContainer>
  )
}
