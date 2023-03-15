import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { buttonStyles } from './Typography'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'

interface StyledButtonProps {
  variant: ButtonVariant
}

const StyledButton = styled.button<StyledButtonProps>`
  ${buttonStyles}
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  outline: 0;
  border: none;
  padding: 1.5rem 2.4rem;
  white-space: nowrap;

  // Shared for primary and secondary
  border-width: 0.1rem 0.4rem 0.4rem 0.1rem;
  border-style: solid inset;
  border-color: ${({ theme }) => theme.colors.green900};

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.green400};
          color: ${({ theme }) => theme.colors.green900};
          &:hover {
            border-width: 0.4rem 0.1rem 0.1rem 0.4rem;
            padding: 1.4rem 2.4rem;
            margin-bottom: 0.2rem;
          }
        `
      case 'secondary':
        return css`
          background-color: ${({ theme }) => theme.colors.yellow100};
          color: ${({ theme }) => theme.colors.green900};
          &:hover {
            border-width: 0.4rem 0.1rem 0.1rem 0.4rem;
            padding: 1.4rem 2.4rem;
            margin-bottom: 0.2rem;
          }
        `
      case 'tertiary':
        return css`
          background-color: ${({ theme }) => theme.colors.yellow200};
          color: #000;
          border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};

          &:hover {
            background-color: ${({ theme }) => theme.colors.yellow100};
            border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
            margin-bottom: 0;
          }
        `
      case 'link':
        return css`
          background-color: transparent;
          color: ${({ theme }) => theme.colors.green900};
          border: none;

          &:hover {
            background-color: ${({ theme }) => theme.colors.yellow100};
            border: none;
          }
        `
      default:
        return ''
    }
  }}
`

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}
export const Button = ({
  children,
  variant = 'primary',
  startAdornment,
  endAdornment,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton type="button" variant={variant} onClick={onClick} {...props}>
      {startAdornment}
      {children}
      {endAdornment}
    </StyledButton>
  )
}
