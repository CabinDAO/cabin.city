import { useState } from 'react'
import IconButton from '../core/IconButton'
import { ModalContainer } from '../core/modals/ModalContainer'
import { ModalTitle } from '../core/modals/ModalTitle'
import { AvatarModalContent } from './AvatarModalContent'
import { ExtendedOwnedNft } from './AvatarSetup'
import styled from 'styled-components'
import { SelectNftModal } from './SelectNftModal'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'

interface AvatarModalProps {
  onNftSelect: (nft: ExtendedOwnedNft) => void
  onPhotoUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  onStartUpload: VoidFunction
}

export type AvatarMode = 'nft' | 'upload'

export const AvatarModal = ({
  onNftSelect,
  onPhotoUploaded,
  onStartUpload,
}: AvatarModalProps) => {
  const [avatarMode, setAvatarMode] = useState<AvatarMode | null>(null)

  const handleNftClick = (avatarMode: AvatarMode) => {
    setAvatarMode(avatarMode)
  }

  const [aboutOpen, setAboutOpen] = useState(false)

  if (avatarMode === 'nft') {
    return (
      <SelectNftModal
        onClose={() => setAvatarMode(null)}
        onSelect={onNftSelect}
      />
    )
  }

  return (
    <AvatarModalContainer>
      <ModalTitle
        text="Choose Avatar"
        endAdornment={
          <IconButton
            animated
            icon="info"
            color="green900"
            size={2}
            onClick={() => setAboutOpen(true)}
          />
        }
        {...(aboutOpen && {
          startAdornment: (
            <IconButton
              animated
              icon="back-arrow"
              color="green900"
              size={2}
              onClick={() => setAboutOpen(false)}
            />
          ),
        })}
      />
      <AvatarModalContent
        onStartUpload={onStartUpload}
        onPhotoUploaded={onPhotoUploaded}
        onAvatarModeSelected={handleNftClick}
        onNftSelect={onNftSelect}
        aboutOpen={aboutOpen}
      />
    </AvatarModalContainer>
  )
}

const AvatarModalContainer = styled(ModalContainer)`
  height: 100%;
`
