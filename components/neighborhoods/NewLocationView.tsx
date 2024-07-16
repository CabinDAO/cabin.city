import Link from 'next/link'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import { useProfile } from '@/components/auth/useProfile'
import { useConfirmLoggedIn } from '@/components/auth/useConfirmLoggedIn'
import { useEmail } from '@/components/hooks/useEmail'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationNewResponse } from '@/utils/types/location'
import { EmailType, NewLocationPayload } from '@/lib/mail/types'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import { padding } from '@/styles/theme'
import { Body1, H3 } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { ActionBar } from '@/components/core/ActionBar'
import { TitleCard } from '@/components/core/TitleCard'
import { ErrorModal } from '../ErrorModal'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'
import { EmptyState } from '@/components/core/EmptyState'
import { HorizontalDivider } from '@/components/core/Divider'

export const NewLocationView = () => {
  const router = useRouter()
  const { showModal } = useModal()
  const { user } = useProfile()
  const { confirmLoggedIn } = useConfirmLoggedIn()
  const { sendEmail } = useEmail()
  const { post } = useBackend()

  const onCloseUrl = '/city-directory'

  const canCreateListings = true
  // user?.citizenshipStatus === CitizenshipStatus.Verified

  const handlePrimaryButtonClick = async () => {
    confirmLoggedIn(async () => {
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
    })
  }

  const handleSecondaryButtonClick = () => {
    router.push(onCloseUrl).then()
  }

  if (!canCreateListings) {
    return (
      <BaseLayout>
        <TitleCard
          title="New neighborhood"
          icon="close"
          iconHref={onCloseUrl}
        />
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
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <TitleCard
        title="List your neighborhood"
        icon="close"
        iconHref={onCloseUrl}
      />
      <Container>
        <StyledContentCard shape="notch">
          <Content>
            <Body1>
              Cabin’s City Directory connects local neighborhoods with aligned
              people around the world.
            </Body1>
            <H3>Make New Friends</H3>
            <Body1>Invite friendly visitors to join your next gathering.</Body1>
            <H3>Find New Neighbors</H3>
            <Body1>
              Cabin members make excellent community members. Help one move to
              your neck of the woods.
            </Body1>
            <H3>Join the Network City</H3>
            <Body1>
              Connect with other neighborhoods to share resources and ideas.
            </Body1>
            <HorizontalDivider />
            <Body1>
              If you’d like support in starting or growing your neighborhood,
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
              Need any help? Feel free to email{' '}
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
              label: user ? 'Let’s go!' : 'Sign in to continue',
              onClick: handlePrimaryButtonClick,
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: handleSecondaryButtonClick,
            }}
          />
        </StyledContentCard>
      </Container>
    </BaseLayout>
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
  ${padding('md', 'sm')};

  ${({ theme }) => theme.bp.md} {
    width: 80%;
  }
`
