import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import { fonts, H2 } from '@/components/core/Typography'

export const LandingSectionTitle = styled(H2)<{ light?: boolean }>`
  font-family: ${fonts.inter};
  font-size: 3.2rem;
  ${({ light }) =>
    light &&
    css`
      color: ${theme.colors.yellow100};
    `}
`
