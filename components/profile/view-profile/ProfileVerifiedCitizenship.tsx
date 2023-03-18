import { H1, H3, Subline2 } from '@/components/core/Typography'
import { GetProfileByIdFragment } from '@/generated/graphql'
import Image from 'next/image'
import styled from 'styled-components'
import { shortenedAddress } from '@/utils/display-utils'
import Icon from '@/components/core/Icon'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import { unlockConfig } from '@/lib/protocol-config'
import { getUnlockOpenseaUrl } from '@/utils/opensea'
import { useRouter } from 'next/router'

interface ProfileVerifiedCitizenshipProps {
  profile: GetProfileByIdFragment
}

export const ProfileVerifiedCitizenship = ({
  profile,
}: ProfileVerifiedCitizenshipProps) => {
  const router = useRouter()

  if (!profile.citizenshipMetadata) {
    return null
  }

  const onCardClick = () => {
    router.push('/citizenship')
  }

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  return (
    <InnerContainer>
      <TitleContainer>
        <H3>Citizenship</H3>
      </TitleContainer>
      <NFTContainer onClick={onCardClick}>
        <StyledImage
          alt={profile.citizenshipMetadata?.tokenId}
          src={DEFAULT_NFT_IMAGE}
          width={96}
          height={96}
        />
        <NFTDataContainer>
          <ImageBackground src={DEFAULT_NFT_IMAGE} />
          <NFTNameContainer>
            <H1 emphasized $color="yellow100">
              Cabin Citizen #{profile.citizenshipMetadata.tokenId}
            </H1>
            <a
              onClick={onAnchorClick}
              href={getUnlockOpenseaUrl(profile.citizenshipMetadata.tokenId)}
            >
              <Icon color="yellow100" name="up-right-arrow" size={1.4} />
            </a>
          </NFTNameContainer>
          <Subline2 $color="yellow100">
            Minted{' '}
            {format(
              new Date(profile.citizenshipMetadata?.mintedAt),
              'MM/dd/yyyy',
              {
                locale: enUS,
              }
            )}
          </Subline2>
          <Subline2 $color="yellow100">
            Address {shortenedAddress(unlockConfig.contractAddress)}
          </Subline2>
        </NFTDataContainer>
      </NFTContainer>
    </InnerContainer>
  )
}

const StyledImage = styled(Image)`
  z-index: 4;
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`

const TitleContainer = styled.div`
  display: flex;
  padding: 2.4rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const NFTContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 14.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green800};
  padding: 2.4rem;
  gap: 2.4rem;
  cursor: pointer;
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
  z-index: 3;
`

const NFTDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;
`

const NFTNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.69rem;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`
