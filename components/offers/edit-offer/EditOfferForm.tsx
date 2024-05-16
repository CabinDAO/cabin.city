import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import {
  OfferEditParamsType,
  OfferFragment,
  OfferType,
} from '@/utils/types/offer'
import {
  MAX_OFFER_TITLE_LENGTH,
  PHOTO_UPLOAD_INSTRUCTIONS,
} from '../offer-constants'
import {
  PHOTO_REQUIRED_ERROR,
  REQUIRED_FIELD_ERROR,
  REQUIRED_SECTION_ERROR,
  truthyString,
} from '@/utils/validate'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import styled from 'styled-components'
import { Descendant } from 'slate'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { defaultSlateValue } from '@/components/core/slate/slate-utils'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { HorizontalDivider } from '@/components/core/Divider'
import { InputText } from '@/components/core/InputText'
import { Body2, H3 } from '@/components/core/Typography'
import { GalleryUploadSection } from '@/components/core/GalleryUploadSection'
import { DeleteConfirmationModal } from '@/components/core/DeleteConfirmationModal'
import { validateTitle } from '@/components/neighborhoods/validations'
import { Availability } from './Availability'
import { ApplicationLink } from './ApplicationLink'
import { Pricing } from './Pricing'
import { useBackend } from '@/components/hooks/useBackend'

interface EditOfferFormProps {
  offer: OfferFragment
  updateOfferInput: OfferEditParamsType
  onEdit: (updateOfferInput: OfferEditParamsType) => void
  highlightErrors?: boolean
}

export const EditOfferForm = ({
  offer,
  updateOfferInput,
  onEdit,
  highlightErrors,
}: EditOfferFormProps) => {
  const handleEditorChange = (val: Descendant[]) => {
    onEdit({ description: JSON.stringify(val) })
  }
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ title: e.target.value.slice(0, MAX_OFFER_TITLE_LENGTH) })
  }

  const handleAvailabilityChange = (startDate: string, endDate: string) => {
    onEdit({ startDate, endDate })
  }

  const description = updateOfferInput.description || offer.description
  const slateProps = description ? { value: JSON.parse(description) } : {}

  const titleValidation = validateTitle(updateOfferInput.title)

  const emptyDescription =
    !truthyString(updateOfferInput.description) ||
    updateOfferInput.description === JSON.stringify(defaultSlateValue)

  const handleBannerUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploadingBanner(false)
    onEdit({
      imageIpfsHash: fileNameIpfsHashMap[Object.keys(fileNameIpfsHashMap)[0]],
    })
  }

  const handleGalleryUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploadingGallery(false)
    const newMediaItems = {
      mediaItems: (updateOfferInput.mediaItems ?? []).concat({
        ipfsHash: fileNameIpfsHashMap[Object.keys(fileNameIpfsHashMap)[0]],
      }),
    }
    console.log('old update offer input', updateOfferInput)
    console.log('new media items', newMediaItems)
    onEdit(newMediaItems)
  }

  const deleteByIpfsHash = (ipfsHash: string | undefined) => {
    const foundCreatedMediaItem = updateOfferInput.mediaItems?.find(
      (mediaItem) => mediaItem?.ipfsHash === ipfsHash
    )

    if (foundCreatedMediaItem) {
      onEdit({
        mediaItems: updateOfferInput.mediaItems?.filter(
          (mediaItem) => mediaItem?.ipfsHash !== foundCreatedMediaItem?.ipfsHash
        ),
      })
    }
  }

  return (
    <Container>
      <GalleryUploadSection
        onStartUploading={() => setUploadingBanner(true)}
        ipfsHashList={
          updateOfferInput.imageIpfsHash ? [updateOfferInput.imageIpfsHash] : []
        }
        uploading={uploadingBanner}
        isBanner
        instructions={PHOTO_UPLOAD_INSTRUCTIONS}
        title="banner image"
        onFilesUploaded={handleBannerUploaded}
        errorMessage={
          highlightErrors && !updateOfferInput.imageIpfsHash
            ? REQUIRED_SECTION_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <GalleryUploadSection
        onStartUploading={() => setUploadingGallery(true)}
        uploading={uploadingGallery}
        onFilesUploaded={handleGalleryUploaded}
        onDelete={deleteByIpfsHash}
        title="image gallery"
        instructions="Share images of the available sleeping arrangements at your place to provide potential guests with an idea of where they can rest. Choose JPG or PNG file formats no larger than 5 MB."
        ipfsHashList={offer.mediaItems?.map((item) => item.ipfsHash) || []}
        errorMessage={
          highlightErrors && !updateOfferInput.mediaItems?.length
            ? PHOTO_REQUIRED_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <Pair>
        <H3>Details</H3>
        <OpaqueBody2>
          Promote your location and set expectations for the experience using
          the fields provided.
        </OpaqueBody2>
      </Pair>
      <InputText
        label="Title"
        required
        placeholder="Name"
        helperText={`${
          updateOfferInput.title?.length || 0
        } / ${MAX_OFFER_TITLE_LENGTH}`}
        value={updateOfferInput.title ?? ''}
        onChange={handleTitleChange}
        error={highlightErrors && !titleValidation.valid}
        errorMessage={titleValidation.error}
      />
      <EditorContainer>
        {offer && (
          <SlateEditor
            label="Description *"
            placeholder="Share a description of your offer here"
            onChange={handleEditorChange}
            {...slateProps}
            error={highlightErrors && emptyDescription}
            errorMessage={REQUIRED_FIELD_ERROR}
          />
        )}
      </EditorContainer>
      <HorizontalDivider />
      {/*TODO: make dates optional*/}
      <Availability
        onEdit={handleAvailabilityChange}
        label={offer.type === OfferType.CabinWeek ? 'Date Range' : undefined}
        defaultStartDate={updateOfferInput.startDate || offer.startDate}
        defaultEndDate={updateOfferInput.endDate || offer.endDate}
      />
      <HorizontalDivider />
      <Pricing
        highlightErrors={highlightErrors}
        price={updateOfferInput.price}
        onPriceChange={(price, priceInterval) => {
          onEdit({ price, priceInterval })
        }}
      />
      <HorizontalDivider />
      <ApplicationLink
        onEdit={(url) => {
          onEdit({ applicationUrl: url })
        }}
        url={updateOfferInput.applicationUrl ?? ''}
        error={
          highlightErrors && !truthyString(updateOfferInput.applicationUrl)
        }
        errorMessage={REQUIRED_FIELD_ERROR}
      />
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

const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.red700};
  --icon-color: ${({ theme }) => theme.colors.red700};
  border: 1px solid ${({ theme }) => theme.colors.red700};
`
