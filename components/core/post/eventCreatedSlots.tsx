import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import { EventPostItem } from './EventPostItem'
import { useProfile } from '@/components/auth/useProfile'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventContent = (props: PostProps) => {
  return <Body1>Posted a new event</Body1>
}

const EventMedia = (props: PostProps) => {
  const event = props.activity.metadata?.offer
  const { user } = useProfile()

  if (event && user) {
    return <EventPostItem {...event} />
  } else {
    return null
  }
}

export const eventCreatedSlots: PostSlots = {
  Content: EventContent,
  Media: EventMedia,
}
