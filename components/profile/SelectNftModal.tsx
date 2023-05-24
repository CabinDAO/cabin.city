import { getAlchemySdks } from '@/lib/alchemy'
import { OwnedNft } from 'alchemy-sdk'
import { useCallback, useEffect, useState } from 'react'
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

  const fetchNfts = useCallback(async () => {
    if (!chain || !address) return

    const alchemyInstances = getAlchemySdks()

    const myNfts =
      (
        await Promise.all(
          alchemyInstances.map((alchemy) =>
            alchemy.nft.getNftsForOwner(address)
          )
        )
      ).flatMap((response) => response.ownedNfts) ?? []

    const filteredNfts = myNfts.filter((nft) => nft.media.length > 0)

    if (filteredNfts.length > 0) {
      setNfts(filteredNfts)
    }
  }, [chain, address])

  useEffect(() => {
    if (!chain || !address) return

    fetchNfts()
  }, [chain, address, fetchNfts])

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
