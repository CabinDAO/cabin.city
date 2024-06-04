import { useRouter } from 'next/router'
import { useModal } from './useModal'
import { useBackend } from '@/components/hooks/useBackend'
import { ActionConfirmationModal } from '@/components/core/ActionConfirmationModal'

export const useLocationActions = (
  locationExternId: string,
  afterDelete: () => Promise<unknown>
) => {
  const router = useRouter()
  const { showModal } = useModal()
  const { useDelete } = useBackend()
  const { trigger } = useDelete(['LOCATION', { externId: locationExternId }])

  const deleteLocation = () => {
    showModal(() => (
      <ActionConfirmationModal
        title={'Delete Listing'}
        text={'Are you sure you want to delete this listing?'}
        confirmText={'Delete'}
        onConfirm={async () => {
          await trigger({})
          await afterDelete()
        }}
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
