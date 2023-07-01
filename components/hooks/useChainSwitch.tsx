import { appChain } from '@/lib/wagmi/wagmi-client'
import { useRouter } from 'next/router'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useModal } from './useModal'
import { SwitchNetworkModal } from '../core/SwitchNetworkModal'
import { useExternalUser } from '../auth/useExternalUser'
import { useWallets } from '@privy-io/react-auth'
import { addressMatch } from '@/utils/address-match'

export const useChainSwitch = (afterSwitch?: VoidFunction) => {
  const { hideModal, showLoadingModal } = useModal()
  const router = useRouter()
  const { chain } = useNetwork()
  const { wallets } = useWallets()
  const { externalUser } = useExternalUser()
  const isEmbeddedWallet = externalUser?.wallet?.walletClient === 'privy'
  const { switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: appChain.id,
    onSuccess: () => {
      afterSwitch?.()
      hideModal()
    },
    onError: () => {
      console.error('Error switching chain')

      if (isEmbeddedWallet) {
        switchChainForEmbeddedWallet()
      }
      hideModal()
    },
  })

  const switchChainForEmbeddedWallet = async () => {
    const wallet =
      wallets.find((w) =>
        addressMatch(externalUser?.wallet?.address ?? '', w.address)
      ) ?? wallets[0]

    if (!wallet) return

    const provider = await wallet.getEthersProvider()

    await provider.send('wallet_switchEthereumChain', [`0x${appChain.id}`])
  }

  const handleLeave = () => {
    router.push('/profile')
    hideModal()
  }

  const switchChain = () => {
    if (chain?.id === appChain.id) return

    switchNetwork?.()
  }

  const handleSwitch = () => {
    if (chain && chain?.id !== appChain.id) {
      showLoadingModal(() => (
        <SwitchNetworkModal onSwitch={switchChain} onLeave={handleLeave} />
      ))
    }
  }

  return { handleSwitch, rightChain: chain?.id === appChain.id }
}
