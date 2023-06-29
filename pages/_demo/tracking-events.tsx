import { useProfile } from '@/components/auth/useProfile'
import { Body1, H1 } from '@/components/core/Typography'
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout'
import { useLogTrackingEventMutation } from '@/generated/graphql'

/*
  For testing and demonstrating tracking events
*/
const TrackingEventsDemo = () => {
  const [logTrackingEvent] = useLogTrackingEventMutation()
  const { user, isUserLoading } = useProfile()

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
        <Body1 key={event?._id}>
          {event?.key}: {event?.count}
        </Body1>
      ))}
    </OnboardingLayout>
  )
}

export default TrackingEventsDemo
