import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { Caption, H3, Overline } from '../core/Typography'
import { HorizontalDivider } from '../core/Divider'
import { AutofitImage } from '../core/AutofitImage'
import { CitizenshipNFTPreviewData } from './CitizenshipNFTPreviewData'
import { CitizenshipNFTData } from './CitizenshipNFTData'
import { useGetUnlockNFT } from '../hooks/useGetUnlockNFT'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import { unlockConfig } from '@/lib/protocol-config'
import { capitalize, pxToRem, shortenedAddress } from '@/utils/display-utils'
import { NFTDataList } from './NFTDataList'
import { AppLink } from '../core/AppLink'

const INNER_PADDING_PX = 24
const IMAGE_SIZE_PX = 336
const TABLET_IMAGE_SIZE_PX = 222

export const CitizenNFTContainer = () => {
  const { activeNFT } = useGetUnlockNFT()

  const imageSrc = activeNFT?.image || DEFAULT_NFT_IMAGE

  const contractData = {
    'Contract Address': {
      value: shortenedAddress(unlockConfig.contractAddress) ?? '',
      url: `https://${unlockConfig.networkName}.etherscan.io/address/${unlockConfig.contractAddress}`,
      external: true,
    },
    Blockchain: { value: capitalize(unlockConfig.networkName) ?? '' },
  }

  return (
    <StyledContentCard shape="notch">
      <Section>
        <NFTContainer>
          <NftImage>
            <AutofitImage src={imageSrc} alt={'Unlock NFT'} />
          </NftImage>
        </NFTContainer>
        {activeNFT ? (
          <CitizenshipNFTData nft={activeNFT} />
        ) : (
          <CitizenshipNFTPreviewData />
        )}
      </Section>
      <HorizontalDivider />
      <Section>
        <DescriptionContainer>
          <H3>Description</H3>
          <Caption>
            Etiam interdum odio vel mi facilisis, ut luctus orci dictum. Aenean
            consequat libero eros. Vivamus sollicitudin vestibulum nisi, nec
            elementum augue pulvinar sit amet. Fusce dictum, urna ut
            pellentesque aliquet, nisi lacus aliquet lorem, eget pulvinar magna
            justo eu erat. Suspendisse vel scelerisque ante.
          </Caption>
          <AppLink external location="/" iconSize={0.9}>
            <Overline>Learn More</Overline>
          </AppLink>
        </DescriptionContainer>
        <DescriptionContainer>
          <H3>Contract Information</H3>
          <NFTDataList data={contractData} />
        </DescriptionContainer>
      </Section>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
`

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
  }
`

const NFTContainer = styled.div`
  display: flex;
  padding: ${pxToRem(INNER_PADDING_PX)}rem;
  background: url('/images/nft-background.png');
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    max-height: ${pxToRem(TABLET_IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
  }

  ${({ theme }) => theme.bp.lg} {
    max-height: ${pxToRem(IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
  }
`

const NftImage = styled.div`
  position: relative;
  display: flex;
  border-radius: 0 0 49rem 0;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 22.2rem;
    height: 22.2rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 33.6rem;
    height: 33.6rem;
    border-radius: 0 0 64rem 0;
  }
`
