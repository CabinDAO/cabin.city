import Image from 'next/image'
import Link from 'next/link'
import { expandRoute } from '@/utils/routing'
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
  const linkUrl = expandRoute(['stamp_id', { id: stamp.id.toString() }])

  if (variant === 'compact') {
    return (
      <Link href={linkUrl}>
        <CompactPostImage alt={stamp.name} imageUrl={imageUrl} />
      </Link>
    )
  } else {
    return (
      <Link href={linkUrl}>
        <Image alt={stamp.name} src={imageUrl} width={100} height={100} />
      </Link>
    )
  }
}

export const profileStampAddedSlots: PostSlots = {
  Content: ProfileStampAddedContent,
  Media: ProfileStampAddedMedia,
}
