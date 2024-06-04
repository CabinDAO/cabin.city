import { getCurrentAlchemySdks } from '@/lib/chains'
import { Alchemy } from 'alchemy-sdk'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import IconButton from '@/components/core/IconButton'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { SelectNftModalContent } from './SelectNftModalContent'
import { ExtendedOwnedNft } from './AvatarModal'

interface SelectNftModalProps {
  onSelect: (nft: ExtendedOwnedNft) => void
  onClose: VoidFunction
}

interface NetworkNftMap {
  [key: string]: ExtendedOwnedNft[]
}

export const SelectNftModal = ({ onSelect, onClose }: SelectNftModalProps) => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const { chain, address } = useAccount()

  const [nftsbyNetwork, setNftsbyNetwork] = useState<NetworkNftMap>({})

  const nfts = Object.values(nftsbyNetwork).flat()

  const fetchNftsByNetwork = useCallback(
    async (alchemyInstance: Alchemy) => {
      if (!chain || !address) return

      const network = alchemyInstance.config.network

      const myNfts = await alchemyInstance.nft.getNftsForOwner(address)

      const filteredNfts = myNfts.ownedNfts.filter(
        (nft) => nft.image.originalUrl
      )

      if (filteredNfts.length > 0) {
        setNftsbyNetwork((prev) => ({
          ...prev,
          [network]: filteredNfts.map((nft) => ({
            ...nft,
            network,
          })),
        }))
      }
    },
    [chain, address]
  )

  const fetchNfts = useCallback(async () => {
    if (!chain || !address) return

    const alchemyInstances = getCurrentAlchemySdks()

    await Promise.all(
      alchemyInstances.map((alchemyInstance) =>
        fetchNftsByNetwork(alchemyInstance)
      )
    )
  }, [chain, address, fetchNftsByNetwork])

  useEffect(() => {
    if (!chain || !address) return

    fetchNfts()
  }, [chain, address, fetchNfts])

  const handleNftSelect = (nft: ExtendedOwnedNft) => {
    onSelect(nft)
  }

  return (
    <ModalContainer>
      <ModalTitle
        text="Choose NFT"
        endAdornment={
          <IconButton
            animated
            icon="info"
            color="green900"
            size={2}
            onClick={() => setAboutOpen(true)}
          />
        }
        startAdornment={
          aboutOpen ? (
            <IconButton
              animated
              icon="back-arrow"
              color="green900"
              size={2}
              onClick={() => setAboutOpen(false)}
            />
          ) : (
            <IconButton
              animated
              icon="back-arrow"
              color="green900"
              size={2}
              onClick={onClose}
            />
          )
        }
      />
      <SelectNftModalContent
        nfts={nfts}
        aboutOpen={aboutOpen}
        onSelect={handleNftSelect}
      />
    </ModalContainer>
  )
}
