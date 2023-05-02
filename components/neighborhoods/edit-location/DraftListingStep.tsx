import { ContentCard } from '../../core/ContentCard'
import { H3 } from '../../core/Typography'
import { StepProps } from './location-wizard-configuration'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ActionBar } from '@/components/core/ActionBar'
import { Container, FormContainer, StepIndicator } from './styles'
import styled from 'styled-components'
import { EmptyState } from '@/components/core/EmptyState'
import { Dropdown } from '@/components/core/Dropdown'
import { HorizontalDivider } from '@/components/core/Divider'
import { OfferType, useCreateOfferMutation } from '@/generated/graphql'
import { Button } from '@/components/core/Button'
import { useState } from 'react'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { useRouter } from 'next/router'

export const DraftListingStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const [createOffer] = useCreateOfferMutation()
  const router = useRouter()
  const stepIndicatorText = () => {
    const names = steps.map((step) => step.name)
    const currentStepIndex = names.indexOf(name)
    return `Step ${currentStepIndex + 1} of ${names.length}`
  }

  const [selectedOfferType, setSelectedOfferType] = useState<
    SelectOption | undefined
  >()

  const options = [
    {
      label: 'Colive',
      value: OfferType.PaidColiving,
    },
    {
      label: 'Residency',
      value: OfferType.Residency,
    },
    {
      label: 'Build Week',
      value: OfferType.PaidColiving,
    },
  ]

  const handleCreateOfferClick = async () => {
    if (location && location.locationType && selectedOfferType) {
      const { data: offer } = await createOffer({
        variables: {
          locationType: location.locationType,
          offerType: selectedOfferType.value as OfferType,
          locationId: location._id,
        },
      })

      if (offer) {
        router.push(`/offer/${offer.createOffer._id}/edit`)
      }
    }
  }

  const handleSelectedOption = (option: SelectOption) => {
    setSelectedOfferType(option)
  }

  return (
    <SingleColumnLayout
      actionBar={
        <ActionBar
          primaryButton={{
            onClick: onNext,
            label: 'Next',
          }}
          secondaryButton={{
            onClick: onBack,
            label: 'Back',
          }}
        />
      }
    >
      <TitleCard title="Draft listing" icon="close" iconHref="/profile" />
      <Container>
        <StepIndicator>
          <H3>{name}</H3>
          <H3>{stepIndicatorText()}</H3>
        </StepIndicator>
        <ContainerGroup>
          <ContentCard shape="notch">
            <OfferFormContainer>
              <InputGroup>
                <StyledDropdown
                  label="Choose Offer type"
                  placeholder="Select"
                  onSelect={handleSelectedOption}
                  options={options}
                  selectedOption={selectedOfferType}
                />
                <Button variant="secondary" onClick={handleCreateOfferClick}>
                  Create Offer
                </Button>
              </InputGroup>
              <HorizontalDivider />
            </OfferFormContainer>
          </ContentCard>
          <StyledEmptyState
            icon="file-document"
            title="No offers yet"
            description="Create new offers and manage them from here"
          />
        </ContainerGroup>
      </Container>
    </SingleColumnLayout>
  )
}

const ContainerGroup = styled.div`
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
  width: 100%;
`

const StyledEmptyState = styled(EmptyState)`
  min-height: 34.6rem;
`

const OfferFormContainer = styled(FormContainer)`
  align-items: flex-start;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: flex-end;
  width: 55%;
`

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`
