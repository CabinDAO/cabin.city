import styled, { css } from 'styled-components'
import { HTMLAttributes } from 'react'
import { LandingSectionVariant } from '@/components/landing/styles'
import { H1, fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'
import theme from '@/styles/theme'
import Icon, { IconName } from '@/components/core/Icon'

interface LandingSectionProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconName
  title?: string
  children?: React.ReactNode
  variant?: LandingSectionVariant
  noTopPadding?: boolean
  noBottomPadding?: boolean
  fullWidth?: boolean
}

export const LandingSection = ({
  icon,
  title,
  children,
  variant,
  noTopPadding,
  noBottomPadding,
  fullWidth,
}: LandingSectionProps) => {
  return (
    <Container
      variant={variant}
      noTopPadding={noTopPadding}
      noBottomPadding={noBottomPadding}
      fullWidth={fullWidth}
    >
      {icon && <Icon name={icon} size={8} />}
      {title && <H1 emphasized>{title}</H1>}
      {children}
    </Container>
  )
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
  noTopPadding?: boolean
  noBottomPadding?: boolean
  fullWidth?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ variant }) => themeColor('bg', variant)};
  width: 100%;
  gap: 2.4rem;

  ${({ noTopPadding }) =>
    !noTopPadding &&
    css`
      padding-top: 4rem;
    `}};

  ${({ noBottomPadding }) =>
    !noBottomPadding &&
    css`
      padding-bottom: 4rem;
    `}};

  ${({ fullWidth }) =>
    !fullWidth &&
    css`
      padding-left: 4rem;
      padding-right: 4rem;
    `}};


  ${H1}, ${TextContent} {
    font-family: ${fonts.poppins};
    text-align: center;
    color: ${({ variant }) => themeColor('fg', variant)};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 2.4rem;
  }
`

const themeColor = (
  fgBg: 'fg' | 'bg',
  variant: LandingSectionVariant | undefined
): string => {
  switch (variant) {
    case 'light':
      return fgBg == 'fg' ? theme.colors.green900 : theme.colors.yellow100
    case 'dark':
      return fgBg == 'fg' ? theme.colors.yellow100 : theme.colors.green800
    default:
      return fgBg == 'fg' ? theme.colors.green800 : theme.colors.yellow200
  }
}
