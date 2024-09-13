import { UnlockNFT, YEARLY_PRICE_IN_USD } from '@/utils/citizenship'
import { EMPTY, formatDate } from '@/utils/display-utils'
import styled from 'styled-components'
import { useUser } from '../auth/useUser'
import { Button } from '@/components/core/Button'
import { H3, H1 } from '@/components/core/Typography'
import { NFTDataList } from './NFTDataList'
import { EXTERNAL_LINKS } from '@/utils/external-links'

interface CitizenshipNFTDataProps {
  nft?: UnlockNFT
}

export const CitizenshipNFTData = ({ nft }: CitizenshipNFTDataProps) => {
  const { user } = useUser()

  if (!user || !nft) return null

  let nftData = {}

  const expiredNft = nft?.expirationDate && nft.expirationDate < new Date()

  const vouchedBy = user?.voucher

  nftData = {
    'Vouched for by': {
      value: vouchedBy?.name || EMPTY,
      url: vouchedBy ? `/profile/${vouchedBy?.externId}` : undefined,
    },
    Type: { value: 'Cabin Citizenship' },
    Status: { value: expiredNft ? 'Expired' : user.citizenshipStatus },
    Created: { value: formatDate(nft.mintedDate, 'MMM dd, yyyy') },
    Expires: {
      value: nft.expirationDate
        ? formatDate(nft.expirationDate, 'MMM dd, yyyy')
        : EMPTY,
    },
    'Renewal Price': { value: `$${YEARLY_PRICE_IN_USD} / year` },
    'Citizen perks': {
      value: 'View my perks',
      url: EXTERNAL_LINKS.CITIZENSHIP_PERKS,
      external: true,
    },
  }

  return (
    <Container>
      <H1>Cabin Citizen #{nft?.tokenId}</H1>
      <DetailsContainer>
        <H3>Details</H3>
        <NFTDataList data={nftData} />
      </DetailsContainer>
      <UnlockCTAButton>
        <a
          href={EXTERNAL_LINKS.UNLOCK_KEY_MANAGE}
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          <Button isFullWidth variant="secondary">
            Manage
          </Button>
        </a>
      </UnlockCTAButton>
    </Container>
  )
}

const UnlockCTAButton = styled.div`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  width: 100%;
`
