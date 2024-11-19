import { useLocalStorage } from 'react-use'
import { useRouter } from 'next/router'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { H4, Subline2 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

const BANNER_CLOSED_KEY = 'nov2024VoteBannerClosed'

export const SitewideBanner = () => {
  const router = useRouter()
  const { hasUserVotableProposals } = useSnapshot()

  const [bannerClosed, setBannerClosed] =
    useLocalStorage<boolean>(BANNER_CLOSED_KEY)

  if (!hasUserVotableProposals || bannerClosed) return null

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
      <CloseButton onClick={() => setBannerClosed(true)}>
        <Icon name="close" size={1.8} />
      </CloseButton>
    </Banner>
  )
}

const Banner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 1.2rem 6rem; // 6rem pad keeps text from getting cut off by mobile nav
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

const CloseButton = styled.span`
  position: absolute;
  top: 2rem;
  left: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.bp.md} {
    left: initial;
    right: 2rem;
  }
`
