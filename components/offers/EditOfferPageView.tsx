import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from '../hooks/useError'
import { useModal } from '../hooks/useModal'
import { useNavigation } from '../hooks/useNavigation'
import { useGetOffer } from './useGetOffer'
import { useBackend } from '@/components/hooks/useBackend'
import { OfferEditParamsType, OfferType } from '@/utils/types/offer'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { EditOfferView } from './EditOfferView'
import { DiscardChangesModal } from '../core/DiscardChangesModal'
import { ActionBar } from '../core/ActionBar'
import { validateOfferInput } from '../neighborhoods/validations'
import { REQUIRED_FIELDS_TOAST_ERROR } from '@/utils/validate'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { showError } = useError()
  const { showModal } = useModal()

  const { history } = useNavigation()
  const backRoute = (history[history.length - 2] ?? '[offerId]').includes(
    '[offerId]'
  )
    ? `/experience/${router.query.offerId}`
    : history[history.length - 2]

  const { offerId } = router.query
  const { offer, isEditable, isUserSteward } = useGetOffer(offerId as string)
  const { useMutate } = useBackend()
  const { trigger: updateOffer } = useMutate(
    offer ? ['OFFER', { externId: `${offer.externId}` }] : null
  )

  const [highlightErrors, setHighlightErrors] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [newValues, setNewValues] = useState<OfferEditParamsType>({})

  useEffect(() => {
    if (offer) {
      setNewValues({
        title: offer?.title ?? undefined,
        description: offer?.description ?? undefined,
        imageIpfsHash: offer?.imageIpfsHash ?? undefined,
        startDate: offer?.startDate ?? undefined,
        endDate: offer?.endDate ?? undefined,
        price: offer?.price ?? undefined,
        priceInterval: offer?.priceInterval ?? undefined,
        applicationUrl: offer?.applicationUrl ?? undefined,
        mediaItems: offer?.mediaItems ?? undefined,
      })
    }
  }, [offer])

  if (!offer || !isEditable) {
    return null
  }

  const handleNext = async () => {
    if (offer?.type && validateOfferInput(offer.type, newValues)) {
      await updateOffer(newValues)
      if (offer.type === OfferType.CabinWeek && !isUserSteward) {
        router.push(`/experience/${offer.externId}`).then()
      } else {
        router.push(`/location/${offer.location.externId}/edit?step=3`).then()
      }
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleBack = () => {
    if (unsavedChanges) {
      showModal(() => <DiscardChangesModal leaveUrl={backRoute} />)
    } else {
      router.push(backRoute).then()
    }
  }

  const handleOnEdit = (updateOfferInput: OfferEditParamsType) => {
    setUnsavedChanges(true)

    setNewValues((prev) => ({
      ...prev,
      ...updateOfferInput,
    }))
  }

  return (
    <SingleColumnLayout
      actionBar={
        <ActionBar
          primaryButton={{
            onClick: handleNext,
            label: 'Save Experience',
          }}
          secondaryButton={{
            onClick: handleBack,
            label: 'Cancel',
          }}
        />
      }
    >
      <EditOfferView
        highlightErrors={highlightErrors}
        updateOfferInput={newValues}
        offer={offer}
        onEdit={handleOnEdit}
      />
    </SingleColumnLayout>
  )
}
