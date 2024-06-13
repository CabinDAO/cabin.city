import React, { useState } from 'react'
import { EventEditParamsType, EventFragment } from '@/utils/types/event'
import { REQUIRED_FIELD_ERROR, REQUIRED_SECTION_ERROR } from '@/utils/validate'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import styled from 'styled-components'
import { Descendant } from 'slate'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { isEmptyEditoryValue } from '@/components/core/slate/slate-utils'
import { HorizontalDivider } from '@/components/core/Divider'
import { InputText } from '@/components/core/InputText'
import { Body2, H3 } from '@/components/core/Typography'
import { GalleryUploadSection } from '@/components/core/GalleryUploadSection'
import {
  truthyString,
  validateTitle,
} from '@/components/neighborhoods/validations'
import { DateSelect } from '@/components/core/DateSelect'
import { getYear } from 'date-fns'

const maxTitleLength = 48

export const EditEventForm = ({
  event,
  updateEventInput,
  onEdit,
  highlightErrors,
}: {
  event: EventFragment
  updateEventInput: EventEditParamsType
  onEdit: (updateEventInput: EventEditParamsType) => void
  highlightErrors?: boolean
}) => {
  const handleEditorChange = (val: Descendant[]) => {
    onEdit({ description: JSON.stringify(val) })
  }
  const [uploadingBanner, setUploadingBanner] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ title: e.target.value.slice(0, maxTitleLength) })
  }

  const [dateRange, setDateRange] = useState<{
    start: Date
    end: Date
  }>({
    start: new Date(
      updateEventInput.startDate || event.startDate || new Date()
    ),
    end: new Date(updateEventInput.endDate || event.endDate || new Date()),
  })
  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) {
      return
    }
    const newRange = { start: date, end: dateRange.end }
    if (date > dateRange.end && getYear(date) > 999) {
      newRange.end = date
    }
    setDateRange(newRange)
    onEdit({
      startDate: newRange.start.toISOString(),
      endDate: newRange.end.toISOString(),
    })
  }
  const handleEndDateChange = (date: Date | undefined) => {
    if (!date) {
      return
    }
    const newRange = { start: dateRange.start, end: date }
    if (date < dateRange.start && getYear(date) > 999) {
      newRange.start = date
    }
    setDateRange(newRange)
    onEdit({
      startDate: newRange.start.toISOString(),
      endDate: newRange.end.toISOString(),
    })
  }

  const handleExternalLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value && !value.startsWith('http')) {
      value = `https://${value}`
    }
    onEdit({ applicationUrl: value })
  }

  const description = updateEventInput.description || event.description
  const slateProps = description ? { value: JSON.parse(description) } : {}

  const titleValidation = validateTitle(updateEventInput.title)

  const handleBannerUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploadingBanner(false)
    onEdit({
      imageIpfsHash: fileNameIpfsHashMap[Object.keys(fileNameIpfsHashMap)[0]],
    })
  }

  return (
    <Container>
      <GalleryUploadSection
        onStartUploading={() => setUploadingBanner(true)}
        ipfsHashList={
          updateEventInput.imageIpfsHash ? [updateEventInput.imageIpfsHash] : []
        }
        uploading={uploadingBanner}
        instructions="Choose a square JPG or PNG no larger than 5 MB."
        title="Image"
        onFilesUploaded={handleBannerUploaded}
        onDelete={() => {
          onEdit({ imageIpfsHash: '' })
        }}
        errorMessage={
          highlightErrors && !updateEventInput.imageIpfsHash
            ? REQUIRED_SECTION_ERROR
            : undefined
        }
      />

      <HorizontalDivider />

      <Pair>
        <H3>Details</H3>
        <OpaqueBody2>
          Promote your neighborhood and set expectations for the event using the
          fields provided.
        </OpaqueBody2>
      </Pair>

      <InputText
        label="Title"
        required
        placeholder="Name"
        helperText={`${
          updateEventInput.title?.length || 0
        } / ${maxTitleLength}`}
        value={updateEventInput.title ?? ''}
        onChange={handleTitleChange}
        error={highlightErrors && !titleValidation.valid}
        errorMessage={titleValidation.error}
      />

      <EditorContainer>
        <SlateEditor
          label="Description *"
          placeholder="Describe your event"
          onChange={handleEditorChange}
          {...slateProps}
          error={
            highlightErrors && isEmptyEditoryValue(updateEventInput.description)
              ? REQUIRED_FIELD_ERROR
              : null
          }
        />
      </EditorContainer>

      <HorizontalDivider />

      <Pair>
        <H3>Dates</H3>
        <DateRange>
          <DateSelect
            onDateChange={handleStartDateChange}
            label="Start *"
            startDate={new Date()}
            value={dateRange.start}
          />
          <DateSelect
            onDateChange={handleEndDateChange}
            label="End *"
            startDate={dateRange.start}
            value={dateRange.end}
          />
        </DateRange>
      </Pair>

      <HorizontalDivider />

      <Pair>
        <H3>External Link</H3>
        <ExternalURLField>
          <OpaqueBody2>
            How you would like people to RSVP for this event? Do you have a Luma
            or Partiful with more information?
          </OpaqueBody2>
          <InputText
            label="URL"
            required
            placeholder="URL"
            onChange={handleExternalLinkChange}
            value={updateEventInput.applicationUrl ?? ''}
            error={
              highlightErrors && !truthyString(updateEventInput.applicationUrl)
            }
            errorMessage={REQUIRED_FIELD_ERROR}
          />
        </ExternalURLField>
      </Pair>

      <HorizontalDivider />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;
  align-items: flex-start;
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Pair = styled.div`
  display: grid;
  width: 100%;
  justify-items: start;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 0;
  }
`

const OpaqueBody2 = styled(Body2)`
  opacity: 0.75;
`

const ExternalURLField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const DateRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`
