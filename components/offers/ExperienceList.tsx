import styled from 'styled-components'
import { OfferItemFragment } from '@/generated/graphql'
import { Button } from '@/components/core/Button'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import { formatShortAddress } from '@/lib/address'
import Image from 'next/image'
import { padding } from '@/styles/theme'
import { stringToSlateValue } from '@/components/core/slate/slate-utils'
import { SlateRenderer } from '@/components/core/slate/SlateRenderer'
import ShowMoreText from '@/components/showmore/ShowMoreText'
import { body2Styles } from '@/components/core/Typography'
import Link from 'next/link'

export interface ExperienceListProps {
  offers: OfferItemFragment[]
  actionButtonText: string
}

export const ExperienceList = ({
  offers,
  actionButtonText,
}: ExperienceListProps) => {
  return (
    <>
      {offers.map((offer) => (
        <Item key={offer._id}>
          <StyledImage
            src={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
            alt={offer.title ?? ''}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Details>
            <OfferNameAndDates
              offer={{
                title: offer.title ?? null,
                startDate: offer.startDate ?? null,
                endDate: offer.endDate ?? null,
                offerType: offer.offerType ?? null,
                price: offer.price ?? null,
                location: {
                  shortAddress: formatShortAddress(
                    offer.location.address ?? null
                  ),
                },
              }}
              withPrice
            />
            <Expandable
              more={
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  show more
                </span>
              }
              less={
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  show less
                </span>
              }
            >
              <SlateRenderer value={stringToSlateValue(offer.description)} />
            </Expandable>
          </Details>
          <Buttons>
            <Link href={`/experience/${offer._id}`}>
              <Button isFullWidth>{actionButtonText}</Button>
            </Link>
          </Buttons>
        </Item>
      ))}
    </>
  )
}

const Expandable = styled(ShowMoreText)`
  ${body2Styles}
`

const Item = styled.div`
  border: none;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow200};
  gap: 2.4rem;
  ${padding('sm')}

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }

  &:not(:last-child) {
    border-bottom: solid 1px ${({ theme }) => theme.colors.green900};
  }
`

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const StyledImage = styled(Image)`
  border: solid 1px ${({ theme }) => theme.colors.green900};
  width: 100%;
  height: auto;

  ${({ theme }) => theme.bp.md} {
    width: 200px;
    height: 200px;
    flex: 0;
    object-fit: cover;
  }
`

const Buttons = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
`
