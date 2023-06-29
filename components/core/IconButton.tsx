import { ColorName } from '@/styles/theme'
import { HTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import Icon, { IconName } from './Icon'
import { ZoomInCard } from './ZoomInCard'

interface ButtonStyledProps {
  disabled?: boolean
  addHoverState?: boolean
  size?: number
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: 0;
  ${({ addHoverState }) =>
    addHoverState &&
    `
  padding: 0.4rem;
    &:hover {
      background:
      rgba(254, 215, 162, 0.5);
    }
  `}
  border: none;
  background: transparent;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.5;
    `}

  svg {
    max-width: ${({ size }) => size}rem;
  }
`

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconName
  size?: number
  color?: ColorName
  disabled?: boolean
  onClick?: () => void
  animated?: boolean
  addHoverState?: boolean
}

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  const [hovered, setHovered] = useState(false)
  const scale = props.animated ? 1.4 : 1

  return (
    <ButtonStyled
      addHoverState={props.addHoverState}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
      {...props}
    >
      <ZoomInCard hovered={hovered} hoverScale={scale} tapScale={scale}>
        <Icon name={icon} {...props} />
      </ZoomInCard>
    </ButtonStyled>
  )
}

export default IconButton
