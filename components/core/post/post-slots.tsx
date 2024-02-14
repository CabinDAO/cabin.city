import { ActivityType } from '@/utils/types/activity'
import { PostProps } from './Post'
import { profileBadgeAddedSlots } from './profileBadgeAddedSlots'
import { profileCreatedSlots } from './profileCreatedSlots'
import { profileRoleAddedSlots } from './profileRoleAddedSlots'
import { verifiedCitizenshipSlots } from './verifiedCitizenshipSlots'
import { textSlots } from './textSlots'
import { locationPublishedSlots } from './locationPublishedSlots'
import { offerCreatedSlots } from './offerCreatedSlots'
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

  if (activity.type === ActivityType.BadgeAdded) {
    return profileBadgeAddedSlots
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
    return offerCreatedSlots
  }

  if (activity.type === ActivityType.VouchRequested) {
    return vouchRequestedSlots
  }

  return {}
}
