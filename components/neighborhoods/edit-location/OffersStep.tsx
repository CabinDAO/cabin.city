import { ContentCard } from '../../core/ContentCard'
import { Body2, H3 } from '../../core/Typography'
import { StepProps } from './location-wizard-configuration'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ActionBar } from '@/components/core/ActionBar'
import { Container, StepIndicator } from './styles'
import styled from 'styled-components'
import { EmptyState } from '@/components/core/EmptyState'
import { OfferType, useCreateOfferMutation } from '@/generated/graphql'
import { Button } from '@/components/core/Button'
import { useRouter } from 'next/router'
import { isNotNull } from '@/lib/data'
import { LocationOffersList } from '@/components/offers/edit-offer/LocationOffersList'

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
  const offerList = location?.offers.data.filter(isNotNull) || []
  const stepNumber = steps.map((step) => step.name).indexOf(name) + 1

  const handleCreateOfferClick = async () => {
    if (location && location.locationType) {
      const { data: offer } = await createOffer({
        variables: {
          data: {
            offerType: OfferType.PaidColiving, // TODO: get rid of offer types completely
            locationId: location._id,
          },
        },
      })

      if (offer?.createOffer) {
        router.push(`/experience/${offer.createOffer._id}/edit`).then(null)
      }
    }
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
          <H3>
            Step {stepNumber} of {steps.length}
          </H3>
        </StepIndicator>
        <ContainerGroup>
          <ContentCard shape="notch">
            <TopContent>
              <Left>
                <H3>Host Cabin Citizens</H3>
                <Body2>
                  Experiences are exclusive invitations to Cabin Citizens to
                  visit and stay at your property.
                </Body2>
              </Left>
              <Right>
                <Button
                  variant="secondary"
                  onClick={handleCreateOfferClick}
                  isFullWidth
                >
                  New Experience
                </Button>
              </Right>
            </TopContent>
          </ContentCard>
          {offerList.length ? (
            <LocationOffersList offers={offerList} location={location} />
          ) : (
            <StyledEmptyState
              icon="file-document"
              title="No experiences yet"
              description="Create new experiences and manage them from here"
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

const TopContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.4rem;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const Left = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    max-width: 45rem;
  }
`

const Right = styled.div`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
    flex-grow: 0;
  }
`
