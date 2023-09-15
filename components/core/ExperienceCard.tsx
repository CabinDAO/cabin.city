import {
  CitizenshipStatus,
  LocationType,
  OfferPrice,
  OfferType,
  ProfileRoleConstraint,
} from '@/generated/graphql'
import styled from 'styled-components'
import { Caption, H2, Subline1 } from './Typography'
import { offerInfoFromType } from '@/utils/offer'
import { H6 } from '@/components/core/Typography'
import { formatRange } from '@/utils/display-utils'
import events from '@/lib/googleAnalytics/events'
import { ImageFlex } from './gallery/ImageFlex'
import { OfferListItemProps } from './OfferListItem'
import { HorizontalDivider } from './Divider'
import { ProfileIcons } from './ProfileIcons'
import { roleInfoFromType } from '@/utils/roles'
import Link from 'next/link'
import { Price } from '@/components/offers/Price'

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
    profileRoleConstraints,
    minimunCabinBalance,
    price,
    endDate,
  } = props
  const formattedLocation = `${location.name ?? '-'} · ${
    location.shortAddress ?? '-'
  }`
  const roleInfos = Array.from(
    new Set(
      profileRoleConstraints?.map((c) => roleInfoFromType(c.profileRole)) ?? []
    )
  )

  const isDisplayingEligibility =
    !!profileRoleConstraints?.length ||
    citizenshipRequired ||
    minimunCabinBalance

  const offerInfo = offerType ? offerInfoFromType(offerType) : null
  const inactive = endDate && endDate < new Date()

  return (
    <OuterContainer inactive={!!inactive}>
      <ContainerLink
        href={`/experience/${_id}`}
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
            <Caption emphasized>{offerInfo?.name}</Caption>
            <NameH2>{title}</NameH2>
            <Caption>{formattedLocation}</Caption>
            {isDisplayingEligibility && (
              <EligibilityContainer>
                <H6>Eligibility |&nbsp;</H6>
                <ProfileIcons
                  citizenshipStatus={
                    citizenshipRequired ? CitizenshipStatus.Verified : null
                  }
                  roleInfos={roleInfos}
                  size={1.6}
                />
              </EligibilityContainer>
            )}
          </SummaryContainer>
          {price && price.amountCents > 0 && <Price price={price} />}
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

const EligibilityContainer = styled.div`
  display: flex;
  flex-flow: row;
  padding-bottom: 0.6rem;
`
