import { useState } from 'react'
import { useRouter } from 'next/router'
import { useModal } from '../hooks/useModal'
import { OfferEditParamsType, OfferFragment } from '@/utils/types/offer'
import styled from 'styled-components'
import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { EditOfferForm } from './edit-offer/EditOfferForm'
import { DiscardChangesModal } from '../core/DiscardChangesModal'

interface EditOfferViewProps {
  offer: OfferFragment
  updateOfferInput: OfferEditParamsType
  onEdit: (updateOfferInput: OfferEditParamsType) => void
  highlightErrors?: boolean
}

export const EditOfferView = ({
  offer,
  onEdit,
  updateOfferInput,
  highlightErrors,
}: EditOfferViewProps) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const { showModal } = useModal()
  const router = useRouter()

  const handleEdit = (updateOfferInput: OfferEditParamsType) => {
    setUnsavedChanges(true)
    onEdit(updateOfferInput)
  }

  const handleBack = () => {
    const url = `/location/${offer.location.externId}/edit?step=3`
    if (unsavedChanges) {
      showModal(() => <DiscardChangesModal leaveUrl={url} />)
    } else {
      router.push(url).then()
    }
  }

  return (
    <>
      <TitleCard
        title="Edit Experience"
        icon="close"
        onIconClick={handleBack}
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
