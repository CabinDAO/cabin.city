import { defineConfig } from '@wagmi/cli'
import { react, actions } from '@wagmi/cli/plugins'
import { mainnet, sepolia, optimism } from 'wagmi/chains'
import { CabinTokenABI } from '@/lib/abi/CabinToken'
import { UnlockPublickLock } from '@/lib/abi/UnlockPublickLock'

export default defineConfig({
  out: 'generated/contracts.ts',
  contracts: [
    {
      name: 'Token Contract',
      address: {
        [mainnet.id]: '0x1934e252f840aa98dfce2b6205b3e45c41aef830',
        [sepolia.id]: '0x331E823689314B702396b97FF299D9D2968EFf47',
      },
      abi: CabinTokenABI,
    },
    {
      name: 'Citizenship Contract',
      address: {
        [optimism.id]: '0x45aCCac0E5C953009cDa713a3b722F87F2907F86',
        [sepolia.id]: '0xdbdd8b233bed095db975f2cd527a714c5fc7db62',
      },
      abi: UnlockPublickLock,
    },
  ],
  plugins: [react(), actions()],
})
