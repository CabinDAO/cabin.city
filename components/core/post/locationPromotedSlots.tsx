import { locationCardPropsFromFragment } from '@/lib/location'
import { Body1 } from '../Typography'
import { LocationPostItem } from './LocationPostItem'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import { LevelUpLocationBackdrop } from './LevelUpLocationBackdrop'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocationContent = (props: PostProps) => {
  return <Body1>Has leveled up their location</Body1>
}

const LocationMedia = (props: PostProps) => {
  const location = props.activityItem.activity.metadata?.location

  if (location) {
    if (props.variant === 'compact') {
      return <LocationPostItem {...locationCardPropsFromFragment(location)} />
    }

    return (
      <LevelUpLocationBackdrop>
        <LocationPostItem {...locationCardPropsFromFragment(location)} />
      </LevelUpLocationBackdrop>
    )
  } else {
    return null
  }
}

export const locationPromotedSlots: PostSlots = {
  Content: LocationContent,
  Media: LocationMedia,
}
