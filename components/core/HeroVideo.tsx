import styled from 'styled-components'
import { useDeviceSize } from '../hooks/useDeviceSize'

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
  height: 0;
  width: 100vw;
  padding-top: 100%;

  ${({ theme }) => theme.bp.md} {
    overflow: hidden;
    padding-top: 0;
    height: ${({ aspectRatio }) => `calc(100vw / ${aspectRatio})`};
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${({ theme }) => theme.bp.md} {
      object-fit: initial;
      height: auto;
      position: inherit;
      margin-top: -10%;
    }
  }
`
