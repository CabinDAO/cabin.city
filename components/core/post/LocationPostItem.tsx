import styled from 'styled-components'
import { LocationCardProps } from '../LocationCard'
import { Caption, H4, Subline1, truncateStyles } from '../Typography'
import { EMPTY } from '@/utils/display-utils'
import Icon from '../Icon'
import { LocationType } from '@/generated/graphql'
import { ImageFlex } from '../gallery/ImageFlex'
import { useRouter } from 'next/router'

export const LocationPostItem = ({
  name,
  bannerImageUrl,
  address,
  sleepCapacity,
  offerCount,
  tagline,
  locationType,
  _id,
  hideNeighborTag,
}: LocationCardProps) => {
  const offerCountString = offerCount === 1 ? 'Offer' : 'Offers'
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`/location/${_id}`)
  }

  return (
    <OuterContainer>
      {locationType === LocationType.Neighborhood && !hideNeighborTag ? (
        <VerifiedContainer>
          <Icon name="neighborhood" color="green400" size={1.6} />
          <Subline1 $color="green400">Verified Neighborhood</Subline1>
        </VerifiedContainer>
      ) : null}
      <Container onClick={handleOnClick}>
        <ImageContainer>
          {bannerImageUrl ? (
            <ImageFlex
              alt={name ?? 'Location'}
              src={bannerImageUrl}
              width={9.6}
              sizes={`96px`}
            />
          ) : null}
        </ImageContainer>
        <Data>
          <TruncatedH4>{name}</TruncatedH4>
          <AddressCaption>{`${address ?? EMPTY} · Sleeps ${
            sleepCapacity ?? EMPTY
          } · ${offerCount} ${offerCountString}`}</AddressCaption>

          <TruncateCaption>{tagline}</TruncateCaption>
        </Data>
      </Container>
    </OuterContainer>
  )
}

const TruncateCaption = styled(Caption)`
  ${truncateStyles}
`

const TruncatedH4 = styled(H4)`
  ${truncateStyles}
`

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const VerifiedContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.95rem;
  padding: 0.8rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.green900};
  border: solid 0.1rem ${({ theme }) => theme.colors.green900};
  border-radius: 0.8rem 0 0 0;

  ${({ theme }) => theme.bp.md} {
    width: max-content;
  }
`

const Container = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.8rem;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.colors.yellow200};
  border: solid 0.1rem ${({ theme }) => theme.colors.green900}1A; // 10% opacity
  padding-bottom: 1.9rem;
  width: 100%;
  flex: 1;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.8rem;
  }
`

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${({ theme }) => theme.colors.yellow300};
`

const Data = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
  width: 100%;
`

const AddressCaption = styled(Caption)`
  opacity: 0.75;
  line-height: 1.5;
  overflow: hidden;
`
