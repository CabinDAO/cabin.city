import styled from 'styled-components'
import {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import events from '@/lib/googleAnalytics/events'

interface SlideshowProps {
  className?: string
  children: ReactElement | ReactElement[]
}

export const Slideshow = ({ children, className }: SlideshowProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const [slidesVisible, setSlidesVisible] = useState(0)
  const [slideSizes, setSlideSizes] = useState<DOMRect[]>([])
  const [startingSlide, setStartingSlide] = useState(0)
  const firstSlideSize = slideSizes[0]
  const startingSlideSize = slideSizes[startingSlide]
  const startingSlideOffset =
    (firstSlideSize?.x ?? 0) - (startingSlideSize?.x ?? 0)
  const canNavigateNext = startingSlide < slideSizes.length - slidesVisible
  const canNavigatePrevious = startingSlide > 0

  const onNextSlide = () => {
    events.roleCardsSlideshowEvent()
    setStartingSlide(
      Math.min(slideSizes.length - slidesVisible, startingSlide + 1)
    )
  }

  const onPreviousSlide = () => {
    events.roleCardsSlideshowEvent()
    setStartingSlide(Math.max(0, startingSlide - 1))
  }

  const calculateSizes = useCallback(() => {
    if (viewportRef.current && slidesRef.current) {
      const viewportSize = viewportRef.current.getBoundingClientRect()
      const _slideSizes = slidesRef.current.map(
        (slide) => slide?.getBoundingClientRect() ?? new DOMRect()
      )
      const firstSlide = _slideSizes[0]
      let _slidesVisible = Math.min(1, _slideSizes.length - 1)

      while (
        _slidesVisible < _slideSizes.length &&
        _slideSizes[_slidesVisible].x +
          _slideSizes[_slidesVisible].width -
          firstSlide.x <=
          viewportSize.width
      ) {
        _slidesVisible += 1
      }

      if (
        _slidesVisible != slidesVisible ||
        _slideSizes.length != slideSizes.length
      ) {
        setStartingSlide(
          Math.max(
            Math.min(slideSizes.length - _slidesVisible, startingSlide),
            0
          )
        )
        setSlideSizes(_slideSizes)
        setSlidesVisible(_slidesVisible)
      }
    }
  }, [startingSlide, slideSizes, slidesVisible])

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
        <SlideshowReel
          style={{ transform: `translateX(${startingSlideOffset}px)` }}
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

      <SlideshowControls>
        <ControlButton
          variant="secondary"
          aria-label="Previous Slide"
          onClick={onPreviousSlide}
          disabled={!canNavigatePrevious}
        >
          <Icon name="chevron-left" size={1.6} />
        </ControlButton>

        <ControlButton
          variant="secondary"
          aria-label="Next Slide"
          onClick={onNextSlide}
          disabled={!canNavigateNext}
        >
          <Icon name="chevron-right" size={1.6} />
        </ControlButton>
      </SlideshowControls>
    </SlideshowContainer>
  )
}

const SlideshowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 4rem;
  position: relative;

  ${({ theme }) => theme.bp.lg} {
    overflow: hidden;
  }
`

const SlideshowViewport = styled.div`
  overflow: visible;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 18rem;
    display: none;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.green800}00 0%,
      ${({ theme }) => theme.colors.green800} 100%
    );

    ${({ theme }) => theme.bp.lg} {
      display: block;
    }
  }
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
  justify-content: start;

  ${({ theme }) => theme.bp.lg} {
    justify-content: center;
  }
`

const ControlButton = styled(Button)`
  padding: 0rem;
  width: 4.8rem;
  height: 4.8rem;
`
