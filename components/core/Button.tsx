import theme from '@/styles/theme'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { buttonStyles } from './Typography'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'

interface StyledButtonProps {
  variant: ButtonVariant
}

const buildBoxShadow = ({
  top = 0.2,
  right = 0.2,
  bottom = 0.2,
  left = 0.2,
}: BoxShadow) => {
  return `inset 0 ${top}rem 0 0 ${theme.colors.green900},
  inset 0 -${bottom}rem 0 0 ${theme.colors.green900},
  inset -${right}rem 0 0 0 ${theme.colors.green900},
  inset ${left}rem 0 0 0 ${theme.colors.green900}`
}

const StyledButton = styled(motion.button)<StyledButtonProps>`
  ${buttonStyles}
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  outline: 0;
  border: none;
  padding: 1.5rem 2.4rem;
  white-space: nowrap;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          box-shadow: ${buildBoxShadow({
            top: 0.1,
            right: 0.4,
            bottom: 0.4,
            left: 0.1,
          })};
          background-color: ${({ theme }) => theme.colors.green400};
          color: ${({ theme }) => theme.colors.green900};
        `
      case 'secondary':
        return css`
          box-shadow: ${buildBoxShadow({
            top: 0.1,
            right: 0.4,
            bottom: 0.4,
            left: 0.1,
          })};
          background-color: ${({ theme }) => theme.colors.yellow100};
          color: ${({ theme }) => theme.colors.green900};
        `
      case 'tertiary':
        return css`
          color: ${({ theme }) => theme.colors.green900};
          box-shadow: none;
          border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: none;
            border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
            margin-bottom: 0;
          }
        `
      case 'link':
        return css`
          color: ${({ theme }) => theme.colors.green900};
          box-shadow: none;
          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: none;
            border: none;
          }
        `
      default:
        return ''
    }
  }};
`

interface ButtonProps {
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
  let hoverAnimation = {}
  let tapAnimation = {}
  let initial = {}

  switch (variant) {
    case 'primary':
    case 'secondary':
      hoverAnimation = {
        boxShadow: buildBoxShadow({}),
      }
      tapAnimation = {
        boxShadow: buildBoxShadow({
          top: 0.4,
          right: 0.1,
          bottom: 0.1,
          left: 0.4,
        }),
      }
      initial = {
        boxShadow: buildBoxShadow({
          top: 0.1,
          right: 0.4,
          bottom: 0.4,
          left: 0.1,
        }),
      }
      break
    case 'tertiary':
      hoverAnimation = {
        backgroundColor: theme.colors.yellow200,
      }
      tapAnimation = {
        backgroundColor: theme.colors.yellow100,
      }
      initial = {
        backgroundColor: theme.colors.yellow100,
      }
      break
    case 'link':
      hoverAnimation = {
        backgroundColor: theme.colors.yellow200,
      }
      tapAnimation = {
        backgroundColor: theme.colors.yellow100,
      }
      initial = {
        backgroundColor: theme.colors.yellow200,
      }
      break
    default:
      break
  }

  return (
    <StyledButton
      key={variant}
      initial={initial}
      whileTap={{
        ...tapAnimation,
        transition: { duration: 0.2 },
      }}
      whileHover={{
        ...hoverAnimation,
        transition: { duration: 0.2 },
      }}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {startAdornment}
      {children}
      {endAdornment}
    </StyledButton>
  )
}

interface BoxShadow {
  top?: number
  right?: number
  bottom?: number
  left?: number
}
