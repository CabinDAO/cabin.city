import { MeFragment } from '@/generated/graphql'

export enum TrackingEvent {
  profile_setup_finished = 'profile_setup_finished',
  profile_setup_dismissed = 'profile_setup_dismissed',
  profile_share_dismissed = 'profile_share_dismissed',
  profile_shared = 'profile_shared',
}

export const hasEventOccurred = (
  me: MeFragment,
  trackingEvent: TrackingEvent
) => {
  return me.trackingEvents.data.some((te) => te?.key === trackingEvent)
}
