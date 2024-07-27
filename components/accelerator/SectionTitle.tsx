import styled, { css } from 'styled-components'
import { fonts, H2 } from '@/components/core/Typography'
import theme from '@/styles/theme'

export const SectionTitle = styled(H2)<{ light?: boolean }>`
  font-family: ${fonts.inter};
  font-size: 4.4rem;
  text-align: center;
  ${({ light }) =>
    light &&
    css`
      color: ${theme.colors.yellow100};
    `}

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`
