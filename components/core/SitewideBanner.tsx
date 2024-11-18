import { useRouter } from 'next/router'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { H4, Subline2 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

export const SitewideBanner = () => {
  const router = useRouter()
  const { hasActiveProposals, canVote } = useSnapshot()

  if (!hasActiveProposals || !canVote) return null

  return (
    <Banner onClick={() => router.push(expandRoute('vote'))}>
      <H4>
        There's a proposal up for vote{' '}
        <Icon
          name="up-right-arrow"
          size={1.2}
          inline
          style={{ marginLeft: '0.4rem' }}
        />
      </H4>
      <Subline2 style={{ textDecoration: 'underline' }}>
        Please take a moment to review and vote on it
      </Subline2>
    </Banner>
  )
}

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 1.2rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background: ${({ theme }) => theme.colors.yellow300};
  cursor: pointer;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    padding: 2.1rem 0;
    gap: 1.6rem;
    align-items: baseline;
  }
`
