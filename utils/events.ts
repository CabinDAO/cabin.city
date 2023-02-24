import { MeFragment } from '@/generated/graphql'

export type Event = 'profile_setup_finished' | 'profile_viewed'

/**
 * Get the count for a specific event
 * @param user The user object
 * @param eventKey The event key
 * @returns The count for the event
 **/
export const getCountForEvent = (
  user: MeFragment | undefined,
  eventKey: Event
): number => {
  const existingEvents = user?.trackingEvents?.data ?? []

  return existingEvents.find((e) => eventKey === e?.key)?.count ?? 0
}
