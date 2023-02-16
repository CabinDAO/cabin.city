import { ColorName } from '@/styles/theme'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import Icon, { IconName } from './Icon'

interface ButtonStyledProps {
  disabled?: boolean
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: none;
  background: transparent;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.5;
    `}
`

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconName
  size?: number
  color?: ColorName
  disabled?: boolean
  onClick?: () => void
}

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <ButtonStyled type="button" {...props}>
      <Icon name={icon} {...props} />
    </ButtonStyled>
  )
}

export default IconButton
