import { useRouter } from 'next/router'
import { useModal } from '../hooks/useModal'
import { useProfile } from '../auth/useProfile'
import { useNavigation } from '../hooks/useNavigation'
import { useEmail } from '@/components/hooks/useEmail'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationNewResponse } from '@/utils/types/location'
import { CitizenshipStatus } from '@/utils/types/profile'
import { EmailType, NewLocationPayload } from '@/lib/mail/types'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { Body2, H3, Overline } from '../core/Typography'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ActionBar } from '../core/ActionBar'
import { TitleCard } from '../core/TitleCard'
import { ErrorModal } from '../ErrorModal'
import { ContentCard } from '../core/ContentCard'
import { HorizontalDivider } from '../core/Divider'
import { AppLink } from '../core/AppLink'
import { Button } from '@/components/core/Button'
import Link from 'next/link'
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
        <H3>Getting Started</H3>
        <StyledContentCard shape="notch">
          <Content>
            <JoiningTextContainer>
              <H3>Joining the City Directory</H3>
              <Body2>
                Cabin's City Directory is a hub for connecting people and places
                around the world. If you're interested in welcoming residents
                focused on building better ways to live, create, build, and
                steward the natural land, this is the place for you.
              </Body2>
              <Body2>
                Properties compete to increase their rank on the directory
                leaderboard. Improving your rank starts with creating an
                attractive listing and providing a quality experience at your
                location.
              </Body2>
              <Body2>
                Only Cabin Citizens will be able to contact you through your
                property listing page.
              </Body2>
            </JoiningTextContainer>
            <HorizontalDivider />
            <AppLink
              external
              href={EXTERNAL_LINKS.CITY_DIRECTORY}
              iconSize={0.9}
            >
              <Overline>Learn More</Overline>
            </AppLink>
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
  flex-direction: column;
  display: flex;
  gap: 2.4rem;
  padding: 3.2rem 2.4rem;

  @media ${({ theme }) => theme.bp.md} {
    width: 55%;
  }
`

const JoiningTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;

  p {
    opacity: 0.75;
  }
`
