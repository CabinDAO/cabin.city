import styled from 'styled-components'
import Image from 'next/image'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

export const BannerHeader = ({
  imageUrl,
  reduceTopPad,
}: {
  imageUrl: string
  reduceTopPad?: number
}) => {
  const { deviceSize } = useDeviceSize()
  const width = deviceSize === 'desktop' ? 998 : 610
  const height = deviceSize === 'desktop' ? 420 : 256

  return (
    <BannerContainer>
      <ImageContainer>
        <Banner
          priority
          src={imageUrl}
          alt="Location Banner"
          width={width}
          height={height}
        />
      </ImageContainer>
      <Spacer reduceTopPad={reduceTopPad ?? 0} />
    </BannerContainer>
  )
}
const BannerContainer = styled.div``

const Spacer = styled.div<{
  reduceTopPad: number
}>`
  height: ${({ reduceTopPad }) => 20 - reduceTopPad}rem;

  ${({ theme }) => theme.bp.lg} {
    height: ${({ reduceTopPad }) => 32 - reduceTopPad}rem;
  }
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    top: -2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: calc(84rem + 2 * 8rem);
    top: 0;
  }
`
const Banner = styled(Image)`
  object-fit: cover;
  object-position: center;
  width: 100vw;
  height: 28rem;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 100%;
    height: 42rem;
  }
`
