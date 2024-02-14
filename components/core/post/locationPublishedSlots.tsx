import { Body1 } from '../Typography'
import { LocationPostItem } from './LocationPostItem'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocationContent = (props: PostProps) => {
  return <Body1>Just added an Outpost</Body1>
}

const LocationMedia = (props: PostProps) => {
  const location = props.activity.metadata?.location
  return location ? (
    <LocationPostItem location={location} hideVerifiedTag />
  ) : null
}

export const locationPublishedSlots: PostSlots = {
  Content: LocationContent,
  Media: LocationMedia,
}
