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
  useDeleteOfferMutation,
  ProfileRoleConstraintInput,
} from '@/generated/graphql'
import { ApplicationLink } from './ApplicationLink'
import { MAX_OFFER_TITLE_LENGTH } from '../offer-constants'
import { useState } from 'react'
import { Pricing } from './Pricing'
import { Button } from '@/components/core/Button'
import { useModal } from '@/components/hooks/useModal'
import { DeleteConfirmationModal } from '@/components/core/DeleteConfirmationModal'
import Icon from '@/components/core/Icon'
import { useRouter } from 'next/router'
import { validateTitle } from '@/components/neighborhoods/validations'
import { REQUIRED_FIELD_ERROR, truthyString } from '@/utils/validate'
import { defaultSlateValue } from '@/components/core/slate/slate-utils'

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
  const { showModal } = useModal()
  const [deleteOffer] = useDeleteOfferMutation()
  const router = useRouter()

  const handleDelete = () => {
    showModal(() => (
      <DeleteConfirmationModal
        entityName="offer"
        onDelete={async () => {
          await deleteOffer({ variables: { id: offer._id } })
          router.push(`/location/${offer.location._id}/edit?step=3`)
        }}
      />
    ))
  }

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

  return (
    <Container>
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
      <HorizontalDivider />
      <DeleteButton
        startAdornment={<Icon name="trash" size={1.2} />}
        variant="tertiary"
        onClick={handleDelete}
      >
        Delete Offer
      </DeleteButton>
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

const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.red700};
  --icon-color: ${({ theme }) => theme.colors.red700};
  border: 1px solid ${({ theme }) => theme.colors.red700};
`
