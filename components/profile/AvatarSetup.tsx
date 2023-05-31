import { ProfileAvatarInput } from '@/generated/graphql'
import { getImageUrlFromNft } from '@/lib/image'
import { Network, OwnedNft } from 'alchemy-sdk'
import styled from 'styled-components'
import { Avatar } from '../core/Avatar'
import { Button } from '../core/Button'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { useModal } from '../hooks/useModal'
import { AvatarModal } from './AvatarModal'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { useState } from 'react'

export type ExtendedOwnedNft = OwnedNft & {
  network: Network
}

interface AvatarSetupProps {
  onNftSelected: (nft: ProfileAvatarInput | undefined) => void
  avatar?: ProfileAvatarInput | undefined | null
}

export const AvatarSetup = ({ onNftSelected, avatar }: AvatarSetupProps) => {
  const { deviceSize } = useDeviceSize()
  const [uploading, setUploading] = useState(false)
  const { showModal, hideModal } = useModal()
  const openSelectNftModal = () => {
    showModal(() => (
      <AvatarModal
        onStartUpload={handleStartUpload}
        onPhotoUploaded={handlePhotoUploaded}
        onNftSelect={handleNftSelect}
      />
    ))
  }

  const handleStartUpload = () => {
    setUploading(true)
    onNftSelected(undefined)
    hideModal()
  }

  const handlePhotoUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    const ipfsHash = Object.values(fileNameIpfsHashMap)[0]

    if (ipfsHash) {
      setUploading(false)

      onNftSelected({
        url: getImageUrlByIpfsHash(ipfsHash, true) as string,
      })

      hideModal()
    }
  }

  const handleNftSelect = (nft: ExtendedOwnedNft) => {
    const url = getImageUrlFromNft(nft)

    if (!url) {
      throw new Error('NFT does not have a media URL')
    }
    onNftSelected({
      url,
      network: nft.network,
      contractAddress: nft.contract.address,
      title: nft.title,
      tokenId: nft.tokenId,
      tokenUri: nft.tokenUri?.raw,
    })
    hideModal()
  }

  return (
    <Container>
      <Avatar
        isLoading={uploading}
        onClick={openSelectNftModal}
        size={deviceSize === 'mobile' ? 9.6 : 8.8}
        hoverShadow
        src={avatar?.url}
      />
      {avatar ? (
        <AvatarButton
          variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
          onClick={() => onNftSelected(undefined)}
        >
          Remove
        </AvatarButton>
      ) : (
        <AvatarButton
          variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
          onClick={openSelectNftModal}
        >
          Choose avatar
        </AvatarButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 2.4rem;
  }
`

const AvatarButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
