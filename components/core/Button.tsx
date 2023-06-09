import theme from '@/styles/theme'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { buttonStyles } from './Typography'
import { MouseEventHandler } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'

interface StyledButtonProps {
  variant: ButtonVariant
  isActive?: boolean
  full: 'true' | 'false'
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
  user-select: none;
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
  ${({ full }) => full === 'true' && 'width: 100%;'}

  ${({ variant, isActive }) => {
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
          background-color: ${({ theme }) => theme.colors.yellow200};
          border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: none;
            border: solid 0.1rem ${({ theme }) => theme.colors.yellow900};
            margin-bottom: 0;
          }

          ${isActive &&
          css`
            background-color: ${({ theme }) => theme.colors.yellow100};
          `}
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

  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
      opacity: 0.6;
    `}
`

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: MouseEventHandler<HTMLButtonElement>
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  isActive?: boolean
  disabled?: boolean
  isFullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  isActive = false,
  isFullWidth,
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
        backgroundColor: theme.colors.yellow100,
      }
      tapAnimation = {
        backgroundColor: theme.colors.yellow100,
      }
      initial = {
        backgroundColor: isActive
          ? theme.colors.yellow100
          : theme.colors.yellow200,
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
        backgroundColor: 'transparent',
      }
      break
    default:
      break
  }

  return (
    <StyledButton
      full={isFullWidth ? 'true' : 'false'}
      key={variant + isActive}
      initial={initial}
      whileTap={{
        ...tapAnimation,
        transition: { duration: 0.1 },
      }}
      whileHover={{
        ...hoverAnimation,
        transition: { duration: 0.25 },
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
