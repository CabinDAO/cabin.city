import { OnboardingLayout } from '../layouts/OnboardingLayout'
import { TitleCard } from '../core/TitleCard'
import { ContentCard } from '../core/ContentCard'
import { RegistrationForm } from './RegistrationForm'
import { useEffect, useState } from 'react'
import { OwnedNft } from 'alchemy-sdk'
import { getAlchemySdk } from '@/lib/alchemy'

export interface RegistrationParams {
  email: string
  displayName: string
  avatarUrl: string
}

export const RegistrationView = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([])
  const [loadedNfts, setLoadedNfts] = useState(false)

  useEffect(() => {
    if (loadedNfts) return

    //  TODO: Use current connected address
    const alchemy = getAlchemySdk('goerli')

    // TODO: Use current connected network
    alchemy.nft
      .getNftsForOwner('0x6107E341e1F93aF3E32fdE1a104BD39FbAD1e30e')
      .then((nfts) => {
        console.log(nfts.ownedNfts) // TODO: Remove
        setNfts(nfts.ownedNfts.filter((nft) => nft.media.length > 0))
        setLoadedNfts(true)
      })
      .catch((err) => {
        console.error(err)
        setLoadedNfts(true)
      })
    return () => {
      setLoadedNfts(false)
    }
  }, [loadedNfts])

  const handleRegistration = ({
    email,
    displayName,
    avatarUrl,
  }: RegistrationParams) => {
    // TODO: Wire up into CreateProfile mutation
    console.log(email, displayName, avatarUrl)
  }

  return (
    <OnboardingLayout>
      <TitleCard title="Welcome to Cabin" icon="logo-cabin" />
      <ContentCard shape="notch">
        <RegistrationForm nfts={nfts} onSubmit={handleRegistration} />
      </ContentCard>
    </OnboardingLayout>
  )
}
