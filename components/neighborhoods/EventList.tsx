import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { parseISO } from 'date-fns'
import { formatRange } from '@/utils/display-utils'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { EventFragment } from '@/utils/types/event'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { Button } from '@/components/core/Button'
import { stringToSlateValue } from '@/components/core/slate/slate-utils'
import { SlateRenderer } from '@/components/core/slate/SlateRenderer'
import ShowMoreText from '@/components/showmore/ShowMoreText'
import { body2Styles, H2, H5 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

export const EventList = ({
  events,
  isEditable,
}: {
  events: EventFragment[]
  isEditable?: boolean
}) => {
  return (
    <>
      {events.map((event) => (
        <Item
          key={event.externId}
          active={event.endDate >= new Date().toISOString().slice(0, 10)}
        >
          <Contents>
            {event.imageIpfsHash && (
              <StyledImage
                src={getImageUrlByIpfsHash(event.imageIpfsHash) ?? ''}
                alt={event.title ?? ''}
                width={0}
                height={0}
                sizes="100vw"
              />
            )}
            <Details>
              <NameAndDate>
                <H5>
                  {formatRange(
                    parseISO(event.startDate),
                    parseISO(event.endDate)
                  )}
                </H5>

                <H2>{event.title}</H2>
              </NameAndDate>
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
                <SlateRenderer value={stringToSlateValue(event.description)} />
              </Expandable>
            </Details>
            <Buttons>
              <Link
                href={event.applicationUrl}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <Button isFullWidth>RSVP</Button>
              </Link>
              {isEditable && (
                <Link href={`/event/${event.externId}/edit`}>
                  <Button variant="link">
                    <Icon name="pencil" size={1.6} />
                    Edit
                  </Button>
                </Link>
              )}
            </Buttons>
          </Contents>

          {/*{isEditable && (*/}
          {/*  <AdminActions>*/}
          {/*    <Link href={`/event/${event.externId}/edit`}>*/}
          {/*      <Button variant="link">*/}
          {/*        <Icon name="pencil" size={1.6} />*/}
          {/*        Edit*/}
          {/*      </Button>*/}
          {/*    </Link>*/}
          {/*  </AdminActions>*/}
          {/*)}*/}
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

// const AdminActions = styled.div`
//   display: flex;
//   justify-content: center;
//
//   ${({ theme }) => theme.bp.md} {
//     justify-content: flex-end;
//     border-top: solid 1px ${({ theme }) => theme.colors.green900};
//     border-bottom: solid 1px ${({ theme }) => theme.colors.green900};
//   }
// `

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
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
