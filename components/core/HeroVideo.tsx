import styled from 'styled-components'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

const DESKTOP_WIDTH_PX = 1440
const DESKTOP_HEIGHT_PX = 730

export const HeroVideo = () => {
  const { deviceSize } = useDeviceSize()
  const heroAspectRatio =
    deviceSize === 'mobile' ? 1 : DESKTOP_WIDTH_PX / DESKTOP_HEIGHT_PX

  return (
    <VideoContainer aspectRatio={heroAspectRatio}>
      <video autoPlay muted loop playsInline>
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </VideoContainer>
  )
}

interface VideoContainerProps {
  aspectRatio: number
}

const VideoContainer = styled.div<VideoContainerProps>`
  position: relative;
  width: 100%;

  video {
    width: 100%;
    height: auto;
  }
`
