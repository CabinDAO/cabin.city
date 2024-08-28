import Image from 'next/image'
import { Body1 } from '../Typography'
import { CompactPostImage } from './CompactPostImage'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import { getBadgeImageUrl } from '@/components/core/Badge'

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
  const { activity, variant } = props
  const badge = activity.metadata?.badge

  if (!badge) {
    console.error('ProfileBadgeAdded activity without metadata.badge')
    return null
  }

  const imageUrl = getBadgeImageUrl(badge.spec.id)

  if (variant === 'compact') {
    return <CompactPostImage alt={badge.spec.name} imageUrl={imageUrl} />
  } else {
    return (
      <Image alt={badge.spec.name} src={imageUrl} width={100} height={100} />
    )
  }
}

export const profileBadgeAddedSlots: PostSlots = {
  Content: ProfileBadgeAddedContent,
  Media: ProfileBadgeAddedMedia,
}
