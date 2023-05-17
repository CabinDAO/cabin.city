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
import { useNavigation } from '../hooks/useNavigation'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { offer, ownedByMe } = useGetOffer()
  const [updateOffer] = useUpdateOfferMutation()
  const { history } = useNavigation()
  const backRoute = history[history.length - 2]

  const offerFragment = offer?.rawFragment

  const [updateOfferInput, setUpdateOfferInput] =
    useState<PartialUpdateOfferInput>({
      title: offerFragment?.title,
      description: offerFragment?.description,
    })

  if (!offer || !ownedByMe) {
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
