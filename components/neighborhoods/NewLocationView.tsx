import Link from 'next/link'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import { useProfile } from '../auth/useProfile'
import { useNavigation } from '@/components/hooks/useNavigation'
import { useEmail } from '@/components/hooks/useEmail'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationNewResponse } from '@/utils/types/location'
import { CitizenshipStatus } from '@/utils/types/profile'
import { EmailType, NewLocationPayload } from '@/lib/mail/types'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { Body1, H2 } from '@/components/core/Typography'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ActionBar } from '@/components/core/ActionBar'
import { TitleCard } from '@/components/core/TitleCard'
import { ErrorModal } from '../ErrorModal'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'
import { EmptyState } from '@/components/core/EmptyState'

export const NewLocationView = () => {
  const router = useRouter()
  const { showModal } = useModal()
  const { user } = useProfile({ redirectTo: '/' })
  const { sendEmail } = useEmail()
  const { goBack } = useNavigation()
  const { post } = useBackend()

  const canCreateListings =
    user?.citizenshipStatus === CitizenshipStatus.Verified

  const handlePrimaryButtonClick = async () => {
    try {
      const data = await post<LocationNewResponse>('LOCATION_NEW', {})
      const externId = !data || 'error' in data ? null : data.locationExternId

      if (externId) {
        await sendEmail({
          type: EmailType.NEW_LOCATION,
          data: {
            locationId: externId,
          } as NewLocationPayload,
        })
        router.push(`/location/${externId}/edit`).then()
      } else {
        showModal(() => (
          <ErrorModal
            title="Location Creation Error"
            description="There was an error creating your location"
          />
        ))
      }
    } catch (error) {
      console.error(error)
      showModal(() => (
        <ErrorModal
          title="Location Creation Error"
          description="There was an error creating your location"
        />
      ))
    }
  }

  const handleSecondaryButtonClick = () => {
    goBack()
  }

  if (!user) {
    return null
  }

  if (!canCreateListings) {
    return (
      <SingleColumnLayout>
        <TitleCard title="New neighborhood" icon="close" iconHref="/" />
        <div style={{ width: '100%' }}>
          <EmptyState
            icon="alert"
            title="Citizens only"
            description="Only citizens can create new neighborhoods."
            customCta={() => (
              <Link href={'/citizenship'}>
                <Button variant={'secondary'}>Become a citizen</Button>
              </Link>
            )}
          />
        </div>
      </SingleColumnLayout>
    )
  }

  return (
    <SingleColumnLayout>
      <TitleCard title="New neighborhood" icon="close" iconHref="/" />
      <Container>
        <StyledContentCard shape="notch">
          <Content>
            <H2>Joining the City Directory</H2>
            <Body1>
              Cabin’s City Directory is a hub for connecting aligned people with
              communities around the world.
            </Body1>
            <Body1>
              Listing your neighborhood here is a great way to attract new
              community members to your neighborhood.
            </Body1>
            <Body1>
              To get started, fill out the form on the next page with details
              about your neighborhood, including its location, a brief
              description, and what makes it special. Be sure to include
              pictures, any unique features, and ongoing events or projects that
              define your community.
            </Body1>
            <Body1>
              If you’d like support in starting and growing your neighborhood,
              check out our{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                target="_blank"
                rel="noopener nofollow noreferrer"
                href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_INFO}
              >
                Neighborhood Accelerator Program
              </Link>
              .
            </Body1>
            <Body1>
              If you need any help, feel free to email{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                target="_blank"
                rel="noopener nofollow noreferrer"
                href={'mailto:savannah@cabin.city'}
              >
                savannah@cabin.city
              </Link>
              .
            </Body1>
          </Content>
          <ActionBar
            primaryButton={{
              label: 'Let’s go!',
              onClick: handlePrimaryButtonClick,
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: handleSecondaryButtonClick,
            }}
          />
        </StyledContentCard>
      </Container>
    </SingleColumnLayout>
  )
}

const Container = styled.div`
  padding-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const StyledContentCard = styled(ContentCard)`
  flex-direction: column;
  gap: 2.4rem;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  ${padding('sm')};

  ${({ theme }) => theme.bp.md} {
    width: 80%;
  }
`
