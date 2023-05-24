import styled from 'styled-components'
import { ContentCard } from '../../core/ContentCard'
import { H3 } from '../../core/Typography'
import { StepConfig } from './location-wizard-configuration'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ActionBar } from '@/components/core/ActionBar'
import { useRouter } from 'next/router'

interface LocationStepWrapperProps {
  onNext?: VoidFunction
  onBack?: VoidFunction
  children: React.ReactNode
  name: string
  steps: StepConfig[]
  className?: string
  displayStepIndicator?: boolean
}

export const LocationStepWrapper = ({
  steps,
  onNext = () => console.log('next'),
  onBack = () => console.log('back'),
  children,
  name,
  displayStepIndicator = true,
  className,
}: LocationStepWrapperProps) => {
  const router = useRouter()
  const { created } = router.query
  const stepTitle = created ? 'New listing' : 'Edit listing'

  const stepIndicatorText = () => {
    const names = steps.map((step) => step.name)
    const currentStepIndex = names.indexOf(name)
    return `Step ${currentStepIndex + 1} of ${names.length}`
  }

  return (
    <StyledLayout
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
      <TitleCard title={stepTitle} icon="close" iconHref="/my-locations" />
      <Container className={className}>
        <StepIndicator>
          <H3>{name}</H3>
          {displayStepIndicator && <H3>{stepIndicatorText()}</H3>}
        </StepIndicator>
        <ContentCard shape="notch">
          <FormContainer>{children}</FormContainer>
        </ContentCard>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  padding-bottom: 20vh;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 0;
  }
`

const Container = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
  // margin-bottom: 4.8rem;
`

const StepIndicator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
`
