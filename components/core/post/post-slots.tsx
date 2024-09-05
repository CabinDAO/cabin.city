import { ActivityType } from '@/utils/types/activity'
import { PostProps } from './Post'
import { profileStampAddedSlots } from './profileStampAddedSlots'
import { profileCreatedSlots } from './profileCreatedSlots'
import { profileRoleAddedSlots } from './profileRoleAddedSlots'
import { verifiedCitizenshipSlots } from './verifiedCitizenshipSlots'
import { textSlots } from './textSlots'
import { locationPublishedSlots } from './locationPublishedSlots'
import { eventCreatedSlots } from './eventCreatedSlots'
import { vouchRequestedSlots } from './vouchRequestedSlots'

/*
  Slots allow us to specify both the content and media portions of a post, which vary based on the type of activity.
  This supports the layout:
  +-----------------+
  | Content (e.g. "Joined cabin")
  | Date (e.g. 8 hours ago)
  | Media (e.g. role card)
  +-----------------+
*/
export interface PostSlots {
  Content?: (props: PostProps) => JSX.Element | null
  Media?: (props: PostProps) => JSX.Element | null
}

export const getPostSlots = (props: PostProps): PostSlots => {
  const { activity } = props

  if (activity.type === ActivityType.ProfileCreated) {
    return profileCreatedSlots
  }

  if (activity.type === ActivityType.RoleAdded) {
    return profileRoleAddedSlots
  }

  if (activity.type === ActivityType.StampAdded) {
    return profileStampAddedSlots
  }

  if (activity.type === ActivityType.CitizenshipVerified) {
    return verifiedCitizenshipSlots
  }

  if (activity.type === ActivityType.Text) {
    return textSlots
  }

  if (activity.type === ActivityType.LocationPublished) {
    return locationPublishedSlots
  }

  if (activity.type === ActivityType.OfferCreated) {
    return eventCreatedSlots
  }

  if (activity.type === ActivityType.VouchRequested) {
    return vouchRequestedSlots
  }

  return {}
}
