import { ContentCard } from '../../core/ContentCard'
import { H1, H3 } from '../../core/Typography'
import { StepProps, steps } from './configuration'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ActionBar } from '@/components/core/ActionBar'
import { Container, FormContainer, StepIndicator } from './styles'
import styled from 'styled-components'
import { EmptyState } from '@/components/core/EmptyState'

export const DraftListingStep = ({
  name,
  onBack,
  onNext,
  location,
}: StepProps) => {
  const stepIndicatorText = () => {
    const names = steps.map((step) => step.name)
    const currentStepIndex = names.indexOf(name)
    return `Step ${currentStepIndex + 1} of ${names.length}`
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
            <FormContainer>
              <H1>Offers creation is coming - {location.name}</H1>
            </FormContainer>
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
