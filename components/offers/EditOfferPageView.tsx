import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetOffer } from './useGetOffer'
import { EditOfferView } from './EditOfferView'
import { ActionBar } from '../core/ActionBar'
import {
  OfferPriceUnit,
  UpdateOfferInput,
  useUpdateOfferMutation,
} from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useNavigation } from '../hooks/useNavigation'
import { validateOfferInput } from '../neighborhoods/validations'
import { useError } from '../hooks/useError'
import { REQUIRED_FIELDS_TOAST_ERROR } from '@/utils/validate'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { offer, ownedByMe } = useGetOffer()
  const [updateOffer] = useUpdateOfferMutation()
  const { history } = useNavigation()
  const backRoute = history[history.length - 2]

  const offerFragment = offer?.rawFragment
  const [highlightErrors, setHighlightErrors] = useState(false)
  const { showError } = useError()

  const [updateOfferInput, setUpdateOfferInput] = useState<UpdateOfferInput>({})

  useEffect(() => {
    if (offerFragment) {
      setUpdateOfferInput({
        title: offerFragment.title ?? '',
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

  if (!offer || !ownedByMe) {
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
      router.push(`/location/${offer.location._id}/edit?step=3`)
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleBack = () => {
    router.push(backRoute)
  }

  const handleOnEdit = (updateOfferInput: UpdateOfferInput) => {
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
            label: 'Save Offer',
          }}
          secondaryButton={{
            onClick: handleBack,
            label: 'Back',
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
