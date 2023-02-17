import { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

interface ContainerProps {
  filled?: boolean
  focused?: boolean
  error?: boolean
  disabled?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  outline: 0;

  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.yellow900};
  --icon-color: ${(props) => props.theme.colors.yellow900};
  border: 1px solid ${(props) => props.theme.colors.yellow900};

  ${(props) =>
    props.filled &&
    `
    background: ${props.theme.colors.primary050};
    color: ${
      props.disabled ? props.theme.colors.red600 : props.theme.colors.yellow900
    };
    border: 1px solid ${props.theme.colors.yellow900};
    padding: 1.5rem;
  `}

  ${(props) =>
    props.error &&
    `
    border: 2px solid ${props.theme.colors.red600};
    padding: 1.5rem;
  `}
`
interface InputOutlineProps extends InputHTMLAttributes<HTMLDivElement> {
  filled?: boolean
  focused?: boolean
  error?: boolean
  disabled?: boolean
  children: ReactNode
}

const InputOutline = ({
  filled,
  focused,
  error,
  disabled,
  children,
  ...divProps
}: InputOutlineProps) => {
  return (
    <Container
      filled={filled}
      focused={focused}
      error={error}
      disabled={disabled}
      {...divProps}
    >
      {children}
    </Container>
  )
}

export default InputOutline
