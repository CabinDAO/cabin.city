import { Body1, WordBreak } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const TextContent = (props: PostProps) => {
  const { activityItem } = props
  const { activity } = activityItem

  return (
    <WordBreak>
      <Body1>{activity.text}</Body1>
    </WordBreak>
  )
}

export const textSlots: PostSlots = {
  Content: TextContent,
}
