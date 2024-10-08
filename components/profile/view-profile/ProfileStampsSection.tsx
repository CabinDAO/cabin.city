import { useState } from 'react'
import { ProfileFragment } from '@/utils/types/profile'
import styled from 'styled-components'
import { H3, Overline } from '@/components/core/Typography'
import { EmptyState } from '../../core/EmptyState'
import { Stamp } from '@/components/core/Stamp'
import IconButton from '@/components/core/IconButton'

const PASSPORT_PAGE_SIZE = 8

export const ProfileStampsSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const list = profile.stamps
  const count = list.length
  const start = PASSPORT_PAGE_SIZE * currentPage
  const end = (currentPage + 1) * PASSPORT_PAGE_SIZE
  const currentStamps = list.slice(start, end)

  if (count == 0) {
    return null
  }

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

  return (
    <Container>
      <H3 id={'stamps'}>Passport Stamps</H3>
      {count ? (
        <>
          <PassportsPage>
            {currentStamps.map((stamp) => (
              <Stamp key={stamp.id} name={stamp.name} id={stamp.id} />
            ))}
          </PassportsPage>
          {count > PASSPORT_PAGE_SIZE && (
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
          )}
        </>
      ) : (
        <EmptyState
          backgroundVariant="gradient"
          icon="stamp"
          title="Collect Passport Stamps"
          description="Build your Cabin creds"
          // href={EXTERNAL_LINKS.PASSPORTS}
        />
      )}
    </Container>
  )
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
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  width: 100%;
  grid-gap: 1.6rem;
  align-content: space-around;
  justify-content: space-between;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: repeat(4, 1fr);
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
