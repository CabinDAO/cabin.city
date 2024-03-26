import { useBackend } from '@/components/hooks/useBackend'
import {
  LocationEditParamsType,
  LocationEditResponse,
} from '@/utils/types/location'

export function useUpdateLocation(locationId: string | undefined) {
  const { useMutate } = useBackend()
  const { trigger: mutateLocation } = useMutate<LocationEditResponse>(
    locationId ? ['LOCATION', { externId: locationId }] : null
  )

  const updateLocation = async (inputData: LocationEditParamsType = {}) => {
    if (locationId) {
      const data = await mutateLocation(inputData)

      return data?.location || null
    }
  }

  return { updateLocation }
}
