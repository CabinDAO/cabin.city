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
  PartialUpdateOfferInput,
  ProfileRoleConstraint,
} from '@/generated/graphql'
import { ApplicationLink } from './ApplicationLink'
import { MAX_OFFER_TITLE_LENGTH } from '../offer-constants'
import { useState } from 'react'
import { Pricing } from './Pricing'

interface EditOfferFormProps {
  offer: OfferFragment
  onEdit: (updateOfferInput: PartialUpdateOfferInput) => void
  updateOfferInput: PartialUpdateOfferInput
}

export const EditOfferForm = ({
  offer,
  updateOfferInput,
  onEdit,
}: EditOfferFormProps) => {
  const handleEditorChange = (val: Descendant[]) => {
    onEdit({ description: JSON.stringify(val) })
  }

  const [eligibilityChecked, setEligibilityChecked] = useState(false)

  const offerField = (field: keyof PartialUpdateOfferInput) => {
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
    if (e.target.value.length <= MAX_OFFER_TITLE_LENGTH) {
      onEdit({ title: e.target.value })
    }
  }

  const handleAvailabilityChange = (startDate: string, endDate: string) => {
    onEdit({ startDate, endDate })
  }
  const slateProps = offerField('description')
    ? { value: JSON.parse(offerField('description')) }
    : {}

  const handleProfileRoleConstraintsChange = (
    profileRoleConstraints: ProfileRoleConstraint[]
  ) => {
    onEdit({ profileRoleConstraints })
  }

  return (
    <Container>
      <InputText
        label="Title"
        placeholder="Name"
        helperText={`${
          offerField('title')?.length || 0
        } / ${MAX_OFFER_TITLE_LENGTH}`}
        value={offerField('title')}
        onChange={handleTitleChange}
      />
      <EditorContainer>
        {offer && (
          <SlateEditor
            placeholder="Share a description of your offer here"
            onChange={handleEditorChange}
            {...slateProps}
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
          price={offerField('price')}
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
        url={offerField('applicationUrl')}
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
