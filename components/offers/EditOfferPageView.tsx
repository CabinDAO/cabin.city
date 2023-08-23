import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetOffer } from './useGetOffer'
import { EditOfferView } from './EditOfferView'
import { ActionBar } from '../core/ActionBar'
import {
  OfferPriceUnit,
  OfferType,
  UpdateOfferInput,
  useUpdateOfferMutation,
} from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useNavigation } from '../hooks/useNavigation'
import { validateOfferInput } from '../neighborhoods/validations'
import { useError } from '../hooks/useError'
import { REQUIRED_FIELDS_TOAST_ERROR } from '@/utils/validate'
import { useModal } from '../hooks/useModal'
import { DiscardChangesModal } from '../core/DiscardChangesModal'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { offerId } = router.query
  const { offer, isEditable, isUserCaretaker } = useGetOffer(`${offerId}`)
  const [updateOffer] = useUpdateOfferMutation()
  const { history } = useNavigation()
  const backRoute = history[history.length - 2]

  const offerFragment = offer?.rawFragment
  const [highlightErrors, setHighlightErrors] = useState(false)
  const { showError } = useError()
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [updateOfferInput, setUpdateOfferInput] = useState<UpdateOfferInput>({})
  const { showModal } = useModal()

  useEffect(() => {
    if (offerFragment) {
      setUpdateOfferInput({
        title: offerFragment.title ?? '',
        imageIpfsHash: offerFragment.imageIpfsHash ?? '',
        description: offerFragment.description,
        startDate: offerFragment.startDate ?? new Date(),
        endDate: offerFragment.endDate ?? new Date(),
        price: {
          amountCents: offerFragment.price?.amountCents ?? 0,
          unit: offerFragment.price?.unit ?? OfferPriceUnit.FlatFee,
        },
        applicationUrl: offerFragment.applicationUrl,
      })
    }
  }, [offerFragment])

  if (!offer || !isEditable) {
    return null
  }

  const handleNext = async () => {
    if (
      offer?.offerType &&
      validateOfferInput(
        { ...offerFragment, ...updateOfferInput },
        offer.offerType
      )
    ) {
      await updateOffer({
        variables: {
          offerId: offer._id,
          data: updateOfferInput,
        },
      })
      if (offer.offerType === OfferType.CabinWeek && !isUserCaretaker) {
        router.push(`/experience/${offer._id}`)
      } else {
        router.push(`/location/${offer.location._id}/edit?step=3`)
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
      router.push(backRoute)
    }
  }

  const handleOnEdit = (updateOfferInput: UpdateOfferInput) => {
    setUnsavedChanges(true)

    setUpdateOfferInput((prev) => ({
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
        updateOfferInput={updateOfferInput}
        offer={offer.rawFragment}
        onEdit={handleOnEdit}
      />
    </SingleColumnLayout>
  )
}
