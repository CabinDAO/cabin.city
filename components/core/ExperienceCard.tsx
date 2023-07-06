import {
  LocationType,
  OfferPrice,
  OfferType,
  ProfileRoleConstraint,
} from '@/generated/graphql'
import styled from 'styled-components'
import { Body1, Caption, H2, H4, Subline1 } from './Typography'
import Icon from './Icon'
import { OfferPriceUnitMap } from '@/utils/offer'
import { H6 } from '@/components/core/Typography'
import { centsToUSD, formatRange } from '@/utils/display-utils'
import events from '@/lib/googleAnalytics/events'
import { ImageFlex } from './gallery/ImageFlex'
import { OfferListItemProps } from './OfferListItem'
import Link from 'next/link'
import { HorizontalDivider } from './Divider'

const BANNER_IMAGE_WIDTH = 388
const BANNER_IMAGE_HEIGHT = 258

export interface ExperienceCardProps {
  className?: string
  variant?: ExperienceCardVariant
  _id: string
  offerType: OfferType | null | undefined
  locationType: LocationType
  title: string | null | undefined
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  imageUrl: string | null | undefined
  price: OfferPrice | null | undefined
  profileRoleConstraints?: ProfileRoleConstraint[] | null | undefined
  citizenshipRequired?: boolean | null | undefined
  minimunCabinBalance?: number | null | undefined
  location: {
    _id: string
    name: string | null | undefined
    publishedAt: Date | null | undefined
    shortAddress: string | null | undefined
    caretaker?:
      | {
          _id: string
        }
      | null
      | undefined
  }
  isLocked?: boolean
  actionsEnabled?: boolean
}

type ExperienceCardVariant = 'default' | 'no-icon'

export const ExperienceCard = (props: ExperienceCardProps) => {
  const {
    _id,
    offerType,
    title,
    imageUrl,
    location,
    citizenshipRequired,
    price,
  } = props
  const formattedLocation = `${location.name ?? '-'} · ${
    location.shortAddress ?? '-'
  }`

  const unit = price?.unit ? OfferPriceUnitMap[price.unit] : null

  return (
    <OuterContainer>
      <ContainerLink
        href={`/offer/${_id}`}
        shallow
        passHref
        onClick={() => events.viewExperiencesEvent(_id)}
      >
        <ImageContainer>
          {imageUrl ? (
            <ImageFlex
              sizes={`${BANNER_IMAGE_WIDTH}px`}
              quality={40}
              aspectRatio={BANNER_IMAGE_WIDTH / BANNER_IMAGE_HEIGHT}
              src={imageUrl}
              alt={title ?? ''}
            />
          ) : null}
          <DateRangeTag {...props} />
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <Caption emphasized>{offerType}</Caption>
            <NameH2>{title}</NameH2>
            <Caption>{formattedLocation}</Caption>
            {!citizenshipRequired && (
              <Eligibility>
                <H6>Eligibility |</H6>
                <Icon name="citizen" size={1.4} />
              </Eligibility>
            )}
          </SummaryContainer>
          {!!price?.unit && (
            <Price>
              <H4>${centsToUSD(price?.amountCents ?? 0)}</H4>
              {!!unit && <Body1>/ {unit}</Body1>}
            </Price>
          )}
        </ContentContainer>
        <HorizontalDivider />
      </ContainerLink>
    </OuterContainer>
  )
}

const DateRangeTag = (props: OfferListItemProps) => {
  const { startDate, endDate } = props

  return (
    <TagContainer>
      <Subline1>{formatRange(startDate, endDate)}</Subline1>
    </TagContainer>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  max-width: ${BANNER_IMAGE_WIDTH}px;
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const Eligibility = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  justify-content: flex-start;
  align-items: center;
`

const Price = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
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
    line-height: 1;
    margin: 0;
  }
`

const NameH2 = styled(H2)`
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.bp.md} {
    max-width: 80%;
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
