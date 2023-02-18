import { useUser } from '@/components/auth/useUser'
import { Body, H1 } from '@/components/core/Typography'
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout'
import { useLogTrackingEventMutation } from '@/generated/graphql'

/*
  For testing and demonstrating tracking events
*/
const TrackingEventsDemo = () => {
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const { user, isUserLoading } = useUser()

  if (!user) {
    return isUserLoading ? null : <p>Not logged in</p>
  }

  const handleButtonClick = () => {
    logTrackingEvent({
      variables: {
        key: 'button-click',
      },
    })
  }

  return (
    <OnboardingLayout>
      <button onClick={handleButtonClick}>Click me</button>
      <H1>Your Tracking Events</H1>
      {user.trackingEvents.data.map((event) => (
        <Body key={event?._id}>
          {event?.key}: {event?.count}
        </Body>
      ))}
    </OnboardingLayout>
  )
}

export default TrackingEventsDemo
