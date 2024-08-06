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
    font-size: 5rem;
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    font-size: 5.5rem;
    width: 80rem;
  }
`

import underline from '@/components/accelerator/green-underline.png'

export const GreenUnderline = styled.span`
  white-space: nowrap;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -15px;
    width: 100%;
    height: 20px;
    background-image: url(${underline.src});
    //background-size: contain;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    pointer-events: none;
  }
`
