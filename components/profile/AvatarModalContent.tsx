import { ModalExplainer } from '../core/modals/ModalExplainer'
import { Caption } from '../core/Typography'
import styled, { css } from 'styled-components'
import Icon from '../core/Icon'
import { Subline1 } from '../core/Typography'
import { ExtendedOwnedNft } from './AvatarSetup'
import { AvatarMode } from './AvatarModal'
import { FileUpload } from '../core/FileUpload'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'

interface AvatarModalContentProps {
  aboutOpen: boolean
  onNftSelect: (nft: ExtendedOwnedNft) => void
  onAvatarModeSelected: (avatarMode: AvatarMode) => void
  onPhotoUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  onStartUpload: VoidFunction
}

const AboutExplainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

export const AvatarModalContent = ({
  aboutOpen,
  onPhotoUploaded,
  onAvatarModeSelected,
  onStartUpload,
}: AvatarModalContentProps) => {
  if (aboutOpen) {
    const explanation = (
      <AboutExplainer>
        <Caption>
          An NFT is a unique digital asset that can represent ownership or proof
          of authenticity of a specific item, such as artwork. They can be
          acquired from various NFT marketplaces that operate on the blockchain.
        </Caption>
        <Caption>
          Cabin let&#39;s you select NFTs in your connected wallet to set as
          your profile picture.
        </Caption>
      </AboutExplainer>
    )

    return (
      <ModalExplainer
        title="Set an NFT you own as your avatar"
        explanation={explanation}
      />
    )
  }

  return (
    <Container>
      <StyledFileUpload
        multiple={false}
        onStartUploading={onStartUpload}
        onFilesUploaded={onPhotoUploaded}
      >
        <Circle>
          <Icon name="mountain" color="yellow600" size={2.6} />
        </Circle>
        <Subline1>Upload photo</Subline1>
      </StyledFileUpload>
      <AvatarModeContainer onClick={() => onAvatarModeSelected('nft')}>
        <Circle>
          <Icon name="nft" color="yellow600" size={2.6} />
        </Circle>
        <Subline1>Choose NFT</Subline1>
      </AvatarModeContainer>
    </Container>
  )
}

const avatarModeStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4.2rem 4rem;
  gap: 0.8rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green900}1A;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const AvatarModeContainer = styled.div`
  ${avatarModeStyles}
`

const StyledFileUpload = styled(FileUpload)`
  ${avatarModeStyles}
`

const Circle = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
`
