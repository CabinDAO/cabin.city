import { ActivityType } from '@/generated/graphql'
import { PostProps } from './Post'
import { profileBadgeAddedSlots } from './profileBadgeAddedSlots'
import { profileCreatedSlots } from './profileCreatedSlots'
import { profileRoleAddedSlots } from './profileRoleAddedSlots'

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
  const { activityItem } = props
  const { activity } = activityItem

  if (activity.type === ActivityType.ProfileCreated) {
    return profileCreatedSlots
  }

  if (activity.type === ActivityType.ProfileRoleAdded) {
    return profileRoleAddedSlots
  }

  if (activity.type === ActivityType.ProfileBadgeAdded) {
    return profileBadgeAddedSlots
  }

  return {}
}
