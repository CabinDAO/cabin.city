import Image from 'next/image'
import styled from 'styled-components'
import { ZoomInCard } from './ZoomInCard'
import { ContentCard } from './ContentCard'
import Icon from './Icon'
import { Overline } from './Typography'

export interface CitizenCardProps {
  hovered?: boolean
}

export const CitizenCard = ({ hovered }: CitizenCardProps) => {
  return (
    <CardBackdrop backgroundImagePath="/images/citizen-bg.png">
      <ZoomInCard hovered={hovered}>
        <ContentCard shape="notch" notchSize={1.6} maxWidth="27.1">
          <ContentContainer>
            <InnerContainer>
              <Image
                src="/images/citizen.png"
                alt="Verified Citizen"
                width={239}
                height={329}
              />
              <VerifiedSection>
                <VerifiedText>Verified Cabin Citizen</VerifiedText>
                <VerifiedIconContainer>
                  <Icon name="check-star" size={1.6} color="green400" />
                </VerifiedIconContainer>
              </VerifiedSection>
            </InnerContainer>
          </ContentContainer>
        </ContentCard>
      </ZoomInCard>
    </CardBackdrop>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InnerContainer = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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

const VerifiedSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px ${({ theme }) => theme.colors.green900};
`

const VerifiedText = styled(Overline)`
  padding: 0.6rem;
`

const VerifiedIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.green900};
  padding: 0.8rem;
`
