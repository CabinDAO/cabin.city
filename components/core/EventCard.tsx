import Link from 'next/link'
import { OfferFragment } from '@/utils/types/offer'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { offerInfoFromType } from '@/utils/offer'
import { formatRange } from '@/utils/display-utils'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { Caption, H2, Subline1 } from './Typography'
import { Price } from '@/components/offers/Price'
import { ImageFlex } from './gallery/ImageFlex'
import { HorizontalDivider } from './Divider'

const BANNER_IMAGE_WIDTH = 388
const BANNER_IMAGE_HEIGHT = 258

interface EventCardProps {
  className?: string
  variant?: 'default' | 'no-icon'
  offer: OfferFragment
  isLocked?: boolean
  actionsEnabled?: boolean
}

export const EventCard = (props: EventCardProps) => {
  const offer = props.offer
  const formattedLocation = `${offer.location.name ?? '-'} · ${
    offer.location.address ?? '-'
  }`

  const offerInfo = offer.type ? offerInfoFromType(offer.type) : null
  const inactive = offer.endDate && new Date(offer.endDate) < new Date()

  const imageHash = offer.imageIpfsHash || offer.location.bannerImageIpfsHash

  return (
    <OuterContainer inactive={!!inactive}>
      <ContainerLink
        href={`/event/${offer.externId}`}
        onClick={() => analytics.viewEventsEvent(offer.externId)}
      >
        <ImageContainer>
          {imageHash ? (
            <ImageFlex
              sizes={`${BANNER_IMAGE_WIDTH}px`}
              quality={40}
              aspectRatio={BANNER_IMAGE_WIDTH / BANNER_IMAGE_HEIGHT}
              src={getImageUrlByIpfsHash(imageHash) ?? ''}
              alt={offer.title ?? ''}
            />
          ) : null}
          <DateRangeTag startDate={offer.startDate} endDate={offer.endDate} />
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <Caption emphasized>{offerInfo?.name}</Caption>
            <NameH2>{offer.title}</NameH2>
            <Caption>{formattedLocation}</Caption>
          </SummaryContainer>
          {offer.price && offer.price > 0 && (
            <Price price={offer.price} priceInterval={offer.priceInterval} />
          )}
        </ContentContainer>
        <HorizontalDivider />
      </ContainerLink>
    </OuterContainer>
  )
}

const DateRangeTag = ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) => {
  return (
    <TagContainer>
      <Subline1>{formatRange(new Date(startDate), new Date(endDate))}</Subline1>
    </TagContainer>
  )
}

const OuterContainer = styled.div<{ inactive: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  max-width: ${BANNER_IMAGE_WIDTH}px;
  ${({ inactive }) => inactive && `opacity: 0.5;`}
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  ${({ theme }) => theme.bp.md} {
    max-width: ${BANNER_IMAGE_WIDTH}px;
  }
  img {
    object-fit: cover;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.6rem;
  width: 100%;
`

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  gap: 0.8rem;

  ${H2} {
    line-height: 1.2;
    margin: 0;
  }
`

const NameH2 = styled(H2)`
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.bp.md} {
    max-width: 90%;
  }
`

const TagContainer = styled.div`
  position: absolute;
  bottom: 0.9rem;
  left: 0.9rem;
  background-color: ${({ theme }) => theme.colors.yellow100};
  padding: 0.7rem 1.2rem;
  border-radius: 0.4rem;
  width: max-content;
`
