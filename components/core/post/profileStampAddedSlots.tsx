import Image from 'next/image'
import { Body1 } from '../Typography'
import { CompactPostImage } from './CompactPostImage'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import { getStampImageUrl } from '@/components/core/Stamp'

const ProfileStampAddedContent = (props: PostProps) => {
  const { activity } = props
  const stamp = activity.metadata?.stamp

  if (!stamp) {
    console.error('ProfileStampAdded activity without metadata.stamp')
    return null
  }

  return <Body1>Earned the {stamp.name} stamp</Body1>
}

const ProfileStampAddedMedia = (props: PostProps) => {
  const { activity, variant } = props
  const stamp = activity.metadata?.stamp

  if (!stamp) {
    console.error('ProfileStampAdded activity without metadata.stamp')
    return null
  }

  const imageUrl = getStampImageUrl(stamp.id)

  if (variant === 'compact') {
    return <CompactPostImage alt={stamp.name} imageUrl={imageUrl} />
  } else {
    return <Image alt={stamp.name} src={imageUrl} width={100} height={100} />
  }
}

export const profileStampAddedSlots: PostSlots = {
  Content: ProfileStampAddedContent,
  Media: ProfileStampAddedMedia,
}
