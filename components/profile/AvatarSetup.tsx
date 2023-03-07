import { ProfileAvatarInput } from '@/generated/graphql'
import { OwnedNft } from 'alchemy-sdk'
import styled from 'styled-components'
import { Avatar } from '../core/Avatar'
import { Button } from '../core/Button'
import { useModal } from '../hooks/useModal'
import { SelectNftModal } from './SelectNftModal'

interface AvatarSetupProps {
  onNftSelected: (nft: ProfileAvatarInput | undefined) => void
  avatar?: ProfileAvatarInput | undefined | null
}

export const AvatarSetup = ({ onNftSelected, avatar }: AvatarSetupProps) => {
  const { showModal, hideModal } = useModal()
  const openSelectNftModal = () => {
    showModal(() => <SelectNftModal onSelect={handleNftSelect} />)
  }

  const handleNftSelect = (nft: OwnedNft) => {
    const url = nft.media[0]?.thumbnail

    if (!url) {
      throw new Error('NFT does not have a media URL')
    }
    onNftSelected({
      url,
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
        onClick={openSelectNftModal}
        size={8.8}
        hoverShadow
        src={avatar?.url}
      />
      {avatar ? (
        <Button variant="tertiary" onClick={() => onNftSelected(undefined)}>
          Remove
        </Button>
      ) : (
        <Button variant="tertiary" onClick={openSelectNftModal}>
          Choose avatar
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;
`
