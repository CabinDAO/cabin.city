import styled from 'styled-components'
import { Caption, H4, Subline1, truncateStyles } from '../Typography'
import { EMPTY } from '@/utils/display-utils'
import Icon from '../Icon'
import { ImageFlex } from '../gallery/ImageFlex'
import { useRouter } from 'next/router'
import { VERIFIED_VOTE_COUNT } from '@/components/neighborhoods/constants'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { ActivityListFragment } from '@/utils/types/activity'

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
    address,
    sleepCapacity,
    offerCount,
    tagline,
    voteCount,
    externId,
  } = location

  const offerCountString = offerCount === 1 ? 'Offer' : 'Offers'
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`/location/${externId}`).then()
  }

  return (
    <OuterContainer>
      {(voteCount ?? 0) >= VERIFIED_VOTE_COUNT && !hideVerifiedTag ? (
        <VerifiedContainer>
          <Icon name="logo-cabin" color="green400" size={1.6} />
          <Subline1 $color="green400">Verified</Subline1>
        </VerifiedContainer>
      ) : null}
      <Container onClick={handleOnClick}>
        <ImageContainer>
          {bannerImageIpfsHash ? (
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
