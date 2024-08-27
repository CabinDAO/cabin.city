import styled from 'styled-components'
import theme from '@/styles/theme'
import { fonts, H2 } from '@/components/core/Typography'

export const LandingSectionTitle = styled(H2)<{ light?: boolean }>`
  font-family: ${fonts.poppins};
  font-size: 3.2rem;
  color: ${({ light }) =>
    light ? theme.colors.yellow100 : theme.colors.green900};
`
