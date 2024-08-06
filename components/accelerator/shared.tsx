import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { acceleratorApplyClickEvent } from '@/lib/googleAnalytics/analytics'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { fonts, H2 } from '@/components/core/Typography'
import underline from '@/components/accelerator/green-underline.png'

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

export const ApplyButton = ({
  source,
  style,
}: {
  source: string
  style?: React.CSSProperties
}) => {
  return (
    <Link
      href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
      onClick={() => acceleratorApplyClickEvent(source)}
      target="_blank"
      rel="noopener"
    >
      <Button
        variant={'primary'}
        style={{
          ...{ width: 'min-content' },
          ...style,
        }}
        endAdornment={<Icon name={'right-arrow'} size={2} />}
      >
        Apply
      </Button>
    </Link>
  )
}
