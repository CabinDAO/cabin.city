import React from 'react'
import styled, { css } from 'styled-components'

type Variant = 'radial' | 'right'
interface CabinGradientCardProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export const CabinGradientCard = ({
  children,
  className,
  variant = 'radial',
}: CabinGradientCardProps) => {
  return (
    <Container className={className} variant={variant}>
      {children}
    </Container>
  )
}

const Container = styled.div<{ variant: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  background-repeat: no-repeat;
  background-size: cover;

  ${({ variant }) => {
    switch (variant) {
      case 'radial':
        return css`
          background-image: radial-gradient(
              circle at 50% 50%,
              ${({ theme }) => theme.colors.yellow200} 30%,
              #deae6a0d 100%
            ),
            url('/images/background.svg');
        `
      case 'right':
        return css`
          background-image: linear-gradient(
              90deg,
              ${({ theme }) => theme.colors.yellow200} 30%,
              #deae6a0d 100%
            ),
            url('/images/background.svg'), url('/images/background.svg');
        `
      default:
        break
    }
  }}
`
