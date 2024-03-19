import {
  Caption,
  H1,
  H3,
  Overline,
  Subline2,
} from '@/components/core/Typography'
import Image from 'next/image'
import styled from 'styled-components'
import { shortenedAddress } from '@/utils/display-utils'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import { unlockConfig } from '@/lib/protocol-config'
import { getUnlockOpenseaUrl } from '@/lib/opensea'
import Icon from '@/components/core/Icon'
import { useProfile } from '@/components/auth/useProfile'
import { AppLink } from '@/components/core/AppLink'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ProfileFragment } from '@/utils/types/profile'

interface ProfileVerifiedCitizenshipProps {
  profile: ProfileFragment
}

export const ProfileVerifiedCitizenship = ({
  profile,
}: ProfileVerifiedCitizenshipProps) => {
  const { user } = useProfile()
  const isOwnProfile = user?.externId === profile.externId
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  const vouchedBy = profile.voucher

  const handleVouchOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!vouchedBy) {
      return
    }

    router.push(`/profile/${vouchedBy.externId}`)
  }

  if (!profile.citizenshipTokenId || !profile.citizenshipMintedAt) {
    return null
  }

  return (
    <InnerContainer>
      <TitleContainer>
        <H3>Citizenship</H3>
        {isOwnProfile && (
          <ManageCTA
            iconSize={0.8}
            iconName="chevron-right"
            href="/citizenship"
          >
            <Overline>Manage</Overline>
          </ManageCTA>
        )}
      </TitleContainer>
      <NFTContainer
        href={getUnlockOpenseaUrl(profile.citizenshipTokenId)}
        target="_blank"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <StyledImage
          alt={`${profile.citizenshipTokenId}`}
          src={DEFAULT_NFT_IMAGE}
          width={96}
          height={96}
        />
        <NFTDataContainer>
          <ImageBackground src={DEFAULT_NFT_IMAGE} />
          <NFTNameContainer>
            <TitleLine>
              <H1 $color="yellow100">Cabin Citizen</H1>
            </TitleLine>
            <TitleLine>
              <H1 $color="yellow100">#{profile.citizenshipTokenId}</H1>
              <ExternalIcon
                color="yellow100"
                name="up-right-arrow"
                size={1.4}
                hovered={hovered}
              />
            </TitleLine>
          </NFTNameContainer>
          <Subline2 $color="yellow100">
            Minted{' '}
            {format(new Date(profile.citizenshipMintedAt), 'MM/dd/yyyy', {
              locale: enUS,
            })}
          </Subline2>
          <Subline2 $color="yellow100">
            Address {shortenedAddress(unlockConfig.contractAddress)}
          </Subline2>
          {!!vouchedBy && (
            <VouchedByContainer>
              <Subline2 $color="yellow100">Vouched for by:</Subline2>
              <Caption
                emphasized
                $color="yellow100"
                onClick={handleVouchOnClick}
              >
                {vouchedBy.name}
              </Caption>
            </VouchedByContainer>
          )}
        </NFTDataContainer>
      </NFTContainer>
    </InnerContainer>
  )
}

const StyledImage = styled(Image)`
  z-index: 4;
`

const VouchedByContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  svg {
    opacity: 0.75;
  }
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 2.4rem;
  align-items: center;
  justify-content: space-between;
`

const ManageCTA = styled(AppLink)`
  gap: 0.89rem;
`

const NFTContainer = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green800};
  padding: 1.6rem;
  padding-left: 0rem;
  padding-bottom: 3rem;
  gap: 1.6rem;
  cursor: pointer;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
    gap: 2.4rem;
  }
`

interface ImageBackgroundProps {
  src: string
}

const ImageBackground = styled.div<ImageBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 7.3rem;
  background-image: url(${({ src }) => src});
  background-size: 20rem;
  background-position: 17rem 17rem;
  filter: blur(0.4rem);
  -webkit-filter: blur(0.4rem);
  transform: scale(1, 0.94);
`

const NFTDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;

  ${Subline2} {
    opacity: 0.75;
  }
`

const NFTNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 1.6rem;
  }
`

interface ExternalIconProps {
  hovered: boolean
}

const ExternalIcon = styled(Icon)<ExternalIconProps>`
  transition: transform 0.15s ease-in-out;
  transform: ${({ hovered }) => (hovered ? 'translateX(0.3rem)' : 'none')};
`
