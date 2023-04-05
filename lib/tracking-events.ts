import { MeFragment } from '@/generated/graphql'

export enum TrackingEvent {
  profile_setup_finished = 'profile_setup_finished',
  profile_setup_dismissed = 'profile_setup_dismissed',
}

export const hasEventOccurred = (
  me: MeFragment,
  trackingEvent: TrackingEvent
) => {
  return me.trackingEvents.data.some((te) => te?.key === trackingEvent)
}
