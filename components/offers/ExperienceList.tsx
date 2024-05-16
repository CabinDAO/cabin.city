import styled from 'styled-components'
import { OfferFragment } from '@/utils/types/offer'
import { Button } from '@/components/core/Button'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { OfferNameAndDates } from '@/components/offers/OfferNameAndDates'
import Image from 'next/image'
import { padding } from '@/styles/theme'
import { stringToSlateValue } from '@/components/core/slate/slate-utils'
import { SlateRenderer } from '@/components/core/slate/SlateRenderer'
import ShowMoreText from '@/components/showmore/ShowMoreText'
import { body2Styles } from '@/components/core/Typography'
import Link from 'next/link'
import Icon from '@/components/core/Icon'
import React from 'react'

export const ExperienceList = ({
  offers,
  actionButtonText,
  isEditable,
}: {
  offers: OfferFragment[]
  actionButtonText: string
  isEditable?: boolean
}) => {
  return (
    <>
      {offers.map((offer) => (
        <Item
          key={offer.externId}
          active={offer.endDate >= new Date().toISOString().slice(0, 10)}
        >
          <Contents>
            {offer.imageIpfsHash && (
              <StyledImage
                src={getImageUrlByIpfsHash(offer.imageIpfsHash) ?? ''}
                alt={offer.title ?? ''}
                width={0}
                height={0}
                sizes="100vw"
              />
            )}
            <Details>
              <OfferNameAndDates offer={offer} withPrice noImage />
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
              <Link href={`/experience/${offer.externId}`}>
                <Button isFullWidth>{actionButtonText}</Button>
              </Link>
            </Buttons>
          </Contents>
          {isEditable && (
            <AdminActions>
              <Link href={`/experience/${offer.externId}/edit`}>
                <Button variant="link">
                  <Icon name="pencil" size={1.6} />
                  Edit
                </Button>
              </Link>
            </AdminActions>
          )}
        </Item>
      ))}
    </>
  )
}

const Expandable = styled(ShowMoreText)`
  ${body2Styles}
`

const Item = styled.div<{ active: boolean }>`
  border: none;
  display: flex;
  width: 100%;
  flex-direction: column;

  opacity: ${({ active }) => (active ? 1 : 0.65)};

  &:not(:last-child) {
    border-bottom: solid 1px ${({ theme }) => theme.colors.green900};
  }
`

const Contents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow200};
  gap: 2.4rem;
  ${padding('sm')}

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const AdminActions = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    justify-content: flex-end;
    border-top: solid 1px ${({ theme }) => theme.colors.green900};
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
