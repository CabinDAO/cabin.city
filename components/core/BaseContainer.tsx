import React, { HTMLAttributes } from 'react'
import { useWindowSize } from 'react-use'
import { DeviceSize, useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled from 'styled-components'
import { LEFT_NAV_MARGIN, NAV_WIDTH_REM } from '@/components/nav/Navbar'

type widthType =
  | 'full' // totally full screen with no padding at all
  | 'wide' // almost full screen with minimal padding (also compensates for nav width)
  | 'default' // basic width that works well

interface BaseContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth: widthType | number
  children?: React.ReactNode
}

const navGap = 2.4

const margins: Record<DeviceSize, { right: number; left: number }> = {
  mobile: {
    left: 1.6,
    right: 1.6,
  },
  tablet: {
    left: LEFT_NAV_MARGIN + NAV_WIDTH_REM + navGap,
    right: 2.4,
  },
  desktop: {
    left: LEFT_NAV_MARGIN + NAV_WIDTH_REM + navGap,
    right: 4,
  },
}

export const BaseContainer = ({
  maxWidth,
  children,
  ...props
}: BaseContainerProps) => {
  const { deviceSize } = useDeviceSize()
  const { width: screenWidthPx } = useWindowSize()
  // const scrollbarWidth = useScrollbarWidth()

  const screenWidth = screenWidthPx / 10 // convert to rem

  if (maxWidth === 'full') {
    return (
      <Container calculatedWidth="100%" {...props}>
        {children}
      </Container>
    )
  }

  const leftMargin = margins[deviceSize].left
  const rightMargin = margins[deviceSize].right

  const maxContentWidth =
    maxWidth === 'wide' ? screenWidth : maxWidth === 'default' ? 84 : maxWidth

  // when screen is big enough that content is at max width
  const maxContentScreenSize = maxContentWidth + leftMargin + rightMargin

  // when we have enough room on both sides to center the content
  const minCenteredScreenWidth = maxContentWidth + 2 * leftMargin

  const marginLeft =
    screenWidth >= minCenteredScreenWidth
      ? 'auto'
      : `${leftMargin.toFixed(1)}rem`
  const marginRight =
    screenWidth >= minCenteredScreenWidth
      ? 'auto'
      : screenWidth >= maxContentScreenSize
      ? `${(screenWidth - maxContentWidth - leftMargin).toFixed(1)}rem`
      : `${rightMargin.toFixed(1)}rem`
  const calcWidth =
    screenWidth >= minCenteredScreenWidth
      ? `${maxContentWidth}rem`
      : `calc(100% - ${marginLeft} - ${marginRight})`

  return (
    <ScrollPadFix>
      <Container
        calculatedWidth={calcWidth}
        marginLeft={marginLeft}
        marginRight={marginRight}
        {...props}
      >
        {children}
      </Container>
    </ScrollPadFix>
  )
}

const Container = styled.div<{
  calculatedWidth: string
  marginLeft?: string
  marginRight?: string
}>`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: ${({ calculatedWidth }) => calculatedWidth};
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`}
`

const ScrollPadFix = styled.div`
  width: 100%;
  padding-left: calc(100vw - 100%);
`
