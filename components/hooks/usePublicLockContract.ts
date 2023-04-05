import { unlockConfig } from '@/lib/protocol-config'
import { useContract, useSigner } from 'wagmi'
import PUBLIC_LOCK_ABI from '@/lib/abi/PublicLock.json'
import { PublicLock } from '@/generated/contract'

export const usePublicLockContract = () => {
  const { data: signer } = useSigner()

  const contract = useContract({
    address: unlockConfig.contractAddress,
    abi: PUBLIC_LOCK_ABI,
    signerOrProvider: signer,
  })

  return contract as PublicLock
}
