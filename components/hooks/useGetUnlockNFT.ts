import { DEFAULT_NFT_IMAGE, UnlockNFT } from '@/utils/citizenship'
import { useEffect, useState } from 'react'
import { useConfig } from 'wagmi'
import { useProfile } from '../auth/useProfile'
import { readCitizenshipContract } from '@/generated/contracts'
import { defaultChain } from '@/lib/chains'

export const useGetUnlockNFT = () => {
  const [activeNFT, setActiveNFT] = useState<UnlockNFT | null>(null)
  const [loading, setLoading] = useState(false)
  const { user: profile } = useProfile()
  const config = useConfig()

  useEffect(() => {
    const getNFT = async () => {
      if (!profile?.walletAddress || !profile.citizenshipMintedAt) {
        setLoading(false)
        return
      }

      setLoading(true)
      const hasCitizenship = await readCitizenshipContract(config, {
        chainId: defaultChain.id,
        functionName: 'getHasValidKey',
        args: [profile.walletAddress as `0x${string}`],
      })

      if (hasCitizenship) {
        const tokenId = await readCitizenshipContract(config, {
          chainId: defaultChain.id,
          functionName: 'tokenOfOwnerByIndex',
          args: [profile.walletAddress as `0x${string}`, BigInt(0)],
        })

        const expirationTimestamp = await readCitizenshipContract(config, {
          chainId: defaultChain.id,
          functionName: 'keyExpirationTimestampFor',
          args: [tokenId],
        })

        setActiveNFT({
          tokenId: tokenId.toString(),
          mintedDate: new Date(profile.citizenshipMintedAt),
          expirationDate:
            expirationTimestamp > BigInt(4102462800)
              ? null
              : new Date(Number(expirationTimestamp) * 1000),
          image: DEFAULT_NFT_IMAGE,
        })
      }
      setLoading(false)
    }

    getNFT()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  return { activeNFT, loading }
}
