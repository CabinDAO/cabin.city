import { getImageUrl } from '@/lib/image'
import Image from 'next/image'
import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const ProfileBadgeAddedContent = (props: PostProps) => {
  const { activity } = props
  const badge = activity.metadata?.badge

  if (!badge) {
    console.error('ProfileBadgeAdded activity without metadata.badge')
    return null
  }

  return <Body1>Earned the {badge.spec.name} stamp</Body1>
}

const ProfileBadgeAddedMedia = (props: PostProps) => {
  const { activity } = props
  const badge = activity.metadata?.badge

  if (!badge) {
    console.error('ProfileBadgeAdded activity without metadata.badge')
    return null
  }

  if (!badge.spec.image) return null

  const imageUrl = getImageUrl(badge.spec.image)

  return <Image alt={badge.spec.name} src={imageUrl} width={100} height={100} />
}

export const profileBadgeAddedSlots: PostSlots = {
  Content: ProfileBadgeAddedContent,
  Media: ProfileBadgeAddedMedia,
}
