import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const TextContent = (props: PostProps) => {
  const { activityItem } = props
  const { activity } = activityItem

  return <Body1>{activity.text}</Body1>
}

export const textSlots: PostSlots = {
  Content: TextContent,
}
