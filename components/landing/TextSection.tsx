import { LandingSectionVariant } from '@/components/landing/styles'
import { body1Styles } from '@/components/core/Typography'
import styled from 'styled-components'
import { HTMLAttributes } from 'react'

interface TextSectionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
  children?: React.ReactNode
}

export const TextSection = ({ children, variant }: TextSectionProps) => {
  return <TextContent variant={variant}>{children}</TextContent>
}

interface SectionDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
}

export const TextContent = styled.div<SectionDescriptionProps>`
  ${body1Styles}

  opacity: 0.75;
  text-align: center;
  line-height: 150%;

  color: ${({ theme, variant }) =>
    variant === 'dark' ? theme.colors.yellow100 : theme.colors.green800};

  ${({ theme }) => theme.bp.md} {
    width: 56rem;
  }
`
