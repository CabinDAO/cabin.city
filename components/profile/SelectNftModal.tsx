import { getAlchemySdk } from '@/lib/alchemy'
import { OwnedNft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import IconButton from '../core/IconButton'
import { ModalContainer } from '../core/modals/ModalContainer'
import { ModalTitle } from '../core/modals/ModalTitle'
import { SelectNftModalContent } from './SelectNftModalContent'

interface SelectNftModalProps {
  onSelect: (nft: OwnedNft) => void
}

export const SelectNftModal = ({ onSelect }: SelectNftModalProps) => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [nfts, setNfts] = useState<OwnedNft[] | null>(null)
  const { chain } = useNetwork()
  const { address } = useAccount()

  useEffect(() => {
    if (!chain || !address) return

    const alchemy = getAlchemySdk()

    alchemy.nft
      .getNftsForOwner(address) // TODO: address
      .then((nfts) => {
        setNfts(nfts.ownedNfts.filter((nft) => nft.media.length > 0))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [chain, address])

  return (
    <ModalContainer>
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
      <SelectNftModalContent
        nfts={nfts}
        aboutOpen={aboutOpen}
        onSelect={onSelect}
      />
    </ModalContainer>
  )
}
