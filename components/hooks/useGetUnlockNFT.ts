import { DEFAULT_NFT_IMAGE, UnlockNFT } from '@/utils/citizenship'
import { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { usePublicLockContract } from './usePublicLockContract'

export const useGetUnlockNFT = () => {
  const publicLockContract = usePublicLockContract()
  const [activeNFT, setActiveNFT] = useState<UnlockNFT | null>(null)
  const [loading, setLoading] = useState(false)
  const { user: profile } = useUser()

  useEffect(() => {
    const getNFT = async () => {
      if (
        !publicLockContract ||
        !profile?.account?.address ||
        !profile.citizenshipMetadata
      ) {
        setLoading(false)
        return
      }

      setLoading(true)
      const nft = await publicLockContract.getHasValidKey(
        profile.account.address
      )
      console.log('🚀 ~ file: useGetUnlockNFT.ts:30 ~ getNFT ~ nft:', nft)

      if (nft) {
        const tokenId = await publicLockContract.tokenOfOwnerByIndex(
          profile.account.address,
          0
        )
        console.log(
          '🚀 ~ file: useGetUnlockNFT.ts:37 ~ getNFT ~ tokenId:',
          tokenId
        )

        const expirationTimestamp =
          await publicLockContract.keyExpirationTimestampFor(tokenId)
        console.log(
          '🚀 ~ file: useGetUnlockNFT.ts:43 ~ getNFT ~ expirationTimestamp:',
          expirationTimestamp
        )

        setActiveNFT({
          tokenId: tokenId.toString(),
          mintedDate: new Date(profile.citizenshipMetadata.mintedAt),
          expirationDate: new Date(expirationTimestamp.toNumber() * 1000),
          image: DEFAULT_NFT_IMAGE,
        })
      }
      setLoading(false)
    }

    getNFT()
  }, [profile])

  return { activeNFT, loading }
}
