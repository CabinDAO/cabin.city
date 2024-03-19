import { useRef, useState } from 'react'
import Link from 'next/link'
import { unlockConfig } from '@/lib/protocol-config'
import { useGetUnlockNFT } from '../hooks/useGetUnlockNFT'
import { useProfile } from '@/components/auth/useProfile'
import { CitizenshipStatus } from '@/utils/types/profile'
import styled from 'styled-components'
import { capitalize, pxToRem, shortenedAddress } from '@/utils/display-utils'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { Body2, H3, Overline } from '../core/Typography'
import { Button } from '@/components/core/Button'
import { AppLink } from '../core/AppLink'
import { HorizontalDivider } from '../core/Divider'
import { ContentCard } from '../core/ContentCard'
import { CitizenshipNFTPreviewData } from './CitizenshipNFTPreviewData'
import { CitizenshipNFTData } from './CitizenshipNFTData'
import { NFTDataList } from './NFTDataList'

const INNER_PADDING_PX = 24
const IMAGE_SIZE_PX = 336
const TABLET_IMAGE_SIZE_PX = 222

export const CitizenNFTContainer = () => {
  const { user } = useProfile()
  const { activeNFT } = useGetUnlockNFT()
  const [displayVideo, setDisplayVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleImageOnClick = () => {
    setDisplayVideo(true)

    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause()
    }
  }

  const contractData = {
    'Contract Address': {
      value: shortenedAddress(unlockConfig.contractAddress) ?? '',
      url: `${unlockConfig.etherscanUrl}/address/${unlockConfig.contractAddress}`,
      external: true,
    },
    Blockchain: { value: capitalize(unlockConfig.networkName) ?? '' },
  }

  return (
    <StyledContentCard shape="notch">
      <Section>
        <NFTContainer onClick={handleImageOnClick}>
          <NftImage>
            <Video ref={videoRef} displayVideo={displayVideo} loop>
              <source src="/videos/citizenship.webm" type="video/webm" />
              <source src="/videos/citizenship.mp4" type="video/mp4" />
            </Video>
          </NftImage>
        </NFTContainer>
        {activeNFT ? (
          <CitizenshipNFTData nft={activeNFT} />
        ) : (
          <CitizenshipNFTPreviewData />
        )}
      </Section>
      {user?.citizenshipStatus == CitizenshipStatus.Verified && (
        <Link href={'/invite'}>
          <Button variant={'secondary'}>
            Invite your friends to become Citizens
          </Button>
        </Link>
      )}
      <HorizontalDivider />
      <Section>
        <DescriptionContainer>
          <H3>Description</H3>
          <Body2>
            Citizenship is your passport to Cabin’s network of neighborhoods. A
            current Citizen must nominate you for citizenship, and can only
            vouch for up to ten people per year. Citizens are granted
            chip-embedded passports, a numbered Citizen NFT, and ₡ABIN to
            participate in governance. They have exclusive access to
            residencies, coliving experiences, and build weeks at neighborhoods
            and outposts in the City Directory. Citizens also receive exclusive
            access to our annual gathering, citizens-only discord channels,
            merch, and partnership perks.
          </Body2>
          <AppLink external href={EXTERNAL_LINKS.CITIZENSHIP} iconSize={0.9}>
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

interface VideoProps {
  displayVideo: boolean
}

const Video = styled.video<VideoProps>`
  opacity: ${({ displayVideo }) => (displayVideo ? 1 : 0)};
`

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
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    height: ${pxToRem(TABLET_IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
    width: ${pxToRem(TABLET_IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
    max-height: ${pxToRem(TABLET_IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
  }

  ${({ theme }) => theme.bp.lg} {
    height: ${pxToRem(IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
    width: ${pxToRem(IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
    max-height: ${pxToRem(IMAGE_SIZE_PX + INNER_PADDING_PX * 2)}rem;
  }

  video {
    width: 100%;
    height: 100%;
  }
`

const NftImage = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: url(${DEFAULT_NFT_IMAGE}) no-repeat center;
  background-size: contain;
`
