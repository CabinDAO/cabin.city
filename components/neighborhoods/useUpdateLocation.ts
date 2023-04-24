import {
  PartialUpdateLocationInput,
  useUpdateLocationMutation,
} from '@/generated/graphql'

export function useUpdateLocation(locationId: string | undefined) {
  const [updateLocationMutation] = useUpdateLocationMutation()

  const updateLocation = async (inputData: PartialUpdateLocationInput = {}) => {
    if (locationId) {
      const { data } = await updateLocationMutation({
        variables: {
          id: locationId,
          data: inputData,
        },
      })

      if (data?.partialUpdateLocation) {
        return data.partialUpdateLocation
      } else {
        return null
      }
    }
  }

  return { updateLocation }
}
