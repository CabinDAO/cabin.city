import { DEFAULT_NFT_IMAGE, UnlockNFT } from '@/utils/citizenship'
import { useEffect, useState } from 'react'
import { useSigner } from 'wagmi'
import { useUser } from '../auth/useUser'
import { usePublicLockContract } from './usePublicLockContract'

export const useGetUnlockNFT = () => {
  const publicLockContract = usePublicLockContract()
  const { data: signer } = useSigner()
  const [activeNFT, setActiveNFT] = useState<UnlockNFT | null>(null)
  const [loading, setLoading] = useState(false)
  const { user: profile } = useUser()

  useEffect(() => {
    const getNFT = async () => {
      if (
        !signer ||
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

      if (nft) {
        const tokenId = await publicLockContract.tokenOfOwnerByIndex(
          profile.account.address,
          0
        )

        const expirationTimestamp =
          await publicLockContract.keyExpirationTimestampFor(tokenId)

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
  }, [signer, publicLockContract, profile])

  return { activeNFT, loading }
}
