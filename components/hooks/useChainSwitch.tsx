import { defaultChain } from '@/lib/chains'
import { useRouter } from '@/components/hooks/useRouter'
import { useAccount, useSwitchChain } from 'wagmi'
import { useModal } from './useModal'
import { SwitchNetworkModal } from '@/components/core/SwitchNetworkModal'
import { useExternalUser } from '../auth/useExternalUser'
import { useWallets } from '@privy-io/react-auth'
import { addressMatch } from '@/utils/address-match'

export const useChainSwitch = (afterSwitch?: VoidFunction) => {
  const { hideModal, showLoadingModal } = useModal()
  const router = useRouter()
  const { wallets } = useWallets()
  const { externalUser } = useExternalUser()
  const isEmbeddedWallet = externalUser?.wallet?.walletClient === 'privy'
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()

  const switchChainForEmbeddedWallet = async () => {
    const wallet =
      wallets.find((w) =>
        addressMatch(externalUser?.wallet?.address ?? '', w.address)
      ) ?? wallets[0]

    if (!wallet) return

    const provider = await wallet.getEthersProvider()

    await provider.send('wallet_switchEthereumChain', [`0x${defaultChain.id}`])
  }

  const handleLeave = () => {
    router.push('profile').then()
    hideModal()
  }

  const switchToAppChain = () => {
    if (chain?.id === defaultChain.id) return

    switchChain(
      { chainId: defaultChain.id },
      {
        onSuccess: () => {
          afterSwitch?.()
          hideModal()
        },
        onError: () => {
          if (isEmbeddedWallet) {
            switchChainForEmbeddedWallet()
          } else {
            console.error('Error switching chain')
          }
          hideModal()
        },
      }
    )
  }

  const handleSwitch = () => {
    if (chain?.id !== defaultChain.id) {
      showLoadingModal(() => (
        <SwitchNetworkModal onSwitch={switchToAppChain} onLeave={handleLeave} />
      ))
    }
  }

  return { handleSwitch, isOnRightChain: chain?.id === defaultChain.id }
}
