import styled from 'styled-components'
import React, { HTMLAttributes } from 'react'
import { LandingSectionVariant } from '@/components/landing/styles'
import { fonts } from '@/components/core/Typography'
import { TextContent } from '@/components/landing/TextSection'
import theme, { padding } from '@/styles/theme'

export const LandingSection = (props: ContainerProps) => {
  return (
    <Background
      className={props.noVertPadding ? 'noVertPadding' : undefined}
      {...props}
    >
      {props.children}
    </Background>
  )
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
  noVertPadding?: boolean
  precedesNoVertPadding?: boolean
}

const Background = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ variant }) => themeColor('bg', variant)};
  width: 100%;
  gap: 2.4rem;

  ${({ noVertPadding, precedesNoVertPadding }) =>
    padding(
      noVertPadding ? 'none' : 'xl_half',
      'none',
      precedesNoVertPadding ? 'xl' : noVertPadding ? 'none' : 'xl_half'
    )};

  &.noVertPadding + &:not(.noVertPadding) {
    ${padding.top('xl')};
  }

  ${TextContent} {
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
    case 'dark':
      return fgBg == 'fg' ? theme.colors.yellow100 : theme.colors.green800
    case 'orange':
      return fgBg == 'fg' ? theme.colors.green900 : theme.colors.yellow400
    case 'light':
      return fgBg == 'fg' ? theme.colors.green900 : theme.colors.yellow100
    case 'clear':
      return fgBg == 'fg' ? theme.colors.yellow100 : 'transparent'
    default:
      return fgBg == 'fg' ? theme.colors.green800 : theme.colors.yellow200
  }
}
