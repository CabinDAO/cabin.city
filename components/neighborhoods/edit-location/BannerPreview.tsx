import { Subline1 } from '@/components/core/Typography'
import styled from 'styled-components'
import { BannerPreviewContainer, DesktopBanner, MobileBanner } from '../styles'

interface BannerPreviewProps {
  imageUrl: string
}

export const BannerPreview = ({ imageUrl }: BannerPreviewProps) => {
  return (
    <BannerPreviewContainer>
      <Preview>
        <Subline1>Desktop preview</Subline1>
        <DesktopBanner imageUrl={imageUrl} />
      </Preview>
      <Preview>
        <Subline1>Mobile preview</Subline1>
        <MobileBanner imageUrl={imageUrl} />
      </Preview>
    </BannerPreviewContainer>
  )
}

const Preview = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.7rem;
`
