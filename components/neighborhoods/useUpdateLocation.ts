import { useBackend } from '@/components/hooks/useBackend'
import {
  LocationEditParams,
  LocationEditResponse,
} from '@/utils/types/location'

export function useUpdateLocation(locationId: string | undefined) {
  const { useMutate } = useBackend()
  const { trigger: mutateLocation } = useMutate<LocationEditResponse>(
    locationId ? ['LOCATION', { externId: locationId }] : null
  )

  const updateLocation = async (inputData: LocationEditParams = {}) => {
    if (locationId) {
      const data = await mutateLocation(inputData)

      return data?.location || null
    }
  }

  return { updateLocation }
}
