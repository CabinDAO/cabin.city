import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from '../hooks/useError'
import { useModal } from '../hooks/useModal'
import { useGetOffer } from './useGetOffer'
import { useBackend } from '@/components/hooks/useBackend'
import { OfferEditParamsType } from '@/utils/types/offer'
import { REQUIRED_FIELDS_TOAST_ERROR } from '@/utils/validate'
import { validateOfferInput } from '../neighborhoods/validations'
import styled from 'styled-components'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { DiscardChangesModal } from '../core/DiscardChangesModal'
import { ActionBar } from '../core/ActionBar'
import { TitleCard } from '@/components/core/TitleCard'
import { EditOfferForm } from '@/components/offers/edit-offer/EditOfferForm'
import { ContentCard } from '@/components/core/ContentCard'

export const EditOfferPageView = () => {
  const router = useRouter()
  const { showError } = useError()
  const { showModal } = useModal()

  const { offerId } = router.query
  const { offer, isEditable } = useGetOffer(offerId as string)

  const { useMutate, useDelete } = useBackend()
  const { trigger: updateOffer } = useMutate(
    offer ? ['OFFER', { externId: `${offer.externId}` }] : null
  )
  const { trigger: deleteOffer } = useDelete(
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
      router.push(`/experience/${offer.externId}`).then()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleOnEdit = (updateOfferInput: OfferEditParamsType) => {
    setUnsavedChanges(true)

    setNewValues((prev) => ({
      ...prev,
      ...updateOfferInput,
    }))
  }

  const handleBack = () => {
    const url = `/location/${offer.location.externId}`
    if (unsavedChanges) {
      showModal(() => <DiscardChangesModal leaveUrl={url} />)
    } else {
      router.push(url).then()
    }
  }

  return (
    <SingleColumnLayout>
      <TitleCard title="Edit Event" icon="close" onIconClick={handleBack} />
      <StyledContentCard shape="notch">
        <Contents>
          <EditOfferForm
            highlightErrors={highlightErrors}
            updateOfferInput={newValues}
            offer={offer}
            onEdit={handleOnEdit}
          />
        </Contents>
        <ActionBar
          primaryButton={{
            onClick: handleNext,
            label: 'Save Experience',
          }}
          secondaryButton={{
            onClick: handleBack,
            label: 'Cancel',
          }}
          trashButton={{
            onClick: async () => {
              await deleteOffer({})
              router.push(`/location/${offer.location.externId}`).then()
            },
            label: 'experience',
          }}
        />
      </StyledContentCard>
    </SingleColumnLayout>
  )
}

const StyledContentCard = styled(ContentCard)`
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const Contents = styled.div`
  padding: 3.2rem 2.4rem;
`
