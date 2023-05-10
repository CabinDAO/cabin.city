import { MeDocument, useDeleteLocationMutation } from '@/generated/graphql'
import { useRouter } from 'next/router'
import { useModal } from './useModal'
import { DeleteConfirmationModal } from '../core/DeleteConfirmationModal'

export const useLocationActions = () => {
  const router = useRouter()
  const { showModal } = useModal()
  const [deleteLocationMutation] = useDeleteLocationMutation()

  const deleteLocation = (locationId: string) => {
    showModal(() => (
      <DeleteConfirmationModal
        onDelete={() =>
          deleteLocationMutation({
            variables: { id: locationId },
            refetchQueries: ['Me', { query: MeDocument }],
          })
        }
        entityName="listing"
      />
    ))
  }

  const editLocation = (locationId: string) => {
    router.push(`/location/${locationId}/edit`)
  }

  return {
    editLocation,
    deleteLocation,
  }
}
