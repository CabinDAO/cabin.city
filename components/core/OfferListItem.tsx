import Image from 'next/image'
import {
  LocationType,
  OfferPrice,
  OfferType,
  ProfileRoleConstraint,
} from '@/generated/graphql'
import { MeFragment } from '@/utils/types/profile'
import styled from 'styled-components'
import { Caption, H4 } from './Typography'
import Icon from './Icon'
import { ListItem } from './ListItem'
import { Button } from './Button'
import { useRouter } from 'next/router'
import { formatRange } from '@/utils/display-utils'
import events from '@/lib/googleAnalytics/events'
import React from 'react'
import { OfferFragment } from '@/utils/types/offer'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { formatShortAddress } from '@/lib/address'

export interface OfferListItemProps {
  className?: string
  variant?: OfferListItemVariant
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

type OfferListItemVariant = 'default' | 'no-icon'

export const OfferListItem = (props: {
  offer: OfferFragment
  me: MeFragment | null | undefined
  className?: string
  variant?: OfferListItemVariant
  actionsEnabled?: boolean
}) => {
  const router = useRouter()
  const { offer, me, className, variant, actionsEnabled } = props

  const imageUrl = getImageUrlByIpfsHash(
    offer.imageIpfsHash ?? offer.location.bannerImageIpfsHash,
    true
  )
  const isLocked = !me

  const dateRange =
    offer.startDate && offer.endDate
      ? formatRange(new Date(offer.startDate), new Date(offer.endDate))
      : 'Flexible dates'
  const formattedLocation = `${offer.location.name ?? '-'} · ${
    formatShortAddress(offer.location.address) ?? '-'
  }`
  const isDisplayingIcon = variant !== 'no-icon'
  const inactive = offer.endDate && offer.endDate < new Date().toISOString()

  const handleOnEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/experience/${offer.externId}/edit`)
  }

  return (
    <ListItem
      authenticated
      href={
        actionsEnabled
          ? `/experience/${offer.externId}/edit`
          : `/experience/${offer.externId}`
      }
      onClick={() => events.viewExperiencesEvent(offer.externId)}
    >
      <InnerContainer>
        <OfferInfoContainer active={!inactive} className={className}>
          {isDisplayingIcon && (
            <ImageContainer>
              {imageUrl ? (
                <StyledImage
                  src={imageUrl}
                  alt={offer.title ?? 'Offer'}
                  width={64}
                  height={64}
                />
              ) : (
                <EmptyImageContainer>
                  <Icon name="offer" size={3.2} color="yellow500" />
                </EmptyImageContainer>
              )}
            </ImageContainer>
          )}

          <ContentContainer>
            <OfferDetails>
              <Caption emphasized>{dateRange ?? ''}</Caption>
              <TitleContainer>
                <H4>{offer.title}</H4>
                {isLocked && <Icon name="lock" size={1.2} />}
              </TitleContainer>
              <Caption>{formattedLocation}</Caption>
            </OfferDetails>
          </ContentContainer>
        </OfferInfoContainer>
        <RightContent>
          {inactive && (
            <InactiveLabel>
              <Caption $color="red700" emphasized>
                Inactive
              </Caption>
            </InactiveLabel>
          )}
          {actionsEnabled && (
            <EditButton variant="secondary" onClick={handleOnEdit}>
              <Icon name="pencil" size={1.6} />
            </EditButton>
          )}
        </RightContent>
      </InnerContainer>
    </ListItem>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.6rem;
`

const InnerContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const InactiveLabel = styled.div`
  padding: 0.8rem;
  color: ${({ theme }) => theme.colors.red700};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${({ theme }) => theme.colors.red600};
  border-radius: 2px;
`

const OfferInfoContainer = styled.div<{ active: boolean }>`
  display: flex;
  gap: 1.6rem;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`

const EditButton = styled(Button)`
  height: 4.8rem;
  width: 4.8rem;
  padding: 0;
`

const RightContent = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
`

const EmptyImageContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  clip-path: circle(50%);
`

const ImageContainer = styled.div`
  position: relative;
  width: 6.4rem;
  height: 6.4rem;

  img {
    object-fit: cover;
  }
`

const StyledImage = styled(Image)`
  display: block;
  border-radius: 50%;
  border: solid 1px black;
`

const OfferDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const TagContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.green900};
  border-radius: 50%;
  border: solid 0.75px ${({ theme }) => theme.colors.yellow200};
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
