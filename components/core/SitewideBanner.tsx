import { useLocalStorage } from 'react-use'
import { useRouter } from 'next/router'
import { useSnapshot } from '@/components/contexts/SnapshotContext'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { H4, Subline2 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { usePrivy } from '@privy-io/react-auth'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { Button } from '@/components/core/Button'
import Link from 'next/link'

export const SitewideBanner = () => {
  const router = useRouter()
  const { proposals, countUserVotableProposals } = useSnapshot()
  const { externalUser } = useExternalUser()
  const { exportWallet } = usePrivy()

  // TODO: enable in a few months
  const isEmbeddedWallet =
    false && externalUser?.wallet?.walletClientType === 'privy'

  const [bannerClosedPropId, setBannerClosedPropId] = useLocalStorage<string>(
    'cabinVoteBannerClosedPropId'
  )
  const [bannerClosedWalletExport, setBannerClosedWalletExport] =
    useLocalStorage<boolean>('cabinWalletExportBannerClosedd')

  const showBanner =
    (isEmbeddedWallet && !bannerClosedWalletExport) ||
    (countUserVotableProposals > 0 && bannerClosedPropId !== proposals[0].id)

  if (!showBanner) return null

  if (isEmbeddedWallet) {
    return (
      <Banner>
        <H4>Cabin is winding down. Export your embedded wallet.</H4>
        <Button variant="secondary" onClick={exportWallet}>
          Export Wallet
        </Button>
        <Link href={expandRoute('walletExport')}>
          <Button variant="link">Learn More</Button>
        </Link>
        <CloseButton onClick={() => setBannerClosedWalletExport(true)}>
          <Icon name="close" size={1.8} />
        </CloseButton>
      </Banner>
    )
  }

  return (
    <Banner pointer onClick={() => router.push(expandRoute('vote'))}>
      <H4>
        {countUserVotableProposals === 1
          ? 'A proposal is up for vote'
          : `${countUserVotableProposals} proposals are up for vote`}{' '}
        <Icon
          name="up-right-arrow"
          size={1.2}
          inline
          style={{ marginLeft: '0.4rem' }}
        />
      </H4>
      <Subline2 style={{ textDecoration: 'underline' }}>
        Please take a moment to review and vote on{' '}
        {countUserVotableProposals === 1 ? 'it' : 'them'}
      </Subline2>
      <CloseButton onClick={() => setBannerClosedPropId(proposals[0].id)}>
        <Icon name="close" size={1.8} />
      </CloseButton>
    </Banner>
  )
}

const Banner = styled.div<{ pointer?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 6rem; // 6rem pad keeps text from getting cut off by mobile nav
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background: ${({ theme }) => theme.colors.yellow300};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};

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
