import styled, { css } from 'styled-components'
import { Notch } from './Notch'

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

const StyledNotch = styled(Notch)`
  display: none;
`

const BaseContainer = styled.div<ContainerProps>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;

  ${({ shape }) => {
    switch (shape) {
      case 'notch':
        return css`
          ${StyledNotch} {
            display: flex;
          }
        `
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

export const ContentCard = ({
  children,
  shadow,
  shape,
  fillType,
  className,
  notchSize,
}: ContainerProps) => {
  return (
    <BaseContainer
      className={className}
      shadow={!!shadow}
      shape={shape ?? 'default'}
      fillType={fillType ?? 'outline'}
    >
      <StyledNotch size={notchSize} />
      {children}
    </BaseContainer>
  )
}
