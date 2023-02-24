import { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import { InputLabel } from './InputLabel'
import InputOutline from './InputOutline'

interface ContainerProps {
  disabled?: boolean
  filled?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  width: 100%;
  ${(props) =>
    props.disabled &&
    !props.filled &&
    `
    opacity: 0.42;
    pointer-events: none;
  `}

  ${(props) =>
    props.disabled &&
    `
    opacity: ${props.filled ? '1' : '0.5'};
    pointer-events: none;
  `}
`

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 0.2rem;
  overflow: scroll;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  info?: string
  required?: boolean
  filled?: boolean
  focused?: boolean
  error?: boolean
  message?: string
  endAdornment?: ReactNode
  helperText?: string
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
}
export const InputBase = ({
  label,
  required = false,
  filled,
  focused,
  error,
  disabled,
  endAdornment,
  onClick,
  children,
  helperText,
}: InputBaseProps) => {
  return (
    <Container disabled={disabled} filled={filled} onClick={onClick}>
      {label && (
        <InputLabel required={required} label={label} helperText={helperText} />
      )}
      <InputOutline
        filled={filled}
        focused={focused}
        error={error}
        disabled={disabled}
      >
        <ChildrenContainer>{children}</ChildrenContainer>
        {endAdornment}
      </InputOutline>
    </Container>
  )
}

InputBase.displayName = 'InputBase'
