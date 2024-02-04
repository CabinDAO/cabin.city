import { useRouter } from 'next/router'
import { useModal } from './useModal'
import { useBackend } from '@/components/hooks/useBackend'
import { DeleteConfirmationModal } from '../core/DeleteConfirmationModal'

export const useLocationActions = (
  locationExternId: string,
  afterDelete: () => Promise<any>
) => {
  const router = useRouter()
  const { showModal } = useModal()
  const { useDelete } = useBackend()
  const { trigger } = useDelete(['LOCATION', { externId: locationExternId }])

  const deleteLocation = () => {
    showModal(() => (
      <DeleteConfirmationModal
        onDelete={async () => {
          await trigger({})
          await afterDelete()
        }}
        entityName="listing"
      />
    ))
  }

  const editLocation = () => {
    router.push(`/location/${locationExternId}/edit`)
  }

  return {
    editLocation,
    deleteLocation,
  }
}
