import styled from 'styled-components'
import React, { HTMLAttributes } from 'react'
import { LandingSectionVariant } from '@/components/landing/styles'
import { H1, fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'
import theme, { padding } from '@/styles/theme'
import Icon, { IconName } from '@/components/core/Icon'

interface LandingSectionProps extends ContainerProps {
  icon?: IconName
  title?: string
  children?: React.ReactNode
}

export const LandingSection = (props: LandingSectionProps) => {
  return (
    <Container
      className={props.noVertPadding ? 'noVertPadding' : undefined}
      {...props}
    >
      {props.icon && <Icon name={props.icon} size={8} />}
      {props.title && <H1 emphasized>{props.title}</H1>}
      {props.children}
    </Container>
  )
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
  noVertPadding?: boolean
  precedesNoVertPadding?: boolean
  fullWidth?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ variant }) => themeColor('bg', variant)};
  width: 100%;
  gap: 2.4rem;

  ${({ noVertPadding, precedesNoVertPadding, fullWidth }) =>
    padding(
      noVertPadding ? 'none' : 'xl_half',
      fullWidth ? 'none' : 'lg',
      precedesNoVertPadding ? 'xl' : noVertPadding ? 'none' : 'xl_half'
    )};

  &.noVertPadding + & {
    ${padding.top('xl')};
  }

  ${H1}, ${TextContent} {
    font-family: ${fonts.poppins};
    text-align: center;
    color: ${({ variant }) => themeColor('fg', variant)};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
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
