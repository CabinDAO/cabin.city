import { ContentCard } from '../../core/ContentCard'
import { H3, Overline } from '../../core/Typography'
import { StepProps } from './location-wizard-configuration'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ActionBar } from '@/components/core/ActionBar'
import { Container, FormContainer, StepIndicator } from './styles'
import styled from 'styled-components'
import { EmptyState } from '@/components/core/EmptyState'
import { Dropdown } from '@/components/core/Dropdown'
import { HorizontalDivider } from '@/components/core/Divider'
import {
  LocationType,
  OfferType,
  useCreateOfferMutation,
} from '@/generated/graphql'
import { Button } from '@/components/core/Button'
import { useState } from 'react'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { useRouter } from 'next/router'
import { allOfferInfos } from '@/utils/offer'
import { isNotNull } from '@/lib/data'
import { LocationOffersList } from '@/components/offers/edit-offer/LocationOffersList'
import { OfferTypesDescriptionList } from '@/components/offers/OfferTypeExplanation'
import { AppLink } from '@/components/core/AppLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const OffersStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const [createOffer] = useCreateOfferMutation()
  const router = useRouter()
  const { created } = router.query
  const stepTitle = created ? 'Draft listing' : 'Edit listing'
  const stepIndicatorText = () => {
    const names = steps.map((step) => step.name)
    const currentStepIndex = names.indexOf(name)
    return `Step ${currentStepIndex + 1} of ${names.length}`
  }
  const offerList = location?.offers.data.filter(isNotNull) || []

  const [selectedOfferType, setSelectedOfferType] = useState<
    SelectOption | undefined
  >()

  const options = allOfferInfos.map((offerInfo) => ({
    label: offerInfo.name,
    value: offerInfo.offerType,
    disabled:
      offerInfo.offerType === OfferType.BuildAndGrowWeek &&
      location.locationType === LocationType.Outpost,
  }))

  const handleCreateOfferClick = async () => {
    if (location && location.locationType && selectedOfferType) {
      const { data: offer } = await createOffer({
        variables: {
          data: {
            offerType: selectedOfferType.value as OfferType,
            locationId: location._id,
          },
        },
      })

      if (offer?.createOffer) {
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
            label: 'Save & Continue',
          }}
          secondaryButton={{
            onClick: onBack,
            label: 'Back',
          }}
        />
      }
    >
      <TitleCard title={stepTitle} icon="close" iconHref="/my-locations" />
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
              <OfferTypesDescriptionList />
              <AppLink
                external
                location={EXTERNAL_LINKS.CITY_DIRECTORY}
                iconSize={0.9}
              >
                <Overline>Learn More</Overline>
              </AppLink>
            </OfferFormContainer>
          </ContentCard>
          {offerList.length ? (
            <LocationOffersList offers={offerList} location={location} />
          ) : (
            <StyledEmptyState
              icon="file-document"
              title="No offers yet"
              description="Create new offers and manage them from here"
            />
          )}
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
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-end;
  width: 100%;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    width: 55%;
    flex-direction: row;

    button {
      width: auto;
    }
  }
`

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`
