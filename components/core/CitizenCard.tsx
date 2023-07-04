import styled from 'styled-components'
import { ZoomInCard } from './ZoomInCard'
import { ImageFlex } from './gallery/ImageFlex'

export interface CitizenCardProps {
  hovered?: boolean
}

export const CitizenCard = ({ hovered }: CitizenCardProps) => {
  return (
    <ZoomInCard hovered={hovered}>
      <ContentContainer>
        <ImageFlex
          sizes="40rem"
          alt="Verified Citizen"
          aspectRatio={1}
          src="/images/citizenship-thumbnail.png"
        />
      </ContentContainer>
    </ZoomInCard>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 40rem;
  max-height: 40rem;

  ${({ theme }) => theme.bp.md} {
  }
`

export const CardBackdrop = styled.div<{ backgroundImagePath: string }>`
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  background: url(${(props) => props.backgroundImagePath}) no-repeat;
  background-size: cover;
`
