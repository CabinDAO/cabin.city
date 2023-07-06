import styled from 'styled-components'
import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { EditOfferForm } from './edit-offer/EditOfferForm'
import { OfferFragment, UpdateOfferInput } from '@/generated/graphql'
import { useState } from 'react'
import { useModal } from '../hooks/useModal'
import { useRouter } from 'next/router'
import { DiscardChangesModal } from '../core/DiscardChangesModal'

interface EditOfferViewProps {
  offer: OfferFragment
  updateOfferInput: UpdateOfferInput
  onEdit: (updateOfferInput: UpdateOfferInput) => void
  highlightErrors?: boolean
}

export const EditOfferView = ({
  offer,
  onEdit,
  updateOfferInput,
  highlightErrors,
}: EditOfferViewProps) => {
  const locationId = offer.location._id
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const { showModal } = useModal()
  const router = useRouter()

  const handleEdit = (updateOfferInput: UpdateOfferInput) => {
    setUnsavedChanges(true)
    onEdit(updateOfferInput)
  }

  const handleBack = () => {
    const url = `/location/${locationId}/edit?step=3`
    if (unsavedChanges) {
      showModal(() => <DiscardChangesModal leaveUrl={url} />)
    } else {
      router.push(url)
    }
  }

  return (
    <>
      <TitleCard
        title="Edit Experience"
        icon="close"
        iconOnClick={handleBack}
      />
      <StyledContentCard shape="notch">
        <EditOfferForm
          highlightErrors={highlightErrors}
          updateOfferInput={updateOfferInput}
          offer={offer}
          onEdit={handleEdit}
        />
      </StyledContentCard>
    </>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
  gap: 2.4rem;
  flex-direction: column;
  margin-bottom: 4.8rem;
`
