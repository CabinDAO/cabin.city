import { useEffect, useCallback, useState } from 'react'
import { getProvider } from '@wagmi/core'
import { useNetwork } from 'wagmi'

const useEns = (address: string | undefined) => {
  const [ens, setEns] = useState<string | null>(null)
  const { chain } = useNetwork()

  const fetchEns = useCallback(async () => {
    try {
      const provider = getProvider()
      if (!address) return
      if (['homestead', 'goerli'].includes(chain?.network || '')) {
        const _ens = await provider.lookupAddress(address)
        setEns(_ens)
      }
    } catch (e) {
      console.error(e)
    }
  }, [address, chain])

  useEffect(() => {
    fetchEns()
  }, [fetchEns, address])

  return { ens }
}

export default useEns
