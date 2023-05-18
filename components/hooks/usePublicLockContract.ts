import { unlockConfig } from '@/lib/protocol-config'
import { useContract } from 'wagmi'
import PUBLIC_LOCK_ABI from '@/lib/abi/PublicLock.json'
import { PublicLock } from '@/generated/contract'
import { getAlchemyProvider } from '@/lib/alchemy'

export const usePublicLockContract = () => {
  const contract = useContract({
    address: unlockConfig.contractAddress,
    abi: PUBLIC_LOCK_ABI,
    signerOrProvider:
      process.env.NEXT_PUBLIC_USE_TESTNETS === 'true'
        ? getAlchemyProvider('goerli')
        : getAlchemyProvider('optimism'),
  })

  return contract as PublicLock
}
