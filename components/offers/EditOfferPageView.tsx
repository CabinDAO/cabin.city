import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetOffer } from './useGetOffer'
import { EditOfferView } from './EditOfferView'
import { ActionBar } from '../core/ActionBar'
import {
  PartialUpdateOfferInput,
  useUpdateOfferMutation,
} from '@/generated/graphql'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { offer } = useGetOffer()
  const backRoute = `/location/${offer?.location._id}/edit?step=3`
  const [updateOffer] = useUpdateOfferMutation()

  const offerFragment = offer?.rawFragment

  const [updateOfferInput, setUpdateOfferInput] =
    useState<PartialUpdateOfferInput>({
      title: offerFragment?.title,
      description: offerFragment?.description,
    })

  if (!offer) {
    return null
  }

  const handleNext = async () => {
    await updateOffer({
      variables: {
        offerId: offer._id,
        data: updateOfferInput,
      },
    })
    router.push(backRoute)
  }

  const handleBack = () => {
    router.push(backRoute)
  }

  const handleOnEdit = (updateOfferInput: PartialUpdateOfferInput) => {
    setUpdateOfferInput((prev) => ({ ...prev, ...updateOfferInput }))
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
        updateOfferInput={updateOfferInput}
        offer={offer.rawFragment}
        onEdit={handleOnEdit}
      />
    </SingleColumnLayout>
  )
}
