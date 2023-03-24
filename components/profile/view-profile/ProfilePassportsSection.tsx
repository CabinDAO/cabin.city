import { GetProfileByIdFragment } from '@/generated/graphql'
import styled from 'styled-components'
import { H3, Overline } from '@/components/core/Typography'
import { ProfileEmptyStateSection } from './ProfileEmptyStateSection'
import { useState } from 'react'
import { Badge } from '@/components/core/Badge'
import IconButton from '@/components/core/IconButton'
import { PASSPORT_PAGE_SIZE } from '../constants'

interface ProfilePassportsProps {
  profile: GetProfileByIdFragment
}

export const ProfilePassportsSection = ({ profile }: ProfilePassportsProps) => {
  const list = profile.account.badges.data
  const count = list.length
  const [currentPage, setCurrentPage] = useState(0)
  const start = PASSPORT_PAGE_SIZE * currentPage
  const end = (currentPage + 1) * PASSPORT_PAGE_SIZE
  const currentBadges = list.slice(start, end)

  const handleClickNext = () => {
    if (currentPage < Math.ceil(list.length / PASSPORT_PAGE_SIZE) - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (profile.account.badges.data.length) {
    return (
      <Container>
        <H3>Passport stamps</H3>
        <PassportsPage>
          {currentBadges.map((badge) => (
            <Badge
              key={badge?.spec._id}
              badgeId={badge?.badgeId ?? ''}
              name={badge?.spec.name ?? ''}
              src={badge?.spec.image ?? ''}
            />
          ))}
        </PassportsPage>
        <Pagination>
          <Overline>
            {start + 1} - {end > count ? count : end} of {count}
          </Overline>
          <PageTurner>
            <IconButton
              icon="chevron-left"
              size={1}
              onClick={handleClickPrev}
            />
            <IconButton
              icon="chevron-right"
              size={1}
              onClick={handleClickNext}
            />
          </PageTurner>
        </Pagination>
      </Container>
    )
  } else {
    return (
      <Container>
        <H3>Passport stamps</H3>
        <ProfileEmptyStateSection
          icon="card-heart"
          title="Collect Passport Stamps"
          description="Build your Cabin creds"
          href="https://cabin.city"
        />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const PassportsPage = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  width: 100%;
  grid-gap: 1.6rem;
  align-content: space-around;
  justify-content: space-between;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  ${({ theme }) => theme.bp.lg} {
    grid-gap: 2.4rem;
  }
`

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  gap: 2.2rem;
  padding-right: 1rem;
`

const PageTurner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.2rem;
`
