import { useEffect, useCallback, useState } from 'react'
import { getAlchemyProvider } from '@/lib/chains'

const useEns = (address: string | undefined) => {
  const [ens, setEns] = useState<string | null>(null)

  const fetchEns = useCallback(async () => {
    try {
      const provider = getAlchemyProvider('mainnet')
      if (!address) return

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
