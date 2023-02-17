import { OwnedNft } from 'alchemy-sdk'
import { useState } from 'react'
import IconButton from '../core/IconButton'
import { ModalContainer } from '../core/modals/ModalContainer'
import { ModalTitle } from '../core/modals/ModalTitle'
import { SelectNftModalContent } from './SelectNftModalContent'

interface SelectNftModalProps {
  onSelect: (avatarUrl: string) => void
  nfts: OwnedNft[]
}

export const SelectNftModal = ({ onSelect, nfts }: SelectNftModalProps) => {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <ModalContainer>
      <ModalTitle
        text="Choose Avatar"
        endAdornment={
          <IconButton
            icon="info"
            color="green900"
            size={2}
            onClick={() => setAboutOpen(true)}
          />
        }
        {...(aboutOpen && {
          startAdornment: (
            <IconButton
              icon="back-arrow"
              color="green900"
              size={2}
              onClick={() => setAboutOpen(false)}
            />
          ),
        })}
      />
      <SelectNftModalContent
        nfts={nfts}
        aboutOpen={aboutOpen}
        onSelect={onSelect}
      />
    </ModalContainer>
  )
}
