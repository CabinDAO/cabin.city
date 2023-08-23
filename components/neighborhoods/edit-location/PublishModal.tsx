import { ErrorModal } from '@/components/ErrorModal'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { Body2, H4 } from '@/components/core/Typography'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalContent } from '@/components/core/modals/ModalContent'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { useModal } from '@/components/hooks/useModal'
import {
  GetLocationsByLocationTypeDocument,
  LocationType,
  usePublishLocationMutation,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface PublishModalProps {
  locationId: string
}

export const PublishModal = ({ locationId }: PublishModalProps) => {
  const [publishLocation] = usePublishLocationMutation()
  const { showModal, hideModal } = useModal()
  const router = useRouter()

  const handlePublish = async () => {
    try {
      const { data } = await publishLocation({
        variables: {
          id: `${locationId}`,
        },
        refetchQueries: [
          'GetLocationsByLocationType',
          {
            query: GetLocationsByLocationTypeDocument,
            variables: { locationType: LocationType.Outpost },
          },
        ],
      })

      if (data?.publishLocation?.publishedAt) {
        hideModal()
        router.push(`/location/${locationId}`)
      }
    } catch (error) {
      showModal(() => (
        <ErrorModal
          title="Publish Listing Error"
          description="There was an error publishing your listing."
        />
      ))
    }
  }

  return (
    <PublishModalContainer>
      <ModalTitle text="Are you ready?" />
      <ModalContent>
        <Container>
          <Information>
            <IconContainer>
              <Icon name="publish" size={4.8} color="yellow600" />
            </IconContainer>
            <Message>
              <H4>Publish to the Cabin City Directory</H4>
              <Body2>
                Once published, your property listing and experiences will
                become openly accessible, ready to be shared across various
                social platforms.
              </Body2>
            </Message>
          </Information>
          <PublishButton onClick={handlePublish}>Publish now</PublishButton>
        </Container>
      </ModalContent>
    </PublishModalContainer>
  )
}

const PublishModalContainer = styled(ModalContainer)`
  height: auto;
`

const PublishButton = styled(Button)`
  width: 100%;
`

const Information = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`

const IconContainer = styled.div`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`
