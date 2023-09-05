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
  loop?: boolean
}

export const Slideshow = ({ children, className, loop }: SlideshowProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const [slidesVisible, setSlidesVisible] = useState(0)
  const [slideSizes, setSlideSizes] = useState<DOMRect[]>([])
  const [currSlide, setCurrSlide] = useState(0)
  const firstSlideSize = slideSizes[0]
  const currSlideSize = slideSizes[currSlide]
  const currSlideOffset = (firstSlideSize?.x ?? 0) - (currSlideSize?.x ?? 0)
  const canNavigateNext = loop || currSlide < slideSizes.length - slidesVisible
  const canNavigatePrevious = loop || currSlide > 0

  const onNextSlide = () => {
    events.roleCardsSlideshowEvent()
    let nextSlide = Math.min(slideSizes.length - slidesVisible, currSlide + 1)
    if (loop && nextSlide == currSlide) {
      nextSlide = 0
    }
    setCurrSlide(nextSlide)
  }

  const onPreviousSlide = () => {
    events.roleCardsSlideshowEvent()
    let prevSlide = Math.max(0, currSlide - 1)
    if (loop && prevSlide == currSlide) {
      prevSlide = slideSizes.length - slidesVisible
    }
    setCurrSlide(prevSlide)
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
        setCurrSlide(
          Math.max(Math.min(slideSizes.length - _slidesVisible, currSlide), 0)
        )
        setSlideSizes(_slideSizes)
        setSlidesVisible(_slidesVisible)
      }
    }
  }, [currSlide, slideSizes, slidesVisible])

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
