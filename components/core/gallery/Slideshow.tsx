import {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInterval } from 'react-use'
import styled from 'styled-components'
import { ColorName } from '@/styles/theme'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import analytics from '@/lib/googleAnalytics/analytics'

interface SlideshowProps {
  className?: string
  children: ReactElement | ReactElement[]
  loop?: boolean
  advanceAfter?: number
  forceShowControls?: boolean
  fadeColor?: ColorName
}

export const Slideshow = ({
  children,
  className,
  loop,
  advanceAfter,
  forceShowControls,
  fadeColor = 'black',
}: SlideshowProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const [numSlidesFullyVisible, setNumSlidesFullyVisible] = useState(0)
  const [slideSizes, setSlideSizes] = useState<DOMRect[]>([])
  const [currSlide, setCurrSlide] = useState(0)
  const [autoAdvanceStopped, setAutoAdvanceStopped] = useState(false)
  const firstSlideSize = slideSizes[0]
  const currSlideSize = slideSizes[currSlide]
  const currSlideOffset = (firstSlideSize?.x ?? 0) - (currSlideSize?.x ?? 0)
  const hasOffscreenSlide =
    currSlide < slideSizes.length - numSlidesFullyVisible
  const canNavigateNext = loop || hasOffscreenSlide
  const canNavigatePrevious = loop || currSlide > 0
  const showControls =
    forceShowControls || slideSizes.length > numSlidesFullyVisible

  const [viewportWidth, setViewportWidth] = useState(0)
  const pxVisibleFromNextSlide = hasOffscreenSlide
    ? Math.max(
        0,
        currSlideSize?.x +
          viewportWidth -
          slideSizes[currSlide + numSlidesFullyVisible].x
      ) // min() ensures non-negative to adjust for gaps between slides
    : 0
  const fadeRightEdge = viewportWidth > 0 && pxVisibleFromNextSlide > 0

  const gotoNextSlide = () => {
    let nextSlide = Math.min(
      slideSizes.length - numSlidesFullyVisible,
      currSlide + 1
    )
    if (loop && nextSlide == currSlide) {
      nextSlide = 0
    }
    setCurrSlide(nextSlide)
    setAutoAdvanceStopped(true)
  }

  const gotoPrevSlide = () => {
    let prevSlide = Math.max(0, currSlide - 1)
    if (loop && prevSlide == currSlide) {
      prevSlide = slideSizes.length - numSlidesFullyVisible
    }
    setCurrSlide(prevSlide)
    setAutoAdvanceStopped(true)
  }

  useInterval(
    gotoNextSlide,
    !autoAdvanceStopped && advanceAfter ? advanceAfter * 1000 : null
  )

  const onNextSlide = () => {
    analytics.roleCardsSlideshowEvent()
    gotoNextSlide()
  }

  const onPreviousSlide = () => {
    analytics.roleCardsSlideshowEvent()
    gotoPrevSlide()
  }

  const calculateSizes = useCallback(() => {
    if (!viewportRef.current || !slidesRef.current) {
      return
    }

    const viewportSize = viewportRef.current.getBoundingClientRect()
    setViewportWidth(viewportSize.width)
    const newSlideSizes = slidesRef.current.map(
      (slide) => slide?.getBoundingClientRect() ?? new DOMRect()
    )
    const newFirstSlideSize = newSlideSizes[0]

    let newSlidesVisible = Math.min(1, newSlideSizes.length - 1)
    while (
      newSlidesVisible < newSlideSizes.length &&
      newSlideSizes[newSlidesVisible].x +
        newSlideSizes[newSlidesVisible].width -
        newFirstSlideSize.x <=
        viewportSize.width
    ) {
      newSlidesVisible += 1
    }

    const slideSizeChanged =
      (firstSlideSize?.width ?? 0) != (newFirstSlideSize?.width ?? 0) ||
      (firstSlideSize?.height ?? 0) != (newFirstSlideSize?.height ?? 0)

    if (
      newSlidesVisible != numSlidesFullyVisible ||
      newSlideSizes.length != slideSizes.length ||
      slideSizeChanged
    ) {
      setCurrSlide(
        Math.max(Math.min(slideSizes.length - newSlidesVisible, currSlide), 0)
      )
      setSlideSizes(newSlideSizes)
      setNumSlidesFullyVisible(newSlidesVisible)
    }
  }, [currSlide, slideSizes, numSlidesFullyVisible, firstSlideSize])

  useEffect(() => {
    calculateSizes()
  }, [calculateSizes])

  useEffect(() => {
    const onResize = () => {
      calculateSizes()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [calculateSizes])

  return (
    <SlideshowContainer
      className={className}
      dir="ltr"
      aria-roledescription="slideshow"
    >
      <SlideshowViewport ref={viewportRef}>
        <RightEdgeFade visible={fadeRightEdge} color={fadeColor} />
        <SlideshowReel
          style={{ transform: `translateX(${currSlideOffset}px)` }}
        >
          {Children.map(children, (child, index) => (
            <Slide
              ref={(childRef) => {
                slidesRef.current[index] = childRef
              }}
              aria-roledescription="slide"
              key={index}
            >
              {child}
            </Slide>
          ))}
        </SlideshowReel>
      </SlideshowViewport>

      {showControls && (
        <SlideshowControls>
          <ControlButton
            variant="secondary"
            aria-label="Previous"
            onClick={onPreviousSlide}
            disabled={!canNavigatePrevious}
          >
            <Icon name="chevron-left" size={1.6} />
          </ControlButton>

          <ControlButton
            variant="secondary"
            aria-label="Next"
            onClick={onNextSlide}
            disabled={!canNavigateNext}
          >
            <Icon name="chevron-right" size={1.6} />
          </ControlButton>
        </SlideshowControls>
      )}
    </SlideshowContainer>
  )
}

const SlideshowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 4rem;
  position: relative;
  overflow: hidden;
`

const RightEdgeFade = styled.div<{ visible: boolean; color: ColorName }>`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity ease-out 500ms;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 94%,
    // hex opacity codes: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    ${({ theme, color }) => theme.colors[color]}BF 98%,
    ${({ theme, color }) => theme.colors[color]}CC 100%
  );
`

const SlideshowViewport = styled.div`
  overflow: visible;
  position: relative;
`

const Slide = styled.div`
  width: min-content;
`

const SlideshowReel = styled.div`
  display: flex;
  flex-flow: row;
  gap: 2rem;
  transition: transform ease-out 500ms;
`

const SlideshowControls = styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: row;
  gap: 0.8rem;
  justify-content: center;
`

const ControlButton = styled(Button)`
  padding: 0rem;
  width: 4.8rem;
  height: 4.8rem;
`
