import { useEffect, useCallback, useState } from 'react'
import { getEthersAlchemyProvider } from '@/lib/chains'

const useEns = (address: string | null | undefined) => {
  const [ens, setEns] = useState<string | null>(null)

  const fetchEns = useCallback(async () => {
    try {
      if (!address) return
      const provider = getEthersAlchemyProvider('mainnet')
      const _ens = await provider.lookupAddress(address)
      setEns(_ens)
    } catch (e) {
      console.error(e)
    }
  }, [address])

  useEffect(() => {
    fetchEns()
  }, [fetchEns, address])

  return { ens }
}

export default useEns
