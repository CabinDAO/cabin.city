import { H1, H3, Overline, Subline2 } from '@/components/core/Typography'
import { GetProfileByIdFragment } from '@/generated/graphql'
import Image from 'next/image'
import styled from 'styled-components'
import { shortenedAddress } from '@/utils/display-utils'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import { unlockConfig } from '@/lib/protocol-config'
import { getUnlockOpenseaUrl } from '@/utils/opensea'
import Icon from '@/components/core/Icon'
import Link from 'next/link'
import { useUser } from '@/components/auth/useUser'

interface ProfileVerifiedCitizenshipProps {
  profile: GetProfileByIdFragment
}

export const ProfileVerifiedCitizenship = ({
  profile,
}: ProfileVerifiedCitizenshipProps) => {
  const { user } = useUser()
  const isOwnProfile = user?._id === profile._id

  if (!profile.citizenshipMetadata) {
    return null
  }

  return (
    <InnerContainer>
      <TitleContainer>
        <H3>Citizenship</H3>
        {isOwnProfile && (
          <Link href="/citizenship" passHref>
            <ManageCTA>
              <Overline>Manage</Overline>
              <Icon name="chevron-right" size={0.7} />
            </ManageCTA>
          </Link>
        )}
      </TitleContainer>
      <NFTContainer
        href={getUnlockOpenseaUrl(profile.citizenshipMetadata.tokenId)}
        target="_blank"
      >
        <StyledImage
          alt={profile.citizenshipMetadata?.tokenId}
          src={DEFAULT_NFT_IMAGE}
          width={96}
          height={96}
        />
        <NFTDataContainer>
          <ImageBackground src={DEFAULT_NFT_IMAGE} />
          <NFTNameContainer>
            <TitleLine>
              <H1 emphasized $color="yellow100">
                Cabin Citizen
              </H1>
            </TitleLine>
            <TitleLine>
              <H1 emphasized $color="yellow100">
                #{profile.citizenshipMetadata.tokenId}
              </H1>
              <Icon color="yellow100" name="up-right-arrow" size={1.4} />
            </TitleLine>
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

const ManageCTA = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 0.89rem;
  align-items: center;
  justify-content: center;
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
