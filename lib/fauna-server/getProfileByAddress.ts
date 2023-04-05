import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { faunaServerClient } from './faunaServerClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProfileByAddress = async (address: string): Promise<any> => {
  return faunaServerClient.query(GetProfileByAddress(address))
}
