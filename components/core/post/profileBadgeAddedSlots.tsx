import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const ProfileBadgeAddedContent = (props: PostProps) => {
  const { activity } = props

  if (!activity.metadata?.badgeId) {
    console.error('ProfileBadgeAdded activity without metadata.badgeId')
    return null
  }

  // TODO: How do I get the badge name and image? This is on the profile somewhere, right?
  return <Body1>Earned badge {activity.metadata.badgeId}</Body1>
}

export const profileBadgeAddedSlots: PostSlots = {
  Content: ProfileBadgeAddedContent,
}
