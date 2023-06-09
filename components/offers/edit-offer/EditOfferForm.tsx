import { HorizontalDivider } from '@/components/core/Divider'
import { InputText } from '@/components/core/InputText'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { Descendant } from 'slate'
import styled from 'styled-components'
import { Availability } from './Availability'
import { Eligibility } from './Eligibility'
import {
  OfferFragment,
  OfferType,
  UpdateOfferInput,
  ProfileRoleConstraintInput,
} from '@/generated/graphql'
import { ApplicationLink } from './ApplicationLink'
import {
  MAX_OFFER_TITLE_LENGTH,
  PHOTO_UPLOAD_INSTRUCTIONS,
} from '../offer-constants'
import { useState } from 'react'
import { Pricing } from './Pricing'
import { validateTitle } from '@/components/neighborhoods/validations'
import {
  REQUIRED_FIELD_ERROR,
  REQUIRED_SECTION_ERROR,
  truthyString,
} from '@/utils/validate'
import { defaultSlateValue } from '@/components/core/slate/slate-utils'
import { Body2, H3 } from '@/components/core/Typography'
import { OfferTypeSummary } from './OfferTypeSummary'
import { GalleryUploadSection } from '@/components/core/GalleryUploadSection'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'

interface EditOfferFormProps {
  offer: OfferFragment
  onEdit: (updateOfferInput: UpdateOfferInput) => void
  updateOfferInput: UpdateOfferInput
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
  const [eligibilityChecked, setEligibilityChecked] = useState(false)

  const offerField = (field: keyof UpdateOfferInput) => {
    return updateOfferInput[field] || offer[field]
  }

  const resolveEligibilityChecked = () => {
    return (
      !!offerField('citizenshipRequired') ||
      !!offerField('minimunCabinBalance') ||
      offerField('profileRoleConstraints')?.length > 0 ||
      eligibilityChecked
    )
  }

  const handleEligibilityChange = (checked: boolean) => {
    if (checked) {
      setEligibilityChecked(true)
    } else {
      onEdit({
        citizenshipRequired: false,
        minimunCabinBalance: null,
        profileRoleConstraints: [],
      })
      setEligibilityChecked(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ title: e.target.value.slice(0, MAX_OFFER_TITLE_LENGTH) })
  }

  const handleAvailabilityChange = (startDate: string, endDate: string) => {
    onEdit({ startDate, endDate })
  }
  const slateProps = offerField('description')
    ? { value: JSON.parse(offerField('description')) }
    : {}

  const handleProfileRoleConstraintsChange = (
    profileRoleConstraints: ProfileRoleConstraintInput[]
  ) => {
    onEdit({ profileRoleConstraints })
  }

  const titleValidation = validateTitle(updateOfferInput.title)

  const emptyDescription =
    !truthyString(updateOfferInput.description) ||
    updateOfferInput.description === JSON.stringify(defaultSlateValue)

  const handleFilesUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    setUploadingBanner(false)
    onEdit({
      imageIpfsHash: fileNameIpfsHashMap[Object.keys(fileNameIpfsHashMap)[0]],
    })
  }

  return (
    <Container>
      <Pair>
        <H3>Offer Type</H3>
        <OfferTypeSummary offerType={offer.offerType} />
      </Pair>
      <HorizontalDivider />
      <GalleryUploadSection
        onStartUploading={() => setUploadingBanner(true)}
        ipfsHashList={
          updateOfferInput.imageIpfsHash ? [updateOfferInput.imageIpfsHash] : []
        }
        uploading={uploadingBanner}
        isBanner
        instructions={PHOTO_UPLOAD_INSTRUCTIONS}
        title="banner image"
        onFilesUploaded={handleFilesUploaded}
        errorMessage={
          highlightErrors && !updateOfferInput.imageIpfsHash
            ? REQUIRED_SECTION_ERROR
            : undefined
        }
      />
      <HorizontalDivider />
      <Pair>
        <H3>Offer Details</H3>
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
      <Availability
        onEdit={handleAvailabilityChange}
        defaultStartDate={offerField('startDate')}
        defaultEndDate={offerField('endDate')}
      />
      <HorizontalDivider />
      {offer.offerType === OfferType.PaidColiving ? (
        <Pricing
          highlightErrors={highlightErrors}
          price={updateOfferInput.price}
          onPriceChange={(price) => {
            onEdit({ price })
          }}
        />
      ) : (
        <Eligibility
          checked={resolveEligibilityChecked()}
          onProfileRoleConstraintsChange={handleProfileRoleConstraintsChange}
          onEligibilityChange={handleEligibilityChange}
          profileRoleConstraints={offerField('profileRoleConstraints')}
          minimumCabinBalance={offerField('minimunCabinBalance')}
          citizenshipRequired={offerField('citizenshipRequired')}
          onCitizenshipRequiredChange={(citizenshipRequired) => {
            onEdit({ citizenshipRequired })
          }}
          onMinimumCabinBalanceChange={(minimunCabinBalance) => {
            onEdit({ minimunCabinBalance })
          }}
        />
      )}
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
