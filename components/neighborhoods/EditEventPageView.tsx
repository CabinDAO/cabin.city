import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from '../hooks/useError'
import { useModal } from '../hooks/useModal'
import { useBackend } from '@/components/hooks/useBackend'
import { EventEditParamsType, EventGetResponse } from '@/utils/types/event'
import { REQUIRED_FIELDS_TOAST_ERROR } from '@/utils/validate'
import { validateEventInput } from '../neighborhoods/validations'
import styled from 'styled-components'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { DiscardChangesModal } from '@/components/core/DiscardChangesModal'
import { ActionBar } from '@/components/core/ActionBar'
import { TitleCard } from '@/components/core/TitleCard'
import { EditEventForm } from '@/components/neighborhoods/EditEventForm'
import { ContentCard } from '@/components/core/ContentCard'
import { useProfile } from '@/components/auth/useProfile'
import { canEditLocation } from '@/lib/permissions'

export const EditEventPageView = () => {
  const router = useRouter()
  const { showError } = useError()
  const { showModal } = useModal()

  const { user } = useProfile()
  const { useGet } = useBackend()

  const { eventId } = router.query
  const { data } = useGet<EventGetResponse>(
    eventId ? ['EVENT', { externId: eventId as string }] : null
  )
  const event = data && 'event' in data ? data.event : null

  const isEditable = !!event && canEditLocation(user, event.location)

  const { useMutate, useDelete } = useBackend()
  const { trigger: updateEvent } = useMutate(
    event ? ['EVENT', { externId: `${event.externId}` }] : null
  )
  const { trigger: deleteEvent } = useDelete(
    event ? ['EVENT', { externId: `${event.externId}` }] : null
  )

  const [highlightErrors, setHighlightErrors] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [newValues, setNewValues] = useState<EventEditParamsType>({})

  useEffect(() => {
    if (event) {
      setNewValues({
        title: event?.title ?? undefined,
        description: event?.description ?? undefined,
        imageIpfsHash: event?.imageIpfsHash ?? undefined,
        startDate: event?.startDate ?? undefined,
        endDate: event?.endDate ?? undefined,
        price: event?.price ?? undefined,
        priceInterval: event?.priceInterval ?? undefined,
        applicationUrl: event?.applicationUrl ?? undefined,
        mediaItems: event?.mediaItems ?? undefined,
      })
    }
  }, [event])

  if (!event || !isEditable) {
    return null
  }

  const handleSave = async () => {
    if (event.type && validateEventInput(event.type, newValues)) {
      await updateEvent(newValues)
      router.push(`/location/${event.location.externId}`).then()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleOnEdit = (updateEventInput: EventEditParamsType) => {
    setUnsavedChanges(true)

    setNewValues((prev) => ({
      ...prev,
      ...updateEventInput,
    }))
  }

  const handleBack = () => {
    const url = `/location/${event.location.externId}`
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
          <EditEventForm
            highlightErrors={highlightErrors}
            updateEventInput={newValues}
            event={event}
            onEdit={handleOnEdit}
          />
        </Contents>
        <ActionBar
          primaryButton={{
            onClick: handleSave,
            label: 'Save',
          }}
          secondaryButton={{
            onClick: handleBack,
            label: 'Cancel',
          }}
          trashButton={{
            onClick: async () => {
              await deleteEvent({})
              router.push(`/location/${event.location.externId}`).then()
            },
            label: 'event',
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
