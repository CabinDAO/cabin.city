import styled from 'styled-components'
import { Caption, H4, truncateStyles } from '../Typography'
import { EMPTY } from '@/utils/display-utils'
import { ImageFlex } from '../gallery/ImageFlex'
import { useRouter } from 'next/router'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { ActivityListFragment } from '@/utils/types/activity'
import { ActiveBadge } from '@/components/core/ActiveBadge'
import { imageUrlForId } from '@/lib/cloudflareImages'

export const LocationPostItem = ({
  location,
  hideVerifiedTag,
}: {
  location: NonNullable<ActivityListFragment['metadata']['location']>
  hideVerifiedTag: boolean
}) => {
  const {
    name,
    bannerImageIpfsHash,
    bannerImageCfId,
    address,
    eventCount,
    externId,
  } = location

  const eventCountString = eventCount === 1 ? 'Event' : 'Events'
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`/location/${externId}`).then()
  }

  return (
    <OuterContainer>
      {!hideVerifiedTag && <ActiveBadge steward={location.steward} />}
      <Container onClick={handleOnClick}>
        <ImageContainer>
          {bannerImageCfId ? (
            <ImageFlex
              alt={name ?? 'Location'}
              src={imageUrlForId(bannerImageCfId)}
              width={9.6}
              sizes={`96px`}
            />
          ) : bannerImageIpfsHash ? (
            <ImageFlex
              alt={name ?? 'Location'}
              src={getImageUrlByIpfsHash(bannerImageIpfsHash) ?? ''}
              width={9.6}
              sizes={`96px`}
            />
          ) : null}
        </ImageContainer>
        <Data>
          <TruncatedH4>{name}</TruncatedH4>
          <AddressCaption>
            {`${address ?? EMPTY} · ${eventCount} ${eventCountString}`}
          </AddressCaption>
        </Data>
      </Container>
    </OuterContainer>
  )
}

const TruncatedH4 = styled(H4)`
  ${truncateStyles}
`

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
